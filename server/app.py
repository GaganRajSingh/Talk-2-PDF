from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

docs = []
chains = []


@app.route('/upload', methods=['POST'])
def upload():
    global docs, chains

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    pdf_file = request.files['file']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Read PDF content
    text = ''
    pdf_reader = PdfReader(pdf_file)
    for page in pdf_reader.pages:
        text += page.extract_text()

    # Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=512,
        chunk_overlap=32,
        length_function=len,
    )
    texts = text_splitter.split_text(text)

    # Generate embeddings and create search index
    embeddings = OpenAIEmbeddings()
    docsearch = FAISS.from_texts(texts, embeddings)
    chain = load_qa_chain(ChatOpenAI(), chain_type="stuff")
    docs.append(docsearch)
    chains.append(chain)
    return jsonify({'message': 'PDF analyzed successfully'}), 200

@app.route('/query', methods=['POST'])
def query_model():
    global docs, chains
    if not docs or not chains:
        return jsonify({'error': 'Upload pdf first'}), 400

    data = request.json
    query = data.get('query')
    index = data.get('index')

    if query is None:
        return jsonify({'error': 'Query not provided'}), 400
    if index is None or index >= len(docs):
        return jsonify({'error': 'Wrong index'}), 400

    documents = docs[index].similarity_search(query)
    answer = chains[index].run({"input_documents": documents, "question": query})

    return jsonify({'message': answer}), 200

@app.route('/clear', methods=['POST'])
def clear_state():
    global docs, chains
    if not docs or not chains:
        return jsonify({'error': 'Nothing to clear'}), 200

    docs = []
    chains = []
    return jsonify({'message': "State cleared"}), 200


if __name__ == '__main__':
    app.run(debug=True)
