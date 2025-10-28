import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock } from "lucide-react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("mindease_student_auth", "true");
        navigate("/");
      })
      .catch((err) => {
        let friendlyError;
        switch (err.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/invalid-credential":
            friendlyError = "Invalid email or password.";
            break;
          default:
            friendlyError = "Login failed. Please check your credentials.";
        }
        setError(friendlyError);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        localStorage.setItem("mindease_student_auth", "true");
        navigate("/");
      })
      .catch(() => {
        setError("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f9ff] via-[#e0f7fa] to-[#ffffff] px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card className="rounded-2xl shadow-2xl border border-border/30 bg-white/70 backdrop-blur-md">
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Student Login
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Welcome back! Please enter your credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember" className="cursor-pointer text-muted-foreground">
                    Remember for 30 days
                  </Label>
                </div>
                <Link
                  to="/forget/password"
                  className="text-primary font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="text-sm font-medium text-red-500 text-center">{error}</p>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all text-white font-semibold py-2 rounded-md"
                >
                  Log In
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 py-2"
                  onClick={handleGoogleLogin}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Don’t have an account?{" "}
                <Link
                  to="/student/signup"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
