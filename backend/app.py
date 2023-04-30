import os
import openai
from dotenv import load_dotenv
from prompt_helpers import generate_prompt 
from flask import Flask, request

app = Flask(__name__)

@app.route('/health', methods = ['GET'])
def health():
    return 'OK'

@app.route('/submit', methods = ['POST'])
def submit():
    notes = request.args.get('notes')

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
    return { "diagnosis": diagnosis_lst }


if __name__ == "__main__":
    load_dotenv()

    openai.api_key = os.getenv("OPENAI_API_KEY")
    app.run()
