import passport from "passport";
import type { Express } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as AppleStrategy } from "passport-apple";
import { authStorage } from "./storage";

interface SocialProfile {
  id: string;
  provider: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}

function extractProfile(provider: string, profile: any): SocialProfile {
  switch (provider) {
    case "google": {
      const email = profile.emails?.[0]?.value;
      const nameParts = (profile.displayName || "").split(" ");
      return {
        id: profile.id,
        provider: "google",
        email,
        firstName: nameParts[0] || email?.split("@")[0] || "User",
        lastName: nameParts.slice(1).join(" ") || "",
        photo: profile.photos?.[0]?.value,
      };
    }
    case "github": {
      const email = profile.emails?.[0]?.value || profile._json?.email;
      return {
        id: profile.id,
        provider: "github",
        email,
        firstName: profile.displayName || profile.username || email?.split("@")[0] || "User",
        lastName: "",
        photo: profile.photos?.[0]?.value || profile._json?.avatar_url,
      };
    }
    case "twitter": {
      return {
        id: profile.id,
        provider: "twitter",
        email: profile.emails?.[0]?.value || profile._json?.email,
        firstName: profile.displayName || profile.username || "User",
        lastName: "",
        photo: profile.photos?.[0]?.value || profile._json?.profile_image_url_https,
      };
    }
    case "apple": {
      const email = profile.emails?.[0]?.value;
      const nameParts = (profile.displayName || "").split(" ");
      return {
        id: profile.id,
        provider: "apple",
        email,
        firstName: nameParts[0] || email?.split("@")[0] || "User",
        lastName: nameParts.slice(1).join(" ") || "",
        photo: profile.photos?.[0]?.value,
      };
    }
    default:
      return {
        id: profile.id,
        provider: provider,
        email: profile.emails?.[0]?.value,
        firstName: profile.displayName || "User",
        lastName: "",
        photo: profile.photos?.[0]?.value,
      };
  }
}

const mockLogin = async (req: any, res: any) => {
  const mockId = "local-dev-user";
  const existing = await authStorage.getUser(mockId);
  if (!existing) {
    await authStorage.createUser({
      id: mockId,
      email: "dev@localhost",
      firstName: "Local",
      lastName: "Developer",
      provider: "mock",
    });
  }
  req.login({ id: mockId, claims: { sub: mockId } }, (err: any) => {
    if (err) return res.status(500).json({ message: "Login failed" });
    res.redirect("/");
  });
};

export function setupSocialAuth(app: Express) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  const twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
  const twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
  const appleClientId = process.env.APPLE_CLIENT_ID;
  const appleTeamId = process.env.APPLE_TEAM_ID;
  const appleKeyId = process.env.APPLE_KEY_ID;
  const applePrivateKey = process.env.APPLE_PRIVATE_KEY;

  const hasGoogle = !!(googleClientId && googleClientSecret);
  const hasGitHub = !!(githubClientId && githubClientSecret);
  const hasTwitter = !!(twitterConsumerKey && twitterConsumerSecret);
  const hasApple = !!(appleClientId && appleTeamId && appleKeyId && applePrivateKey);

  // --- Google ---
  if (hasGoogle) {
    passport.use(
      "google",
      new GoogleStrategy(
        {
          clientID: googleClientId,
          clientSecret: googleClientSecret,
          callbackURL: "/api/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const data = extractProfile("google", profile);
            const user = await authStorage.upsertUser({
              id: `google:${data.id}`,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImageUrl: data.photo,
              provider: "google",
            });
            done(null, { id: user.id, claims: { sub: user.id } });
          } catch (err) {
            done(err as Error);
          }
        }
      )
    );
  }

  // --- GitHub ---
  if (hasGitHub) {
    passport.use(
      "github",
      new GitHubStrategy(
        {
          clientID: githubClientId,
          clientSecret: githubClientSecret,
          callbackURL: "/api/auth/github/callback",
          scope: ["user:email"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const data = extractProfile("github", profile);
            const user = await authStorage.upsertUser({
              id: `github:${data.id}`,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImageUrl: data.photo,
              provider: "github",
            });
            done(null, { id: user.id, claims: { sub: user.id } });
          } catch (err) {
            done(err as Error);
          }
        }
      )
    );
  }

  // --- Twitter / X ---
  if (hasTwitter) {
    passport.use(
      "twitter",
      new TwitterStrategy(
        {
          consumerKey: twitterConsumerKey,
          consumerSecret: twitterConsumerSecret,
          callbackURL: "/api/auth/twitter/callback",
          includeEmail: true,
        },
        async (_token, _tokenSecret, profile, done) => {
          try {
            const data = extractProfile("twitter", profile);
            const user = await authStorage.upsertUser({
              id: `twitter:${data.id}`,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImageUrl: data.photo,
              provider: "twitter",
            });
            done(null, { id: user.id, claims: { sub: user.id } });
          } catch (err) {
            done(err as Error);
          }
        }
      )
    );
  }

  // --- Apple ---
  if (hasApple) {
    passport.use(
      "apple",
      new AppleStrategy(
        {
          clientID: appleClientId,
          teamID: appleTeamId,
          keyID: appleKeyId,
          privateKeyString: applePrivateKey,
          callbackURL: "/api/auth/apple/callback",
          scope: ["name", "email"],
        },
        async (_accessToken, _refreshToken, idToken, profile, done) => {
          try {
            const data = extractProfile("apple", profile || { id: idToken });
            const user = await authStorage.upsertUser({
              id: `apple:${data.id}`,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImageUrl: data.photo,
              provider: "apple",
            });
            done(null, { id: user.id, claims: { sub: user.id } });
          } catch (err) {
            done(err as Error);
          }
        }
      )
    );
  }

  // --- Routes ---
  app.get("/api/auth/google", hasGoogle
    ? passport.authenticate("google", { scope: ["profile", "email"] })
    : mockLogin
  );
  app.get("/api/auth/google/callback", hasGoogle
    ? passport.authenticate("google", { successRedirect: "/", failureRedirect: "/?auth=failed" })
    : mockLogin
  );

  app.get("/api/auth/github", hasGitHub
    ? passport.authenticate("github", { scope: ["user:email"] })
    : mockLogin
  );
  app.get("/api/auth/github/callback", hasGitHub
    ? passport.authenticate("github", { successRedirect: "/", failureRedirect: "/?auth=failed" })
    : mockLogin
  );

  app.get("/api/auth/twitter", hasTwitter
    ? passport.authenticate("twitter")
    : mockLogin
  );
  app.get("/api/auth/twitter/callback", hasTwitter
    ? passport.authenticate("twitter", { successRedirect: "/", failureRedirect: "/?auth=failed" })
    : mockLogin
  );

  app.get("/api/auth/apple", hasApple
    ? passport.authenticate("apple")
    : mockLogin
  );
  app.get("/api/auth/apple/callback", hasApple
    ? passport.authenticate("apple", { successRedirect: "/", failureRedirect: "/?auth=failed" })
    : mockLogin
  );
}
