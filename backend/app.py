from flask import Flask, request
from dotenv import load_dotenv
load_dotenv()
import os
import openai


app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")


def generateChatResponse(prompt):
    messages = []
    messages.append({"role": "system", "content": "Your name is Karabo. You are a helpful assistant."})
    prompt += "\nGiven the above diagnosis, create a summary and the most likely diagnosis result.\
        Diagnosis can only be from this list: [ADHD, Bipolar Disorder, Depression Attachment Issues, \
            OCD, Personality Disorder, Schizofrenia].\n\n Format it as 1 to 3 key terms specifically \
                taken from the list."
    print(prompt)

    question = {}
    question['role'] = 'user'
    question['content'] = prompt
    messages.append(question)

    response = openai.ChatCompletion.create(model="gpt-3.5-turbo",messages=messages)

    try:
        answer = response['choices'][0]['message']['content'].replace('\n', '<br>')
    except:
        answer = 'Interesting'

    print(answer)
    return answer

@app.route('/health', methods = ['GET'])
def health():
    return 'OK'

@app.route('/submit', methods = ['POST'])
def submit():
   prompt = request.form['prompt']
   res = {}
   res['answer'] = generateChatResponse(prompt)
   return 'OK'

if __name__ == "__main__":
    app.run()
