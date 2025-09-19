import type { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = process.env.OPENMIC_BASE_URL;
const API_KEY = process.env.OPENMIC_API_KEY as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (!API_KEY || !BASE_URL) {
    return res.status(500).json({ error: "Missing OpenMic configuration" });
  }

  try {
    switch (method) {
      case "GET": {
        const response = await fetch(`${BASE_URL}/bots`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });
        const data = await response.json();
        return res.status(response.status).json(data);
      }

      case "POST": {
        const body = req.body;
        const response = await fetch(`${BASE_URL}/bots`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return res.status(response.status).json(data);
      }

      case "PATCH": {
        const { bot_uid, ...updates } = req.body;
        if (!bot_uid) {
          return res.status(400).json({ error: "Missing bot_uid for update" });
        }

        const response = await fetch(`${BASE_URL}/bots/${bot_uid}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        });
        const data = await response.json();
        return res.status(response.status).json(data);
      }

      case "DELETE": {
        const { bot_uid } = req.query;
        if (!bot_uid || typeof bot_uid !== "string") {
          return res.status(400).json({ error: "Missing bot_uid for delete" });
        }

        const response = await fetch(`${BASE_URL}/bots/${bot_uid}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${API_KEY}` },
        });

        if (!response.ok) {
          const err = await response.text();
          return res.status(response.status).json({ error: err });
        }

        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.error("Error in bots handler:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
