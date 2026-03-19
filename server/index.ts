import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleTrackEvent } from "./routes/analytics";
import { ContactRequestSchema } from "../shared/api";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.netlify.app', /\.netlify\.app$/] 
      : '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/analytics", handleTrackEvent);

  app.post("/api/contact", (req, res) => {
    try {
      const data = ContactRequestSchema.parse(req.body);
      console.log(`[Contact] Message from ${data.name} (${data.email}): ${data.message}`);
      res.json({ success: true, message: "Message received" });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid payload" });
    }
  });

  return app;
}
