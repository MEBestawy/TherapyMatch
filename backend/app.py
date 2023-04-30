import os
import openai
from dotenv import load_dotenv
from database import get_psychotherapists_by_specialty
from prompt_helpers import generate_prompt 
from flask_cors import CORS, cross_origin
from flask import Flask, request

load_dotenv()
app = Flask(__name__)
CORS(app)

@app.route('/health', methods = ['GET'])
def health():
    return 'OK'

@app.route('/submit', methods = ['POST'])
def submit():
    notes = request.args.get('notes')
    user_address = request.args.get('address', '')

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(notes),
        temperature=0,
        max_tokens=120,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    diagnosis = response.choices[0].text
    diagnosis_lst = [diag.strip() for diag in diagnosis.split(",")]

    therapists = get_psychotherapists_by_specialty(diagnosis_lst, user_address)
    return { "therapists": therapists }


if __name__ == "__main__":
    

    openai.api_key = os.getenv("OPENAI_API_KEY")
    app.run()