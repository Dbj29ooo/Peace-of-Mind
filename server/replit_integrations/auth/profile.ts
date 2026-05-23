import type { Express } from "express";
import { authStorage } from "./storage";
import { isAuthenticated } from "./replitAuth";
import { db } from "../../db";
import { users } from "@shared/models/auth";
import { eq } from "drizzle-orm";

const profileFields = (user: any) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  profileImageUrl: user.profileImageUrl,
  phone: user.phone,
  location: user.location,
  bio: user.bio,
  preferences: user.preferences,
  provider: user.provider,
  state: user.state,
  householdSize: user.householdSize,
  onHousingAssistance: user.onHousingAssistance,
  onGovernmentFunding: user.onGovernmentFunding,
  willingToRelocate: user.willingToRelocate,
  references: user.references,
  workHistory: user.workHistory,
  onboardingCompleted: user.onboardingCompleted,
  createdAt: user.createdAt,
});

export function registerProfileRoutes(app: Express) {
  app.get("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const user = await authStorage.getUser(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(profileFields(user));
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims?.sub || req.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const allowed = [
        "firstName", "lastName", "phone", "location", "bio",
        "profileImageUrl", "preferences",
        "state", "householdSize", "onHousingAssistance",
        "onGovernmentFunding", "willingToRelocate",
        "references", "workHistory", "onboardingCompleted",
      ];

      const updates: Record<string, any> = { updatedAt: new Date() };
      for (const key of allowed) {
        if (req.body[key] !== undefined) {
          updates[key] = req.body[key];
        }
      }

      const [updated] = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, userId))
        .returning();

      if (!updated) return res.status(404).json({ message: "User not found" });

      res.json(profileFields(updated));
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
}
