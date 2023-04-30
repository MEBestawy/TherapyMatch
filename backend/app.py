import os
import openai
from dotenv import load_dotenv
from database import get_psychotherapists_by_specialty
from prompt_helpers import generate_prompt 
from flask_cors import CORS
from flask import Flask, request

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return 'OK'

@app.route('/submit', methods=['POST', 'OPTIONS'])
def submit():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    notes = request.json.get('notes')
    user_address = request.json.get('address', '')

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

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    response.status_code = 204
    return response

if __name__ == "__main__":
    load_dotenv()

    openai.api_key = os.getenv("OPENAI_API_KEY")
    app.run()
