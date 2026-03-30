# # import fitz
# # from langchain_text_splitters import RecursiveCharacterTextSplitter
# # from langchain_ollama import OllamaEmbeddings
# # from langchain_community.vectorstores import Chroma

# # # Step 1: Load PDF
# # file_path = 'resume.pdf'
# # text = ""

# # doc = fitz.open(file_path)
# # for page in doc:
# #     text += page.get_text()

# # # Step 2: Split text
# # splitter = RecursiveCharacterTextSplitter(
# #     chunk_size=300,
# #     chunk_overlap=20
# # )

# # chunks = splitter.split_text(text)

# # print("Total chunks:", len(chunks))

# # # Optional: print chunks
# # for i, chunk in enumerate(chunks[:3]):  # print only first 3
# #     print(f"\nChunk {i+1}:\n{chunk}")

# # # Step 3: Create embeddings
# # embeddings = OllamaEmbeddings(model='nomic-embed-text')

# # vectors = embeddings.embed_documents(chunks)

# # print("Total vectors:", len(vectors))
# # print("Vector dimension:", len(vectors[0]))

# # # Step 4: Store in Chroma DB
# # db = Chroma.from_texts(
# #     texts=chunks,
# #     embedding=embeddings,
# #     persist_directory="./db"
# # )

# # db.persist()

# # # Step 5: Query
# # query = "give skill sets from resume"

# # results = db.similarity_search(query, k=3)

# # print("\n--- Top Results ---\n")
# # for r in results:
# #     print(r.page_content)
# #     print("------")

# # import ollama

# # prompt = input("Enter your prompt: ")

# # response = ollama.chat(
# #     model="llama3",
# #     messages=[
# #         {"role": "user", "content": prompt}
# #     ]
# # )

# # print(response["message"]["content"])


# from dotenv import load_dotenv
# import os
# from groq import Groq

# load_dotenv()
# api_key =os.getenv("GROQ_API")

# client =Groq(api_key=api_key)
# chat_completeion =client.chat.completions.create(
#     messages=[
#         {
#             "role":"user",
#             "content":"say hellow in one line with small thought"
#         }
#     ],
#     model ="llama-3.3-70b-versatile",
# )
# print(chat_completeion.choices[0].message.content)



import fitz