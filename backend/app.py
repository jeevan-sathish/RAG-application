from flask import Flask,request,jsonify
from flask_cors import CORS
from db import get_connection
import fitz
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
import os
import ollama
import shutil

app=Flask(__name__)
CORS(app)

conn =get_connection()


if conn.is_connected():
    print("connected")



@app.route('/signin', methods=["POST"])
def signin_auth():
    cursor =conn.cursor()
    user_data =request.get_json()
    email=user_data.get("email")
    password =user_data.get("password")
    
    if not email or not password:
        return jsonify({
            "message":"missing email or password"
        }), 404
    else:
        try:
            query ="select email ,password from users where email=%s and password=%s"
            values=(email,password)
            cursor.execute(query,values)
            rows =cursor.fetchone()
            if rows:
                return jsonify({
                    "message":"login succesfull"
                })
            else:
                return jsonify(
                    {
                        "message":"login failed"
                    }
                )
        except Exception as e:
            print("error",e)
        
@app.route('/signup',methods=["POST"])    
def get_signUP():
    cursor =conn.cursor()
    user_data =request.get_json()
    name=user_data.get("name")
    gender =user_data.get("gender")
    status =user_data.get("status")
    email=user_data.get("email")
    password =user_data.get("password")
    
    if not all([name, gender, status, email, password]):
        return jsonify({"message": "Field error"}), 400
    else:
        try:
            query ="select name, email from users where email=%s"
            val=(email,)
            cursor.execute(query,val)
            rows =cursor.fetchone()
            if rows:
                return jsonify({
                    "message":"user exist"
                })
            else:
                query="INSERT INTO users(name,gender,status,email,password) VALUES(%s,%s,%s,%s,%s)"
                value =(name,gender,status,email,password)
                cursor.execute(query,value)
                conn.commit()
                cursor.close()
                return jsonify({
                    "message":"signup success"
                })
                
            
        except Exception as e:
            print("error:", e)

@app.route('/result', methods=["POST"])
def fetch_result():
    response = request.get_json()
    prompt = response.get("prompt")

    
    if not prompt:
        return jsonify({"message": "Prompt is required"}), 400

    file_path = 'ragInfo.pdf'
    text = ""

    doc = fitz.open(file_path)
    for page in doc:
        text += page.get_text()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=50
    )

    chunks = splitter.split_text(text)
    chunk_size = len(chunks)

    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectors = embeddings.embed_documents(chunks)
    vector_length =len(vectors)
    each_vector_length=len(vectors[0])

    
    db = Chroma.from_texts(
        texts=chunks,  
        embedding=embeddings,
        persist_directory="./db"
    )

    db.persist()

   
    results = db.similarity_search(prompt, k=3)

    output = [r.page_content for r in results]

    return jsonify({
        "result": output,
        "chunkSize":chunk_size,
        "vecLen":vector_length,
        "eachVecLen":each_vector_length
    })



@app.route("/files", methods=["POST"])
def file_handle():
    file = request.files.get("file")
    data = request.get_json(silent=True)
    prompt = None

    if data:
        prompt = data.get("prompt")

    text = ""

    try:
        print("file:", file)
        print("prompt:", prompt)

        chunk_size = 400
        chunk_overlap = 50

        embeddings = OllamaEmbeddings(model="nomic-embed-text")

        if file:
            docs = fitz.open(stream=file.read(), filetype="pdf")

            for page in docs:
                text += page.get_text()

            splitter = RecursiveCharacterTextSplitter(
                chunk_size=chunk_size,
                chunk_overlap=chunk_overlap
            )

            chunks = splitter.split_text(text)

            text_chunk = []
            chunk_lengths = []

            for i, chunk in enumerate(chunks, start=1):
                chunk_len = len(chunk)
                chunk_lengths.append(chunk_len)

                text_chunk.append({
                    "chunk_no": i,
                    "chunk_text": chunk,
                    "chunk_length": chunk_len
                })

            db = Chroma.from_texts(
                texts=chunks,
                embedding=embeddings,
                persist_directory="./db"
            )

            sample_vector_dimension = 0
            if chunks:
                sample_embedding = embeddings.embed_query(chunks[0])
                sample_vector_dimension = len(sample_embedding)

            return jsonify({
                "message": "File processed successfully",
                "text": text,
                "chunks": text_chunk,

                "total_text_length": len(text),
                "total_chunks": len(chunks),
                "chunk_size": chunk_size,
                "chunk_overlap": chunk_overlap,
                "chunk_lengths": chunk_lengths,

                "vector_count": len(chunks),
                "vector_dimension": sample_vector_dimension
            }), 200

        elif prompt and prompt.strip():
            if not os.path.exists("./db"):
                return jsonify({
                    "message": "No database found. Please upload a file first."
                }), 400

            db = Chroma(
                persist_directory="./db",
                embedding_function=embeddings
            )

            results = db.similarity_search(prompt, k=3)
            matched_texts = [doc.page_content for doc in results]

            return jsonify({
                "message": "Answer generated successfully",
                "answer": matched_texts
            }), 200

        else:
            return jsonify({
                "message": "No file or prompt provided"
            }), 400

    except Exception as e:
        print("BACKEND ERROR:", str(e))
        return jsonify({
            "message": "Error processing request",
            "error": str(e)
        }), 500
            

if __name__ == "__main__":
    app.run(debug=True)