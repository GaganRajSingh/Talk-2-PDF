# Talk-2-PDFs 📄

Talk-2-PDFs enables users to interact with PDF documents using GenAI in a chat format. It facilitates question-answering interactions with uploaded PDFs. The backend is implemented in Python with Flask, leveraging OpenAI and Langchain technologies, while the frontend is developed using React, TypeScript, and Redux.

## Demo 🎥

Check out this demo video to see the project in action!

[![Demo video](https://img.youtube.com/vi/jS1Ef1Oy_xI/0.jpg)](https://www.youtube.com/watch?v=jS1Ef1Oy_xI)

## Getting Started 🚀

To use Talk-2-PDFs locally, follow these steps:

### Install Virtualenv

```
pip3 install virtualenv
```

### Clone the repository:

```
git clone https://github.com/GaganRajSingh/Talk-2-PDF.git
cd Talk-2-PDF
```

Add you OpenAI API key in server/.env

```
OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>"
```

### Setup Virtual environment and run the backend:

```
cd server
virtualenv venv
source venv/bin/activate
pip3 install -r requirements.txt

python3 app.py
```

### Setup and run the frontend:

```
cd ../client
npm install
npm start
```

Now you should be able to access the project locally via your web browser.
