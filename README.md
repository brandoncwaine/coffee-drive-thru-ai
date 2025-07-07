# ☕ AI-Powered Drive-Thru Assistant

An AI-driven chatbot assistant for coffee shop drive-thrus, built to streamline order-taking and enhance the customer experience during busy rush hours.

## 🚀 Project Overview

Working in hospitality—especially at a fast-paced place like Costa Coffee—taught me the excitement and pressure of keeping the line moving while making people smile. One challenge always stood out: how can we keep up with the morning rush when everyone wants their caffeine *now*?

This project explores how AI can step in to assist baristas by automating the order-taking process at a drive-thru. It uses voice recognition, AI-powered conversation, order management, and voice synthesis to create a seamless, interactive drive-thru experience.

## 🎯 Vision

The goal is to create a chatbot that can:
- Listen to customer voice input via drive-thru
- Interpret the order naturally and accurately
- Confirm orders clearly and handle modifications
- Update live stock in real time
- Speak back to customers with a human-like voice
- Display the interaction on a simple, clean UI

## 🛠 Tech Stack

- **React (TypeScript)** – Front-end user interface
- **Node.js** – Backend API server
- **Google Gemini API** – Conversational AI engine
- **Web Speech API** – Voice recognition (speech-to-text)
- **PlayHT API** – Realistic voice synthesis (text-to-speech)
- **TailwindCSS** – Simple, responsive styling
- **JSON Schema** – Structured order format and live stock validation

## ⚙️ Key Features

### 🎙️ 1. Voice Recognition & AI-Powered Conversation
- Uses the browser’s **Web Speech API** to capture voice orders.
- Integrates **Google Gemini** to understand and respond conversationally.
- Example:
  > "I’d like a large latte and a flat white"  
  > → "One large latte and one flat white, got it! Anything else?"

### 📦 2. Order Management & Stock Integration
- Orders are parsed into a standardized **JSON Schema**.
- Menu items are restricted to what's available in the JSON file (no rogue AI guesses).
- Handles **live stock checking** to prevent ordering out-of-stock items.

### 🔊 3. Natural Voice Response
- Uses **PlayHT** for realistic voice synthesis.
- API endpoints like `/say` and `/talk` handle voice playback and Gemini interaction.
- Creates a friendly, interactive, and fully voice-driven user experience.

### 💻 4. Clean Front-End Interface
- Built with **React** and styled with **TailwindCSS**.
- Displays:
  - User’s voice/text input
  - Gemini’s responses
  - Real-time order summary

![Project Screenshot Placeholder](#)  
*An overview screenshot of the React UI (replace with actual image)*

## ✅ Results

- The prototype works well for simple, real-time voice orders.
- Helps reduce wait time and improve order accuracy.
- Some quirks remain (e.g., AI sometimes "upsells" or duplicates orders).
- Feeding prior order data into Gemini improved accuracy.

## 📚 Lessons Learned

- Handling AI creativity (e.g., adding extra syrups!) requires strong constraints.
- A good user experience needs a balance between automation and control.
- Future enhancements could include:
  - Integration with loyalty apps (QR code scanning for points)
  - In-app payment support
  - Multilingual support for broader accessibility

## 💡 Final Thoughts

This AI drive-thru assistant was a fun and challenging experiment in blending voice technology with real-world customer service. It’s a step toward a future where coffee orders are faster, more consistent, and still personal—just a little more robotic (in the best way possible).
