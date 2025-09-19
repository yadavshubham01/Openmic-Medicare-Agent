import type { NextApiRequest, NextApiResponse } from "next";
import { CallLog, read_data, write_data } from "@/lib/data";

interface PostCallPayload {
  summary?: string;
  transcript?: string[];
  raw?: unknown;
  request_follow_up?: boolean;
  medicalId?: string;
}

interface Entry extends CallLog {
  receivedAt: string;
  event: string;
  summary: string | null;
  transcript: string[];
  raw: unknown;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload: PostCallPayload = req.body;
    const data = read_data();

    const entry: Entry = {
      time: new Date().toISOString(),
      type: "end-of-call-report",
      medicalId: payload?.medicalId || "unknown",
      result: null,
      requestBody: payload,
      receivedAt: new Date().toISOString(),
      event: "end-of-call-report",
      summary: payload.summary ?? null,
      transcript: payload.transcript ?? [],
      raw: payload,
    };

    data.calls.push(entry);

    if (payload?.request_follow_up && payload?.medicalId) {
      const followUp = {
        id: `FU-${Date.now()}`,
        medicalId: payload.medicalId,
        requestedAt: new Date().toISOString(),
        notes: payload.summary || "Follow-up requested",
      };
      data.followUps = data.followUps || [];
      data.followUps.push(followUp);
    }

    write_data(data);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error in postcall handler:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
