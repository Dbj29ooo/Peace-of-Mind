import { Leaf, Heart, MapPin } from "lucide-react";
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
  onEmailSubmit: (email: string) => void;
}

export default function EmailCaptureDialog({ open, onEmailSubmit }: EmailCaptureDialogProps) {
  const handleSocialLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto mb-4 bg-primary/10 rounded-full p-3">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center font-heading text-2xl">
            Welcome to Zenith
          </DialogTitle>
          <DialogDescription className="text-center">
            Sign in to discover peaceful rental properties and curated communities
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <Button
              onClick={handleSocialLogin}
              variant="outline"
              className="w-full gap-3 h-11"
              data-testid="button-login-google"
            >
              <SiGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </Button>

            <Button
              onClick={handleSocialLogin}
              variant="outline"
              className="w-full gap-3 h-11"
              data-testid="button-login-github"
            >
              <SiGithub className="h-5 w-5" />
              <span>Continue with GitHub</span>
            </Button>

            <Button
              onClick={handleSocialLogin}
              variant="outline"
              className="w-full gap-3 h-11"
              data-testid="button-login-x"
            >
              <SiX className="h-5 w-5" />
              <span>Continue with X</span>
            </Button>

            <Button
              onClick={handleSocialLogin}
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
            onClick={handleSocialLogin}
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
                <span>Curated peaceful rental properties</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Verified reviews from residents</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary shrink-0" />
                <span>Wellness & community amenities</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to receive updates about peaceful living spaces
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
