import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import type { Express } from "express";
import { authStorage } from "./storage";

export function setupLocalAuth(app: Express) {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await authStorage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }
          if (!user.passwordHash) {
            return done(null, false, { message: "Invalid email or password" });
          }
          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, { id: user.id, claims: { sub: user.id } });
        } catch (err) {
          return done(err as Error);
        }
      }
    )
  );

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const existing = await authStorage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "Email already registered" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await authStorage.createUser({
        email,
        firstName: firstName || email.split("@")[0],
        lastName: lastName || "",
        passwordHash,
        provider: "email",
      });

      req.login({ id: user.id, claims: { sub: user.id } }, (err) => {
        if (err) return res.status(500).json({ message: "Login failed" });
        return res.status(201).json({
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
        });
      });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.json({ message: "Logged in successfully" });
      });
    })(req, res, next);
  });


}
