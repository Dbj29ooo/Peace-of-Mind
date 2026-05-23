import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowRight, ArrowLeft, Check, X, Plus, Trash2, Building2 } from "lucide-react";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
];

interface Reference {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface WorkEntry {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface OnboardingData {
  firstName: string;
  lastName: string;
  state: string;
  householdSize: string;
  onHousingAssistance: string;
  onGovernmentFunding: string;
  willingToRelocate: string;
  references: Reference[];
  workHistory: WorkEntry[];
}

export default function OnboardingWizard() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    state: "",
    householdSize: "",
    onHousingAssistance: "",
    onGovernmentFunding: "",
    willingToRelocate: "",
    references: [],
    workHistory: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addReference = () => {
    setData((prev) => ({
      ...prev,
      references: [...prev.references, { name: "", relationship: "", phone: "", email: "" }],
    }));
  };

  const updateReference = (idx: number, field: string, value: string) => {
    setData((prev) => {
      const refs = [...prev.references];
      refs[idx] = { ...refs[idx], [field]: value };
      return { ...prev, references: refs };
    });
  };

  const removeReference = (idx: number) => {
    setData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== idx),
    }));
  };

  const addWorkEntry = () => {
    setData((prev) => ({
      ...prev,
      workHistory: [...prev.workHistory, { company: "", position: "", startDate: "", endDate: "", description: "" }],
    }));
  };

  const updateWorkEntry = (idx: number, field: string, value: string) => {
    setData((prev) => {
      const entries = [...prev.workHistory];
      entries[idx] = { ...entries[idx], [field]: value };
      return { ...prev, workHistory: entries };
    });
  };

  const removeWorkEntry = (idx: number) => {
    setData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== idx),
    }));
  };

  const saveMutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setLocation("/");
    },
  });

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 1) {
      if (!data.firstName.trim()) newErrors.firstName = "First name is required";
      if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    }
    if (s === 2) {
      if (!data.state) newErrors.state = "Select a state";
    }
    if (s === 3) {
      if (!data.householdSize) newErrors.householdSize = "Select household size";
      if (!data.onHousingAssistance) newErrors.onHousingAssistance = "Select an option";
      if (!data.onGovernmentFunding) newErrors.onGovernmentFunding = "Select an option";
      if (!data.willingToRelocate) newErrors.willingToRelocate = "Select an option";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  const handleSubmit = () => {
    const refs = data.references.filter((r) => r.name || r.relationship || r.phone);
    const work = data.workHistory.filter((w) => w.company || w.position);
    saveMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      state: data.state,
      householdSize: data.householdSize,
      onHousingAssistance: data.onHousingAssistance,
      onGovernmentFunding: data.onGovernmentFunding,
      willingToRelocate: data.willingToRelocate,
      references: refs.length > 0 ? JSON.stringify(refs) : null,
      workHistory: work.length > 0 ? JSON.stringify(work) : null,
      onboardingCompleted: "true",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 bg-primary/10 rounded-full p-3 w-fit">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold">Set Up Your Profile</h1>
          <p className="text-muted-foreground mt-1">
            Step {step} of {totalSteps}
          </p>
          <div className="flex justify-center gap-1.5 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-colors ${
                  i + 1 <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Your Name"}
              {step === 2 && "Search Location"}
              {step === 3 && "Housing & Benefits"}
              {step === 4 && "References"}
              {step === 5 && "Work History"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Let's start with your basic information."}
              {step === 2 && "Which state would you like to search for resources in?"}
              {step === 3 && "Help us understand your current situation."}
              {step === 4 && "Add people who can vouch for you (optional)."}
              {step === 5 && "Tell us about your work experience (optional)."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Name */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={data.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={data.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: State */}
            {step === 2 && (
              <div className="space-y-2">
                <Label>State *</Label>
                <Select value={data.state} onValueChange={(v) => update("state", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
              </div>
            )}

            {/* Step 3: Housing & Benefits */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Household Size *</Label>
                  <Select value={data.householdSize} onValueChange={(v) => update("householdSize", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of people in your household" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, "8+"].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "person" : "people"}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.householdSize && <p className="text-sm text-destructive">{errors.householdSize}</p>}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Are you currently on housing assistance? *</Label>
                  <RadioGroup value={data.onHousingAssistance} onValueChange={(v) => update("onHousingAssistance", v)}>
                    <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="housing-yes" /><Label htmlFor="housing-yes">Yes</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="no" id="housing-no" /><Label htmlFor="housing-no">No</Label></div>
                  </RadioGroup>
                  {errors.onHousingAssistance && <p className="text-sm text-destructive">{errors.onHousingAssistance}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Are you currently on government funding? *</Label>
                  <RadioGroup value={data.onGovernmentFunding} onValueChange={(v) => update("onGovernmentFunding", v)}>
                    <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="gov-yes" /><Label htmlFor="gov-yes">Yes</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="no" id="gov-no" /><Label htmlFor="gov-no">No</Label></div>
                  </RadioGroup>
                  {errors.onGovernmentFunding && <p className="text-sm text-destructive">{errors.onGovernmentFunding}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Are you willing to relocate? *</Label>
                  <RadioGroup value={data.willingToRelocate} onValueChange={(v) => update("willingToRelocate", v)}>
                    <div className="flex items-center gap-2"><RadioGroupItem value="yes" id="relocate-yes" /><Label htmlFor="relocate-yes">Yes</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="no" id="relocate-no" /><Label htmlFor="relocate-no">No</Label></div>
                  </RadioGroup>
                  {errors.willingToRelocate && <p className="text-sm text-destructive">{errors.willingToRelocate}</p>}
                </div>
              </div>
            )}

            {/* Step 4: References */}
            {step === 4 && (
              <div className="space-y-4">
                {data.references.map((ref, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 text-destructive"
                      onClick={() => removeReference(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Full Name</Label>
                        <Input value={ref.name} onChange={(e) => updateReference(idx, "name", e.target.value)} placeholder="Name" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Relationship</Label>
                        <Input value={ref.relationship} onChange={(e) => updateReference(idx, "relationship", e.target.value)} placeholder="Friend, coworker, etc." />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Phone</Label>
                        <Input value={ref.phone} onChange={(e) => updateReference(idx, "phone", e.target.value)} placeholder="(555) 123-4567" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Email</Label>
                        <Input value={ref.email} onChange={(e) => updateReference(idx, "email", e.target.value)} placeholder="email@example.com" />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addReference} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Reference
                </Button>
                {data.references.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">No references added yet. You can skip this step.</p>
                )}
              </div>
            )}

            {/* Step 5: Work History */}
            {step === 5 && (
              <div className="space-y-4">
                {data.workHistory.map((entry, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 text-destructive"
                      onClick={() => removeWorkEntry(idx)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Company</Label>
                        <Input value={entry.company} onChange={(e) => updateWorkEntry(idx, "company", e.target.value)} placeholder="Company name" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Position</Label>
                        <Input value={entry.position} onChange={(e) => updateWorkEntry(idx, "position", e.target.value)} placeholder="Job title" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Start Date</Label>
                        <Input type="date" value={entry.startDate} onChange={(e) => updateWorkEntry(idx, "startDate", e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">End Date</Label>
                        <Input type="date" value={entry.endDate} onChange={(e) => updateWorkEntry(idx, "endDate", e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Input value={entry.description} onChange={(e) => updateWorkEntry(idx, "description", e.target.value)} placeholder="Brief description of your role" />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addWorkEntry} className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Job
                </Button>
                {data.workHistory.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">No work history added yet. You can skip this step.</p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              ) : (
                <div />
              )}
              {step < totalSteps ? (
                <Button onClick={handleNext}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Complete Setup
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
