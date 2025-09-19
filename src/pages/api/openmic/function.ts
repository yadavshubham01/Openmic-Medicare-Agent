import type { NextApiRequest, NextApiResponse } from "next";
import { read_data, write_data, Patient, CallLog } from "@/lib/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { medicalId } = req.body as { medicalId?: string };

    if (!medicalId) {
      return res.status(400).json({ ok: false, error: "Missing medicalId" });
    }

    const data = read_data();
    const patient: Patient | undefined = data.patients[medicalId];

    const call_log: CallLog = {
      time: new Date().toISOString(),
      type: "function_call",
      medicalId,
      result: patient ?? null,
      requestBody: req.body,
    };

    data.calls.push(call_log);
    write_data(data);

    if (patient) {
      return res.status(200).json({ ok: true, patient });
    } else {
      return res.status(404).json({ ok: false, error: "Patient not found" });
    }
  } catch (err) {
    console.error("Error in get_patient handler:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
