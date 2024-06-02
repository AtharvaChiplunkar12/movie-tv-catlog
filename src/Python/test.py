from langchain_community.llms import HuggingFaceEndpoint
from langchain.chains import LLMChain, SimpleSequentialChain, SequentialChain
from langchain.prompts import PromptTemplate
#from dotenv import load_dotenv
from key import huggingface_access_key
import os
os.environ["HUGGINGFACEHUB_API_TOKEN"] = huggingface_access_key

#load_dotenv()
#huggingface_access_key = os.getenv("HUGGINGFACE_ACCESS_KEY")

repo_id = "mistralai/Mistral-7B-Instruct-v0.3"


llm = HuggingFaceEndpoint(
    repo_id=repo_id, temperature=0.6, token= huggingface_access_key
)

prompt_template_name = PromptTemplate(
    input_variables=['Genre', 'Language'],
    template="Suggest 10 movies that blend elements of {Genre} in the {Language} language. Only provide the movie names."
)
chain1 = LLMChain(llm=llm, prompt=prompt_template_name)

result1 = chain1.run(Genre="horror", Language="Hindi")
print(result1)

prompt_template_name = PromptTemplate(
    input_variables=['previous_list'],
    template="Suggest 10 different movies than those in {'previous_list'}, with the same Genre and Language. Only provide the movie names."
)
chain2 = LLMChain(llm=llm, prompt=prompt_template_name)

result2 = chain2.run(result1)
print(result2)
