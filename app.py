from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

docsearch = None
chain = None


@app.route('/upload', methods=['POST'])
def upload():
    global docsearch, chain

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    pdf_file = request.files['file']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'})
    
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

    return jsonify({'message': 'PDF analyzed successfully'})

@app.route('/query', methods=['POST'])
def query_model():
    global docsearch, chain
    if docsearch is None or chain is None:
        return jsonify({'error': 'Upload pdf first'})

    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({'error': 'Query not provided'})

    docs = docsearch.similarity_search(query)
    answer = chain.run({"input_documents": docs, "question": query})

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
