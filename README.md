# 🩺 OpenMic Agent Flow

An interactive demo application that integrates with **OpenMic** to simulate a medical intake agent.
It supports **bot management (CRUD)**, **call logging**, **summaries**, and **follow-up scheduling**.


## 🚀 Features

* 🔹 **Bot Management (CRUD)**

  * Create, update, delete, and list bots (with their UIDs).

* 🔹 **Pre Call Actions**

  * requests for patient data before call.

* 🔹 **In-Call Function**

  *  Agent project for medical id and check related the patient in data and further query

* 🔹 **Post-Call Actions**

  * Stores call summary
  * Optionally requests follow-up appointments tied to a **Medical ID**

* 🔹 **UI Views**

  * **Navbar** to switch between:

    * 🧑‍💻 Bots Page
    * 📑 Logs Page
  * **Logs Page** with:

    * Paginated call logs
    * Modal popups for summaries and transcripts (rendered as chat bubbles)


## 🛠️ Tech Stack

* **Next.js** (API routes + frontend)
* **React + TailwindCSS** (UI components)
* **Node.js** for server logic
* **File-based JSON storage** (for logs + follow-ups)
* **OpenMic API** for bot operations



## 📂 Project Structure

```
.
├── components/
│ ├── Navbar.tsx # Navigation between Bots and Logs
│ ├── Modal.tsx # Reusable modal for summaries/transcripts
│ ├── LogsView.tsx # Call log list with pagination
│ └── bot.tsx # Bot management UI
│
├── lib/
│ ├── data.ts # read/write local JSON storage
│ └── type.ts # Type definitions (CallEntry, etc.)
│
├── pages/
│ ├── api/
│ │ ├── openmic/
│ │ │ ├── bots.ts # Proxy API for OpenMic Bot CRUD
│ │ │ ├── function.ts # In-call function call
│ │ │ ├── postcall.ts # Post-call webhook
│ │ │ └── precall.ts # Pre-call webhook
│ │ └── logs.ts # Serve stored logs
│ │
│ └── index.tsx # Main entry (switches between Bots/Logs)
│
├── package.json
└── README.md

```



## ⚙️ Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/openmic-agent-flow.git
   cd openmic-agent-flow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` with:

   ```env
   OPENMIC_BASE_URL=https://api.openmic.ai
   OPENMIC_API_KEY=your_api_key_here
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)



## 📑 API Endpoints

### `/api/opemic/bots`

* `GET` → List all bots
* `POST` → Create a new bot
* `PATCH` → Update bot (`bot_uid`)
* `DELETE` → Delete bot (`bot_uid`)

### `/api/openmic/precall`

* `POST` -> Endpoint returns paitent data before the conversation of in-call.

### `/api/openmic/fuction`

* `POST` -> In call-fuction, Agent prompts for Medical ID; API pulls relevant record/details during the active session.
  * Show API response used in the conversation.

### `/api/opemic/postcall`

* `POST` → Store call summary & transcript

  * Endpoint receives and processes summary , raw data and transcript at call end, configured from OpenMic
    dashboard.

### `/api/logs`

* `GET` → Fetch stored call logs


## 🖼️ UI Demo

* **Bots Page** → Manage bots with CRUD actions
* **Logs Page** → View call logs, summaries, and transcripts in modals
* Transcript is displayed as **conversation chat bubbles**



## 📝 Future Improvements

* ✅ Persistent database (Postgres/Mongo) instead of JSON file
* ✅ Authentication for dashboard
* ✅ Search/filter logs by Medical ID or date
* ✅ Deploy to Vercel with environment secrets



## 🤝 Contributing

1. Fork the project
2. Create a new branch (`feature/my-feature`)
3. Commit changes
4. Push and open a Pull Request

---

## 📜 License

MIT © 2025 — Built for OpenMic Agent Flow demo
