import { Request, Response } from "express";

export function handleTrackEvent(req: Request, res: Response) {
    const { event, data } = req.body;

    // In a real application, you would save this to a database
    // For now, we log it to demonstrate the connection is working
    console.log(`[Analytics] Event: ${event}`, data);

    res.json({ success: true, message: "Event tracked" });
}
