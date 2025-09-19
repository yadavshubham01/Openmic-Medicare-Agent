import path from "path";
import fs from "fs";

export type Patient = {
  name: string;
  lastVisit: string;
  allergies: string[];
  notes?: string;
};

export type CallLog = {
  time: string;
  type: string;
  medicalId: string;
  result: Patient | null;
  requestBody: unknown;
};

export type DataFile = {
  patients: Record<string, Patient>;
  calls: CallLog[];
  followUps:any;
};

const DATA_FILE = path.join(process.cwd(), "data", "data.json");

export function read_data(): DataFile {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw) as DataFile;
  } catch (err) {
    console.error("Error reading data.json:", err);
    return { patients: {}, calls: [] ,followUps :[] };
  }
}

export function write_data(d: DataFile): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing data.json:", err);
  }
}
