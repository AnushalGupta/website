// src/pages/StudentLogin.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase.js'; // Make sure firebase.js is correct

// Import shadcn/ui components
import { Navigation as Navbar } from '@/components/Navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem('mindease_student_auth', 'true');
        navigate('/student/quiz'); // Or wherever they should go
      })
      .catch((err) => {
        let friendlyError;
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential': // Catches both
            friendlyError = 'Invalid email or password.';
            break;
          case 'auth/invalid-email':
            friendlyError = 'Please enter a valid email address.';
            break;
          default:
            friendlyError = 'Login failed. Please check your credentials and try again.';
        }
        setError(friendlyError);
      });
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
          {/* Use shadcn Card component structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Student Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input Field */}
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

                {/* Password Input Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {/* Login Button */}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>

              {/* Sign-up Link */}
              <p className="text-sm text-muted-foreground mt-6 text-center">
                Don’t have an account?{' '}
                <Link to="/student/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}