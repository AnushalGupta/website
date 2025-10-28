import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your inbox.");
    } catch (err) {
      setError("Error sending reset link. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f9fafb] to-[#eef2ff] px-4">
      <div className="w-full max-w-sm md:max-w-md">
        <Card className="shadow-lg border border-border/40 bg-card rounded-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold text-slate-800">Reset Password</CardTitle>
            <CardDescription>Enter your email to receive a reset link.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {message && <p className="text-sm text-green-600 text-center">{message}</p>}
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Send Reset Link
              </Button>
            </form>

            <p className="text-sm text-center mt-4 text-muted-foreground">
              Remembered your password?{" "}
              <Link to="/student/login" className="text-indigo-600 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
