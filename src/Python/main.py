from fastapi import FastAPI
from langchain_community.llms import HuggingFaceEndpoint
from langchain.chains import LLMChain, SimpleSequentialChain, SequentialChain
from langchain.prompts import PromptTemplate
from fastapi.middleware.cors import CORSMiddleware
#from dotenv import load_dotenv
from key import huggingface_access_key
import os
os.environ["HUGGINGFACEHUB_API_TOKEN"] = huggingface_access_key



# load_dotenv()
# huggingface_access_key = os.getenv("HUGGINGFACE_ACCESS_KEY")

repo_id = "mistralai/Mistral-7B-Instruct-v0.3"


llm = HuggingFaceEndpoint(
    repo_id=repo_id, temperature=0.2, token= huggingface_access_key
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# @app.get("/{genre}/{language}")
@app.get("/{query}")
# def read_root(genre, language):
#     prompt_template_name = PromptTemplate(
#     input_variables=['Genre', 'Language'],
#     template="Suggest 10 movies that blend elements of {Genre} in the {Language} language. Only provide the movie names."
#     )
#     chain1 = LLMChain(llm=llm, prompt=prompt_template_name)

#     result1 = chain1.run(Genre=genre, Language=language)
#     print(result1)

#     prompt_template_name = PromptTemplate(
#         input_variables=['previous_list'],
#         template="Suggest 10 different movies than those in {'previous_list'}, with the same Genre and Language. Only provide the movie names."
#     )
#     chain2 = LLMChain(llm=llm, prompt=prompt_template_name)

#     result2 = chain2.run(result1)
#     print(result2)

#     return result1, result2

def read_root(query):
    prompt_template_name = PromptTemplate(
    input_variables=['query'],
    template= f"""
    Genre Table - 
    "id": 28, "name": "Action" ,
    "id": 12, "name": "Adventure" ,
    "id": 16, "name": "Animation" ,
    "id": 35, "name": "Comedy" ,
    "id": 80, "name": "Crime" ,
    "id": 99, "name": "Documentary" ,
    "id": 18, "name": "Drama" ,
    "id": 10751, "name": "Family" ,
    "id": 14, "name": "Fantasy" ,
    "id": 36, "name": "History" ,
    "id": 27, "name": "Horror" ,
    "id": 10402, "name": "Music" ,
    "id": 9648, "name": "Mystery" ,
    "id": 10749, "name": "Romance" ,
    "id": 878, "name": "Science Fiction" ,
    "id": 10770, "name": "TV Movie" ,
    "id": 53, "name": "Thriller" ,
    "id": 10752, "name": "War" ,
    "id": 37, "name": "Western"
    
    some attribute examples-
    region: Example: 'US', 'IN'
    year: Example: 2023, 2024
    release_date.gte: Example: 2015-01-01
    release_date.lte: Example: 2015-01-01
    with_genres: Example: 23, 28 
    with_origin_country: Example: 'US', 'IN'
    without_genres: Example: 18, 99 
    with_original_language: Example: 'hi', 'en'

Result format -
  "year": ,
  "region": "",
  "release_date.gte": "",
  "release_date.lte": "",
  "vote_average.gte": ,
  "vote_average.lte": ,
  "with_genres": "", (look at the genre table a fill the values)
  "with_origin_country": "",
  "without_genres": "", (look at the genre table a fill the values)
  "with_original_language": ""
  This is required fields in the object.
From this query: {query}
Extract all the details and fill in the JSON object accordingly. no white spaces
"""

    )
    chain1 = LLMChain(llm=llm, prompt=prompt_template_name)

    result1 = chain1.run(query=query)
    
    return result1

print(read_root("horror comedy bollywood movies"))