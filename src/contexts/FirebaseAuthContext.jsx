import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  getDocs,
  where
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebaseConfig';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from Firestore
  const loadUserProfile = useCallback(async (user) => {
    if (!user) {
      setUserProfile(null);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'profiles', user.uid));
      if (userDoc.exists()) {
        setUserProfile({ id: user.uid, ...userDoc.data() });
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          email: user.email,
          full_name: user.displayName || '',
          opportunity_preferences: '',
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await setDoc(doc(db, 'profiles', user.uid), newProfile);
        setUserProfile({ id: user.uid, ...newProfile });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      toast({
        variant: "destructive",
        title: "Profile Error",
        description: "There was an issue loading your profile.",
      });
    }
  }, [toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadUserProfile]);

  const signUp = useCallback(async (email, password, userData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: userData.full_name || ''
      });

      // Send email verification
      try {
        await sendEmailVerification(user);
      } catch (emailError) {
        console.warn('Email verification failed:', emailError);
        // Continue with signup even if email verification fails
      }

      // Create user profile in Firestore
      const profileData = {
        email: user.email,
        full_name: userData.full_name || '',
        opportunity_preferences: userData.opportunity_preferences || '',
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await setDoc(doc(db, 'profiles', user.uid), profileData);
      
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully. You can now sign in.",
      });

      return { error: null, user };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
      return { error, user: null };
    }
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Allow sign in even if email is not verified (for development)
      // In production, you might want to check: userCredential.user.emailVerified
      
      return { error: null, user: userCredential.user };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
      return { error, user: null };
    }
  }, [toast]);

  const signOutUser = useCallback(async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      return { error: null };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
      return { error };
    }
  }, [toast]);

  const updateUserProfile = useCallback(async (profileData) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const profileRef = doc(db, 'profiles', user.uid);
      const updatedData = {
        ...profileData,
        updated_at: new Date().toISOString()
      };

      await updateDoc(profileRef, updatedData);
      
      // Update local state
      setUserProfile(prev => ({ ...prev, ...updatedData }));

      // Update Firebase Auth display name if full_name changed
      if (profileData.full_name && profileData.full_name !== user.displayName) {
        await updateProfile(user, {
          displayName: profileData.full_name
        });
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      return { error: null };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an issue updating your profile.",
      });
      return { error };
    }
  }, [user, toast]);

  // Admin functions
  const getAllUsers = useCallback(async () => {
    try {
      const profilesRef = collection(db, 'profiles');
      const snapshot = await getDocs(profilesRef);
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return { error: null, users };
    } catch (error) {
      return { error, users: [] };
    }
  }, []);

  const makeUserAdmin = useCallback(async (userId, isAdmin) => {
    try {
      const profileRef = doc(db, 'profiles', userId);
      await updateDoc(profileRef, {
        is_admin: isAdmin,
        updated_at: new Date().toISOString()
      });
      return { error: null };
    } catch (error) {
      return { error };
    }
  }, []);

  const value = useMemo(() => ({
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut: signOutUser,
    updateUserProfile,
    getAllUsers,
    makeUserAdmin,
    // Alias for compatibility
    session: user ? { user } : null
  }), [user, userProfile, loading, signUp, signIn, signOutUser, updateUserProfile, getAllUsers, makeUserAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
