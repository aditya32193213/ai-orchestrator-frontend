# 🚀 AI Document Orchestrator  
_Transform PDFs & text files into summaries, structured data, and professional emails using AI._

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini AI-Powered-orange?logo=google" />
  <img src="https://img.shields.io/badge/n8n-Automation-red?logo=n8n&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Production Success-brightgreen" />
</p>

A full-stack AI automation system for businesses that want to extract insights from documents and automatically draft professional emails with **Gemini AI**, **Node.js**, **React**, and **n8n**.

---

# 🌐 Live Demo

| Component | Link |
|----------|------|
| **Frontend (Vercel)** | https://ai-orchestrator-frontend.vercel.app |
| **Backend API (Render)** | https://ai-orchestrator-backend-f0k6.onrender.com |

---

# ✨ Key Features

## 📥 1. Document Upload & AI Summaries  
- Upload **PDF or TXT** files  
- Gemini AI generates:  
  ✔ Clean summary  
  ✔ Detailed answer  
  ✔ Natural-language explanation  

---

## 🧠 2. Structured Data Extraction  
Automatically extracts:  
- Employee details  
- Reference IDs  
- Dates  
- Organizations  
- Academic details  
- Invoice values  
- And more (dynamic extraction)

---

## ✉️ 3. Smart Email Drafting (User-Aware Logic)  
The system follows strict logic:

| User Input | System Behavior |
|------------|-----------------|
| Custom Subject | Used **exactly as is** |
| Custom Body | Used **exactly as is** |
| Subject empty | AI generates a professional subject |
| Body empty | AI drafts polished, natural email |
| Always | Email field untouched |

✔ ZERO rewriting of user text  
✔ Fallback only when fields are empty  

---

## 📤 4. Email Delivery (SMTP)  
- Real-time preview in UI  
- n8n workflow automates sending  
- Clear success/error response to frontend  

---

## 🤖 5. n8n Workflow Automation  
A full automation pipeline:



PNG diagram included in screenshots section.

---

# 🧩 Tech Stack

### **Frontend**
- React.js  
- TailwindCSS  
- Axios  
- React Router  
- Vercel Hosting  

### **Backend**
- Node.js  
- Express.js  
- Gemini API  
- pdf-parse  
- Multer  
- Render Hosting  

### **Automation**
- n8n Cloud Workflow  
- Webhooks  
- SMTP  

---

# 🗂️ Folder Structure

```plaintext
ai-orchestrator-frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   └── backend.js
│   │
│   ├── components/
│   │   └── themetoggle.jsx
│   │
│   ├── context/
│   │   └── themecontext.jsx
│   │
│   ├── pages/
│   │   ├── fileupload.jsx
│   │   ├── notify.jsx
│   │   └── summaryresult.jsx
│   │
│   ├── App.jsx
│   └── index.js
│
├── screenshots/
│   ├── upload.png
│   ├── summary.png
│   ├── email-editor.png
│   └── n8n-workflow.png
│
├── .env                 # Local frontend env variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🏗️ System Architecture Diagram

```plaintext
                  ┌───────────────────────────┐
                  │        FRONTEND (React)   │
                  │ Upload Doc | Email Editor │
                  └───────────────┬───────────┘
                                  │
                                  ▼
                  ┌───────────────────────────┐
                  │   BACKEND (Node + Express)│
                  │ PDF Parsing | Gemini Calls│
                  │ Sends Data → n8n Webhook  │
                  └───────────────┬───────────┘
                                  │
                                  ▼
                  ┌───────────────────────────┐
                  │        n8n Workflow       │
                  │ AI Draft → JS Parse → SMTP│
                  └───────────────┬───────────┘
                                  │
                                  ▼
                  ┌───────────────────────────┐
                  │        Email Recipient    │
                  └───────────────────────────┘
```
---

# 📸 Screenshots

### 📤 **Document Upload Screen**  
![Upload Document](./screenshots/upload.png)

---

### 📊 **Summary + Structured Data**  
![Summary Page](./screenshots/summary.png)

---

### ✉️ **Email Editor + AI Response**  
![Email Editor](./screenshots/email-editor.png)

---

### 🤖 **n8n Workflow Diagram**  
![Workflow](./screenshots/n8n-workflow.png)

---

### 🧑‍💻 Author

Aditya Full Stack Developer GitHub: https://github.com/aditya32193213

---

### ⭐ Support

---

If you like this project, please ⭐ star the repository. Your support helps me grow as a developer ✨
# ⚙️ Installation

## 🔽 Clone Repositories

### Frontend:


```bash
git clone https://github.com/aditya32193213/ai-orchestrator-frontend.git
cd ai-orchestrator-frontend
npm install
npm start
```


