import { useState } from "react";
import { useLocation } from "wouter";
import { Home, Heart, Users, X, MapPin, Mail, Lock, Loader2 } from "lucide-react";
import { SiGoogle, SiGithub, SiX, SiApple } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";

interface EmailCaptureDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function EmailCaptureDialog({ open, onClose }: EmailCaptureDialogProps) {
  const [, setLocation] = useLocation();
  const { invalidate } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSocialLogin = (provider: string) => {
    const endpoints: Record<string, string> = {
      google: "/api/auth/google",
      github: "/api/auth/github",
      twitter: "/api/auth/twitter",
      apple: "/api/auth/apple",
    };
    window.location.href = endpoints[provider] || "/api/login";
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";
      const body = isRegistering
        ? { email, password, firstName: email.split("@")[0] }
        : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Authentication failed");
      }

      invalidate();
      onClose();
      setLocation("/");
      resetForm();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowEmailForm(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) { onClose(); resetForm(); } }} modal={false}>
      <DialogContent
        className="sm:max-w-md pointer-events-auto"
        hideCloseButton
      >
        <button
          onClick={() => { onClose(); resetForm(); }}
          className="absolute right-3 top-3 rounded-full bg-muted p-1.5 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          data-testid="button-close-login"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <div className="mx-auto mb-4 bg-primary/10 rounded-full p-3">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center font-heading text-2xl">
            Welcome to HomeBase
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to save listings, access relocation resources, and connect with your community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!showEmailForm ? (
            <>
              <div className="space-y-3">
                <Button
                  onClick={() => handleSocialLogin("google")}
                  variant="outline"
                  className="w-full gap-3 h-11"
                  data-testid="button-login-google"
                >
                  <SiGoogle className="h-5 w-5" />
                  <span>Continue with Google</span>
                </Button>

                <Button
                  onClick={() => handleSocialLogin("github")}
                  variant="outline"
                  className="w-full gap-3 h-11"
                  data-testid="button-login-github"
                >
                  <SiGithub className="h-5 w-5" />
                  <span>Continue with GitHub</span>
                </Button>

                <Button
                  onClick={() => handleSocialLogin("twitter")}
                  variant="outline"
                  className="w-full gap-3 h-11"
                  data-testid="button-login-twitter"
                >
                  <SiX className="h-5 w-5" />
                  <span>Continue with X</span>
                </Button>

                <Button
                  onClick={() => handleSocialLogin("apple")}
                  variant="outline"
                  className="w-full gap-3 h-11"
                  data-testid="button-login-apple"
                >
                  <SiApple className="h-5 w-5" />
                  <span>Continue with Apple</span>
                </Button>
              </div>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  or
                </span>
              </div>

              <Button
                onClick={() => setShowEmailForm(true)}
                variant="outline"
                className="w-full gap-3 h-11"
                data-testid="button-login-email"
              >
                <Mail className="h-5 w-5" />
                <span>Continue with Email</span>
              </Button>
            </>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button type="submit" className="w-full h-11" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isRegistering ? "Create Account" : "Sign In"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => { setIsRegistering(!isRegistering); setError(""); }}
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {isRegistering ? "Sign in" : "Create one"}
                </button>
              </p>

              <button
                type="button"
                onClick={resetForm}
                className="w-full text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Back to social login
              </button>
            </form>
          )}

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium">What you'll get:</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary shrink-0" />
                <span>Save and track affordable housing listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary shrink-0" />
                <span>Community reviews and neighborhood ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Nearby shelters, food banks & relocation resources</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to receive updates about affordable housing near you
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
