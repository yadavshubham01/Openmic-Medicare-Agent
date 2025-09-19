import type { NextApiRequest, NextApiResponse } from "next";
import { read_data, Patient } from "@/lib/data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { medicalId } = req.body as { medicalId?: string };
    const data = read_data();

    const patient: Patient | undefined = medicalId
      ? data.patients[medicalId]
      : undefined;

    const variables = patient
      ? {
          patient_name: patient.name,
          patient_last_visit: patient.lastVisit,
          patient_allergies: patient.allergies.length
            ? patient.allergies.join(", ")
            : "None",
          patient_notes: patient.notes ?? "",
        }
      : {
          patient_name: "Unknown",
          patient_last_visit: "N/A",
          patient_allergies: "Unknown",
          patient_notes: "",
        };

    return res.status(200).json({
      success: true,
      variables,
    });
  } catch (err) {
    console.error("Error in precall handler:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
