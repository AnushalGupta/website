// src/pages/StudentSignup.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  updateProfile,
  doc,
  setDoc,
} from '../firebase.js'; // Imports from your central firebase file

// Import shadcn/ui components
import { Navigation as Navbar } from '@/components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StudentSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // --- 1. Client-Side Validation ---
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // --- 2. Firebase Registration ---
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      try {
        await updateProfile(user, { displayName: name });
      } catch (e) {
        console.warn('Could not set display name:', e);
      }

      navigate('/student/login');
    } catch (err) {
      let friendlyError = err.message || 'Failed to create account.';
      if (err.code === 'auth/email-already-in-use') {
        friendlyError = 'This email address is already in use.';
      } else if (err.code === 'auth/weak-password') {
        friendlyError = 'Password must be at least 6 characters long.';
      }
      setError(friendlyError);
    }
  }

  return (
    <div className="min-h-full flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Create Student Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.tag.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Error Display */}
                {error && (
                  <p className="text-sm font-medium text-destructive">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>

              {/* Login Link */}
              <p className="text-sm text-muted-foreground mt-6 text-center">
                Already have an account?{' '}
                <Link to="/student/login" className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}