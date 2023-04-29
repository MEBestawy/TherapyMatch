from flask import Flask

app = Flask(__name__)

@app.route('/health', methods = ['GET'])
def health():
    return 'OK'

@app.route('/submit', methods = ['POST'])
def submit():
    pass

if __name__ == "__main__":
    app.run()
