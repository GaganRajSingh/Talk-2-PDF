# Talk-2-PDFs 📄

Talk-2-PDFs enables users to interact with PDF documents using GenAI in a chat format. It facilitates question-answering interactions with uploaded PDFs. The backend is implemented in Python with Flask, leveraging OpenAI and Langchain technologies, while the frontend is developed using React, TypeScript, and Redux.

## Demo 🎥

Check out this demo video to see the project in action!

[![Demo video](https://i3.ytimg.com/vi/jS1Ef1Oy_xI/maxresdefault.jpg)](https://www.youtube.com/watch?v=jS1Ef1Oy_xI)

## Steps to run 🚀

### Prerequisites

Docker installed on your machine

### Setup

#### 1. Clone the Repository

```
git clone https://github.com/GaganRajSingh/Talk-2-PDF.git
cd Talk-2-PDF
```

#### 2. Setup OpenAI API Key

Add your OpenAI API key in `/server/.env` file.

```
OPENAI_API_KEY = "<YOU_OPENAI_API_KEY>"
```

#### 3. Run the application using Docker

```
docker-compose up
```

Now you should be able to access the project locally via your web browser at `http://localhost:3000`.
