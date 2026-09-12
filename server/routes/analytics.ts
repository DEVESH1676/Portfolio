import { Request, Response } from "express";
import { AnalyticsEventSchema } from "../../shared/api";

export function handleTrackEvent(req: Request, res: Response) {
  try {
    const { event, data } = AnalyticsEventSchema.parse(req.body);

    // In a real application, you would save this to a database
    // For now, we log it to demonstrate the connection is working
    console.log(`[Analytics] Event: ${event}`, data);

    res.json({ success: true, message: "Event tracked" });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid payload" });
  }
}
