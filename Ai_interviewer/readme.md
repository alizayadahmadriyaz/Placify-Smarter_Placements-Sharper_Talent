# 🤖 AI Interview Assistant

An intelligent **Streamlit-based interview platform** that analyzes your resume and conducts personalized technical interviews using advanced AI language models.

---

## ✨ Features

- **📄 Smart Resume Analysis**
  - Automatic PDF text extraction (PyPDF2)
  - Skill & experience mining
  - Professional profile summary
  - Domain expertise detection

- **🎯 Personalized Interview Questions**
  - AI-generated, resume-aware prompts
  - Technical + behavioral mix
  - Difficulty scales with experience
  - Exactly **5 tailored questions** per session

- **🤖 Real-time AI Evaluation**
  - Instant scoring with rationale
  - Keyword/knowledge checks
  - Clarity & structure assessment
  - Constructive, specific feedback

- **📊 Comprehensive Feedback System**
  - Overall score (0–10)
  - Technical competency
  - Communication skills
  - Hire recommendation
  - Per-question breakdown
  - Actionable improvements

- **🎨 Professional UI**
  - Clean Streamlit interface
  - Real-time progress tracker
  - Sidebar navigation
  - Responsive on all devices

---

## 🛠️ Tech Stack

- **Frontend:** Streamlit  
- **AI Orchestration:** LangGraph, LangChain  
- **Language Model:** *Groq OpenAI GPT-OSS-120B* (via **Groq API**)  
- **PDF Processing:** PyPDF2  
- **Runtime:** Python 3.8+

---

## 🚀 Quick Start

### 1) Prerequisites
- Python **3.8+**
- A **Groq API key** (get one from your Groq dashboard)

### 2) Navigate to Folder
```bash
cd Ai_interviewer
```
### 3) Install Dependencies
```bash
pip install -r requirements.txt
```
### 4) Add Your Groq_Api_Key
```bash 
echo "Groq_Api_key=your_actual_groq_api_key_here" > .env
```
### 5) Launch the Application
```bash 
streamlit run checker.py --server.port 8501
```
### 6) Architecture Of The Agent
![Image](Ai_interviewer\flow_graph.png)




