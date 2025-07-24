# AI Interview Evaluation Bot (Core Module)

This module mimics real-world interviews by analyzing candidate responses via video and audio. It evaluates candidates based on facial expressions, vocal cues, and the technical accuracy of their answers.

---

## 🔍 Sub-Modules

### 1. Emotion Detector (`emotion_detector/`)
- Detects emotions like confidence, stress, confusion from webcam video frames.
- Uses CNN model trained on FER-2013 dataset.

**Files:**
- `model.py`: Loads the CNN model.
- `predict.py`: Predicts emotion from frame.
- `utils.py`: Preprocessing and helper functions.

---

### 2. Speech Analysis (`speech_analysis/`)
- Analyzes voice pitch, tone, pauses, and sentiment.
- Converts speech to text and computes prosody metrics.

**Files:**
- `audio_to_text.py`: Converts audio to transcript.
- `sentiment_analyzer.py`: Analyzes sentiment and tone.
- `prosody_metrics.py`: Computes pitch, pauses, and clarity.

---

### 3. Answer Accuracy (`answer_accuracy/`)
- Checks technical correctness of spoken answers.
- Uses TF-IDF similarity and keyword matching.

**Files:**
- `evaluate.py`: Semantic similarity score with ideal answer.
- `keyword_checker.py`: Checks presence of key concepts/terms.

---

## ✅ How to Install

```bash
cd ml_modules
pip install -r requirements.txt
