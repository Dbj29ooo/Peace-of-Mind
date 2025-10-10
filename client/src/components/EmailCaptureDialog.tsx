import { useState } from "react";
import { Mail, Shield, Heart, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailCaptureDialogProps {
  open: boolean;
  onEmailSubmit: (email: string) => void;
}

export default function EmailCaptureDialog({ open, onEmailSubmit }: EmailCaptureDialogProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    onEmailSubmit(email);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto mb-4 bg-primary/10 rounded-full p-3">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center font-heading text-2xl">
            Join Our Safe Housing Community
          </DialogTitle>
          <DialogDescription className="text-center">
            Get early access to LGBTQ+ friendly housing listings and community resources. 
            We'll never share your email.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="pl-9"
                data-testid="input-email-capture"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive" data-testid="text-email-error">
                {error}
              </p>
            )}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <p className="text-sm font-medium">What you'll get:</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary shrink-0" />
                <span>Access to verified LGBTQ+ friendly listings</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary shrink-0" />
                <span>Community reviews and safety ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary shrink-0" />
                <span>Updates on new safe housing options</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-submit-email">
            Continue to Search
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to receive updates about LGBTQ+ friendly housing.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
