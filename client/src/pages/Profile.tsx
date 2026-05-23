import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save, Camera, ArrowLeft, Building2 } from "lucide-react";

interface ProfileData {
  id: string; email: string; firstName: string; lastName: string;
  profileImageUrl: string | null; phone: string | null; location: string | null;
  bio: string | null; preferences: Record<string, any> | null;
  provider: string; state: string | null; householdSize: string | null;
  onHousingAssistance: string | null; onGovernmentFunding: string | null;
  willingToRelocate: string | null; references: any; workHistory: any;
  onboardingCompleted: string | null; createdAt: string;
}

export default function ProfilePage() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation_] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || "");

  const { data: profile, isLoading: profileLoading } = useQuery<ProfileData>({
    queryKey: ["/api/profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const isNewUser = profile && !profile.onboardingCompleted;

  const updateMutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setEditing(false);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setProfileImageUrl(dataUrl);
      updateMutation.mutate({ profileImageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateMutation.mutate({ firstName, lastName, phone, location, bio });
  };

  const initials = profile
    ? `${(profile.firstName || "")[0] || ""}${(profile.lastName || "")[0] || ""}`.toUpperCase() || "U"
    : "U";

  const parseJson = (val: any) => {
    if (!val) return null;
    if (Array.isArray(val)) return val;
    try { return JSON.parse(val); } catch { return val; }
  };

  const refs = parseJson(profile?.references) as any[] | null;
  const work = parseJson(profile?.workHistory) as any[] | null;

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your account and application info</p>
          </div>
        </div>

        <Tabs defaultValue={isNewUser ? "edit" : "view"}>
          <TabsList className="mb-6">
            <TabsTrigger value="view">View Profile</TabsTrigger>
            <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            <TabsTrigger value="onboarding">Application</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <Card>
              <CardHeader className="text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.profileImageUrl || undefined} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">
                      {profile?.firstName || profile?.lastName
                        ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
                        : "User"}
                    </CardTitle>
                    <CardDescription>{profile?.email}</CardDescription>
                    {profile?.provider && (
                      <Badge variant="secondary" className="mt-1 capitalize">{profile.provider}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 space-y-4">
                {profile?.bio && <div><Label className="text-muted-foreground text-sm">Bio</Label><p className="mt-1">{profile.bio}</p></div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile?.phone && <div><Label className="text-muted-foreground text-sm">Phone</Label><p className="mt-1">{profile.phone}</p></div>}
                  {profile?.location && <div><Label className="text-muted-foreground text-sm">Location</Label><p className="mt-1">{profile.location}</p></div>}
                </div>
                {!profile?.bio && !profile?.phone && !profile?.location && (
                  <p className="text-sm text-muted-foreground text-center py-4">No profile details added yet.</p>
                )}
                <Button onClick={() => setEditing(true)} variant="outline" className="w-full sm:w-auto">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <AvatarImage src={profileImageUrl || undefined} />
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  </Avatar>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Camera className="h-4 w-4 mr-2" /> Change Photo
                  </Button>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" value={location} onChange={(e) => setLocation_(e.target.value)} placeholder="City, State" /></div>
                <div className="space-y-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} /></div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSave} disabled={updateMutation.isPending}>
                    {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => { setEditing(false); setFirstName(profile?.firstName || ""); setLastName(profile?.lastName || ""); setPhone(profile?.phone || ""); setLocation_(profile?.location || ""); setBio(profile?.bio || ""); setProfileImageUrl(profile?.profileImageUrl || ""); }}>Cancel</Button>
                </div>
                {updateMutation.isSuccess && <p className="text-sm text-green-600 font-medium">Profile updated!</p>}
                {updateMutation.isError && <p className="text-sm text-destructive font-medium">Failed to update.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding">
            <Card>
              <CardHeader>
                <CardTitle>Application Information</CardTitle>
                <CardDescription>Details you provided during sign-up</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">State</Label>
                    <p className="font-medium">{profile?.state || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Household Size</Label>
                    <p className="font-medium">{profile?.householdSize || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">On Housing Assistance</Label>
                    <p className="font-medium capitalize">{profile?.onHousingAssistance || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">On Government Funding</Label>
                    <p className="font-medium capitalize">{profile?.onGovernmentFunding || "—"}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Willing to Relocate</Label>
                    <p className="font-medium capitalize">{profile?.willingToRelocate || "—"}</p>
                  </div>
                </div>

                <Separator />
                <div>
                  <Label className="text-muted-foreground text-xs">References</Label>
                  {refs && refs.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {refs.map((r, i) => (
                        <div key={i} className="border rounded-md p-3 text-sm">
                          <p className="font-medium">{r.name || "Unnamed"}</p>
                          <p className="text-muted-foreground">{r.relationship}{r.phone ? ` — ${r.phone}` : ""}{r.email ? ` — ${r.email}` : ""}</p>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground mt-1">None provided</p>}
                </div>

                <Separator />
                <div>
                  <Label className="text-muted-foreground text-xs">Work History</Label>
                  {work && work.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {work.map((w, i) => (
                        <div key={i} className="border rounded-md p-3 text-sm">
                          <p className="font-medium">{w.position || "Unknown position"} {w.company ? `at ${w.company}` : ""}</p>
                          {(w.startDate || w.endDate) && <p className="text-muted-foreground">{w.startDate || "?"} — {w.endDate || "Present"}</p>}
                          {w.description && <p className="text-muted-foreground mt-1">{w.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-sm text-muted-foreground mt-1">None provided</p>}
                </div>

                <Button variant="outline" onClick={() => setLocation("/onboarding")}>
                  <Building2 className="h-4 w-4 mr-2" /> Update Application Info
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
