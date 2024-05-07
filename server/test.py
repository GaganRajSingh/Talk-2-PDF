from PyPDF2 import PdfReader
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

pdf_reader = PdfReader("Resume.pdf")

# read data from the file and put them into a variable called text
text = ''
for i, page in enumerate(pdf_reader.pages):
    text = page.extract_text()
    if text:
        text += text


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 512,
    chunk_overlap  = 32,
    length_function = len,
)

texts = text_splitter.split_text(text)

embeddings = OpenAIEmbeddings()
docsearch = FAISS.from_texts(texts, embeddings)

chain = load_qa_chain(ChatOpenAI(), chain_type="stuff")

query = "what is the website of person mentioned?"
docs = docsearch.similarity_search(query)
print(chain.run({"input_documents": docs, "question": query}))
