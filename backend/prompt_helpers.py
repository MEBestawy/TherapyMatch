
PROMPT = """I will give you a statement, based on the statement highlight relevant mental illnesses from this selection [anxiety, ptsd, depression, intimacy issues] only list the relevant issues and no extra text. 

Statement: {}

Issues: """


def generate_prompt(notes=""):
    return f"{PROMPT.format(notes)}"

def parse_diagnosis(raw_diagnosis):
    return raw_diagnosis.strip().split("\n")