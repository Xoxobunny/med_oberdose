# 🌟 MedSafety — Opioid Medication Overdose Risk Prediction  
### 🧠 AI-powered Clinical Decision Support System  
### 🔥 FastAPI + Machine Learning + React + Firebase

MedSafety is an intelligent medication-safety assistant that evaluates **opioid overdose risk** based on a patient’s medications, lifestyle factors, and clinical history.  
It uses a trained **Machine Learning model**, calculates **Daily MME**, visualizes risks, and provides **safety recommendations and monitoring guidelines**.

This full-stack project includes:

- ⚡ FastAPI backend with an ML model  
- 🧠 Python Logistic Regression model  
- 🎨 Beautiful React + TypeScript UI  
- ⛅ Firebase Authentication + Firestore database  
- 🎛️ Dynamic charts (Recharts)  
- 🌙 Full dark/light mode  
- 📌 Pinned analyses, history system, delete records  
- 💾 Save analysis directly from results page  

---

<br>

<div align="center">

## 🎥 **UI Preview**  
📊 Dashboard • 📈 Risk Charts • 💊 Form • 🗂️ History • ⚙️ Settings

</div>

---

# 🚀 Features

## 🧠 **Machine Learning-Based Risk Prediction**
- Logistic Regression model trained on clinical opioid risk indicators  
- Predicts overdose probability (0–100%)  
- Calculates **total daily MME** using opioid potency factors  
- Handles multiple medications  
- Dynamic contribution charts

## 💊 **Smart Medication Entry & MME Calculator**
- Add/remove medications  
- Prevents duplicates  
- Computes MME instantly  
- Auto-fills patient age & gender from profile  
- Back-button restores previous values  

## 🧾 **Professional Analysis Results**
- Combined “Risk & Medication Analysis” card  
- Side-by-side layout: risk score + charts  
- Pie chart (Safe vs Risk %)  
- Medication-specific MME contribution bar-chart  
- Risk interpretation alert  
- Clinical monitoring guidance  
- Practical safety tips + recommendations (dual-card layout)  
- **Clean Save button** (stores analysis to Firestore)

## 📚 **History Page (Fully Interactive)**
- Displays all saved analyses  
- Pinned analyses with dedicated toggle  
- Delete record (Trash-2 icon + confirmation popover)  
- **Right-side details panel stays fixed** (only left list scrolls)  
- Click any record to view risk charts, medications & total MME  

## 👤 **User Profile**
- Stores patient age, gender, height, weight  
- Auto-fills required form fields  
- Editable anytime  

## ⚙️ **Settings**
- Dark mode toggle (stored in localStorage)  
- Real-time toast message (“Dark mode activated”)  
- Notification toggle  
- Quick view of pinned analyses  

## 🌑 **Theme System**
- Fully synced dark/light UI  
- LocalStorage persistence  
- Smooth transition  
- Clean gradient & soft color system  

## 🔐 **Secure Data Handling**
- Firebase Authentication  
- Firestore database with user-specific data  
- Document IDs used for delete/update operations  
- CORS-protected FastAPI backend  

---

# 🏗️ System Architecture

                 ┌───────────────────────────┐
                 │     React Frontend        │
                 │  (TS + Tailwind + UI)     │
                 └───────────┬───────────────┘
                             │  Axios (JSON)
                             ▼
                  ┌────────────────────────┐
                  │     FastAPI Backend    │
                  │ • Predict overdose     │
                  │ • Calculate MME        │
                  │ • Save/Delete history  │
                  └───────────┬────────────┘
                              │
                 ┌────────────────────────────┐
                 │      Firebase Firestore    │
                 │  users / analyses records  │
                 └────────────────────────────┘


---

# 🤖 Machine Learning Model

### 📌 Model Used
- Logistic Regression (scikit-learn)  
- StandardScaler for feature normalization  
- Trained on 20+ opioid-related clinical features  

### 📥 Input Features
- Age, gender  
- Medical conditions (respiratory, liver, mental health…)  
- Concurrency (benzos, sedatives, antidepressants)  
- Daily opioid dosage  
- Daily MME  
- Primary opioid & potency factor  

### 📤 Output
```json
{
  "prediction": 1,
  "risk_probability": 0.78
}
```
---
# 🧰 Tech Stack

