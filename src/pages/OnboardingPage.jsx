import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

function OnboardingPage() {
  const { signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [signUpData, setSignUpData] = useState({
    full_name: '',
    email: '',
    password: '',
    opportunity_preferences: ''
  });

  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const handleSignUpChange = (e) => {
    const { id, value } = e.target;
    setSignUpData(prev => ({ ...prev, [id]: value }));
  };

  const handleSignUpSelectChange = (value) => {
    setSignUpData(prev => ({ ...prev, opportunity_preferences: value }));
  };

  const handleSignInChange = (e) => {
    const { id, value } = e.target;
    setSignInData(prev => ({ ...prev, [id]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(signUpData.email, signUpData.password, {
      full_name: signUpData.full_name,
      opportunity_preferences: signUpData.opportunity_preferences
    });
    if (!error) {
        toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
        });
    }
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signIn(signInData.email, signInData.password);
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Welcome to AIpply</title>
        <meta name="description" content="Log in or sign up to get started with AIpply." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl">Welcome to AIpply</CardTitle>
              <CardDescription>Your AI-powered application assistant.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="e.g., giulia@example.com" value={signInData.email} onChange={handleSignInChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" value={signInData.password} onChange={handleSignInChange} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input id="full_name" placeholder="e.g., Giulia Alvares" value={signUpData.full_name} onChange={handleSignUpChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="e.g., giulia@example.com" value={signUpData.email} onChange={handleSignUpChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" value={signUpData.password} onChange={handleSignUpChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opportunity_preferences">I am looking for opportunities for...</Label>
                      <Select onValueChange={handleSignUpSelectChange} value={signUpData.opportunity_preferences} required>
                        <SelectTrigger id="opportunity_preferences">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="startup">My Startup/Project</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default OnboardingPage;