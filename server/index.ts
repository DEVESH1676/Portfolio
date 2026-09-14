import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { handleDemo } from "./routes/demo";
import { handleTrackEvent } from "./routes/analytics";

export function createServer() {
  const app = express();

  // Middleware
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? [process.env.CORS_ORIGIN || "https://deveshg.dev"]
          : "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          fontSrc: ["'self'", "https://fonts.googleapis.com", "https://api.fontshare.com", "https://fonts.gstatic.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://api.fontshare.com"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://cloud.umami.is"],
          imgSrc: ["'self'", "data:", "https://"],
        },
      },
    })
  );

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // Rate Limiting for API routes
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });
  app.use("/api/", apiLimiter);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://deveshg.dev/</loc></url>
      </urlset>`);
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/analytics", handleTrackEvent);

  return app;
}