## 🌐 Frontend
- ⚛️ **React + TypeScript**
- 🎨 **TailwindCSS**
- 🧩 **shadcn/ui components**
- 📡 **Axios** (API communication)
- 📊 **Recharts** (interactive charts)
- 💡 **LocalStorage** (theme & state persistence)

## 🔧 Backend
- 🚀 **FastAPI**
- 🐍 **Python 3**
- 🧠 **scikit-learn** (Logistic Regression model)
- 📦 **joblib** (model + scaler loading)
- 🔐 **Firebase Admin SDK**
- 🔁 **CORS Middleware**

## ☁️ Cloud & Database
- 🔥 **Firebase Authentication**
- 🗂️ **Firestore Database**
- 📁 **Firebase Storage** (optional file handling)

## 🛠️ Dev Tools
- 🧪 **Uvicorn** (FastAPI server)
- 📁 **Virtual Environment (.venv)**
- 🛠️ **Node.js + npm**
- 📝 **ESLint + Prettier** (optional formatting)

---
# ✨ Features

## 🧠 Machine Learning Risk Prediction
- Logistic Regression model
- Predicts overdose probability (0–100%)
- Calculates **Daily MME**
- Handles multiple medications
- Visual risk interpretation + charts

## 💊 Smart Medication Handling
- Add/remove medications
- Duplicate-prevention logic
- Auto MME calculation
- Auto-fill patient age & gender
- Back-button restores previous entries

## 📊 Professional Analysis Output
- Combined **Risk + Medication Analysis** card
- Pie Chart (Safe vs Risk %)
- Bar Chart (MME contribution per medication)
- Monitoring guidelines + safety tips
- One-click **Save Analysis** to Firestore

## 📚 History Management
- View all saved analyses
- Pin/unpin important records
- Delete with confirmation popover
- Fixed details panel on the right
- Scrollable list on the left

## 👤 User Profile
- Stores age, gender, height, weight
- Auto-fills form
- Editable anytime

## ⚙️ Settings
- Dark/Light mode toggle
- LocalStorage-based theme saving
- Toast notifications
- Quick view of pinned analyses

## 🔐 Secure Backend
- Firebase Authentication
- Firestore user-specific documents
- CORS-protected FastAPI server

## 🌗 Theme System
- Smooth dark/light transitions
- Gradient-based UI design
- Persistent theme storage

---
# 🛠️ Installation & Setup

## 📥 Clone Repository
```bash
git clone https://github.com/Vinay-sp-2004/Opioid_med_overdose
cd Opioid_med_overdose
```

---

# 🔧 Backend Setup (FastAPI)

## 🐍 Create Virtual Environment
```bash
python -m venv .venv
```

### ▶️ Activate Environment
**Windows**
```bash
.venv\Scripts\activate
```

**Linux / Mac**
```bash
source .venv/bin/activate
```

## 📦 Install Dependencies
```bash
pip install -r requirements.txt
```

## ▶️ Run Server
```bash
uvicorn main:app --reload
```

FastAPI will be available at:
- http://127.0.0.1:8000/docs  
- http://127.0.0.1:8000/redoc

---

# 🌐 Frontend Setup (React + TypeScript)

## 📦 Install Node Dependencies
```bash
cd frontend
npm install
```

## ▶️ Start Frontend Dev Server
```bash
npm run dev
```

App opens at:
- http://localhost:5173/

---

# 🔑 Environment Variables

## Backend `.env`
```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email
```

## Frontend `.env`
```
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
```
---
# 👨‍💻 About the Author

Hi! I’m **Vinay S P**, a Computer Science student passionate about  
**AI, Machine Learning, Full-Stack Development, and Intelligent Healthcare Systems**.

I love building projects that blend clean UI, strong engineering, and real-world impact.  
If you're interested in collaborating, improving this project, or just discussing ideas — feel free to connect!

📫 **Reach me on GitHub:**  
👉 [Vinay-sp-2004](https://github.com/Vinay-sp-2004)

If you found this project helpful, inspiring, or worth learning from:

### 👉 **Please give it a ⭐ on GitHub!**  
It motivates future updates, improvements, and new features.

<div align="center">
  
❤️ **Your star helps this project grow!** ⭐

</div>

