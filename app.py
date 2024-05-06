from flask import Flask, request, jsonify
from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import ChatVectorDBChain
from langchain.llms import OpenAI
import config


app = Flask(__name__)
embeddings = OpenAIEmbeddings(openai_api_key="sk-proj-xgkPM1M2WVHtqUD3s1dpT3BlbkFJzyAgxl7LAGtlL9NZCVL3")


@app.route('/upload', methods=['POST'])
def upload_pdf():
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        loader = PyPDFLoader("Resume.pdf")
        pages = loader.load_and_split()
        db = FAISS.from_documents(pages, embeddings)
        

        chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")

        query = "Who created transformers?"
        docs = db.similarity_search(query)

        
        # vectordb = Chroma.from_documents(pages, embedding = embeddings, persist_directory = '.')
        # vectordb.persist()
        # pdf_qa = ChatVectorDBChain.from_llm(OpenAI(temperature = 0.9, model_name="gpt-3.5-turbo"), vectordb, return_source_documents=True)
        return jsonify({'message': chain.run(input_documents=docs, question=query)})



@app.route('/query', methods=['POST'])
def query_pdf():
    if 'query' not in request.json:
        return jsonify({'error': 'No query provided'})

    query = request.json['query']

    response = pdf_qa({"question": query, "chat_history": ""})

    return jsonify({'response': response["answer"]})

if __name__ == '__main__':
    app.run(debug=True)