# Talk-2-PDFs 📄

Talk-2-PDFs enables users to interact with PDF documents using GenAI in a chat format. It facilitates question-answering interactions with uploaded PDFs. The backend is implemented in Python with Flask, leveraging OpenAI and Langchain technologies, while the frontend is developed using React, TypeScript, and Redux.

## Demo 🎥

Check out this demo video to see the project in action!

[![Demo video](https://img.youtube.com/vi/jS1Ef1Oy_xI/0.jpg)](https://www.youtube.com/watch?v=jS1Ef1Oy_xI)

## Steps to run 🚀

### 1. Install Virtualenv

```
pip3 install virtualenv
```

### 2. Clone the repository:

```
git clone https://github.com/GaganRajSingh/Talk-2-PDF.git
cd Talk-2-PDF
```

### 3. Setup Virtual environment:

```
cd server
virtualenv venv
```

### 4. Setup backend:

Add you OpenAI API key in server/.env

```
OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>"
```

Run backend

```
source venv/bin/activate
pip3 install -r requirements.txt
python3 app.py
```

### 5. Setup and run the frontend:

In second terminal window

```
cd Talk-2-PDF/client
npm install
npm start
```

Now you should be able to access the project locally via your web browser.
