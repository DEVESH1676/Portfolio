import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { handleDemo } from "./routes/demo";
import { handleTrackEvent } from "./routes/analytics";
import { ContactRequestSchema } from "../shared/api";

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
          connectSrc: ["'self'", "https://api.web3forms.com"],
        },
      },
    })
  );

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

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

  app.post("/api/contact", async (req, res) => {
    try {
      const data = ContactRequestSchema.parse(req.body);
      console.log(
        `[Contact] Message from ${data.name} (${data.email}): ${data.message}`,
      );

      const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          subject: data.subject || "Portfolio Enquiry",
          message: data.message,
          from_name: "Devesh's Portfolio",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        res.json({ success: true, message: "Message received" });
      } else {
        throw new Error(result.message || "Failed to send via Web3Forms");
      }
    } catch (error) {
      console.error("[Contact API Error]", error);
      res.status(400).json({ success: false, error: "Invalid payload or delivery failed" });
    }
  });

  return app;
}
