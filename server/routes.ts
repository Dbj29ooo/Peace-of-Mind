import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { setupSocialAuth } from "./replit_integrations/auth/social";
import { setupLocalAuth } from "./replit_integrations/auth/local";
import { registerProfileRoutes } from "./replit_integrations/auth/profile";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);
  setupSocialAuth(app);
  setupLocalAuth(app);
  registerAuthRoutes(app);
  registerProfileRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
