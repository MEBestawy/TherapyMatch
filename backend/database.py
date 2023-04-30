import sqlite3

DB_NAME = 'psychotherapists.db'

def execute_query(query, params=()):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    cur.execute(query, params)
    conn.commit()
    conn.close()

def fetch_query(query, params=()):
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    cur.execute(query, params)
    result = cur.fetchall()
    conn.close()
    return result

def get_all_psychotherapists():
    query = 'SELECT * FROM psychotherapists'
    return fetch_query(query)

def get_psychotherapist_by_id(id):
    query = 'SELECT * FROM psychotherapists WHERE id=?'
    return fetch_query(query, (id,))

def get_psychotherapists_with_specific_topspecialty(top_specialty):
    query = 'SELECT * FROM psychotherapists WHERE topspecialty=?'
    return fetch_query(query, (top_specialty,))
