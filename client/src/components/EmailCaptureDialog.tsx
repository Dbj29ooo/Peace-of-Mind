import { Home, Heart, Users, X, MapPin } from "lucide-react";
import { SiGoogle, SiGithub, SiX, SiApple } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EmailCaptureDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function EmailCaptureDialog({ open, onClose }: EmailCaptureDialogProps) {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }} modal={false}>
      <DialogContent 
        className="sm:max-w-md pointer-events-auto" 
        hideCloseButton
      >
        <button
          onClick={onClose}
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
          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              variant="outline"
              className="w-full gap-3 h-11"
              data-testid="button-login-google"
            >
              <SiGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>

            <Button
              onClick={handleLogin}
              variant="outline"
              className="w-full gap-3 h-11"
              data-testid="button-login-github"
            >
              <SiGithub className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </Button>

            <Button
              onClick={handleLogin}
              variant="outline"
              className="w-full gap-3 h-11"
              data-testid="button-login-x"
            >
              <SiX className="h-5 w-5" />
              <span>Continue with X</span>
            </Button>

            <Button
              onClick={handleLogin}
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
            onClick={handleLogin}
            variant="outline"
            className="w-full gap-3 h-11"
            data-testid="button-login-email"
          >
            Continue with Email
          </Button>

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
