import sqlite3
from geopy.geocoders import Nominatim
from math import radians, sin, cos, sqrt, atan2



DB_NAME = 'psychotherapists.db'
geolocator = Nominatim(user_agent='psychotherapists')


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

def get_psychotherapists_by_specialty(keypoints, user_address):
    all_psychotherapists = get_all_psychotherapists()

    user_lat, user_lon = geocode_address(user_address)
    if not user_lat or not user_lon:
        return []

    # Filter psychotherapists by matching keypoints in their specialties
    matching_psychotherapists = [
        p for p in all_psychotherapists
        if any(keypoint.lower() in p[5].lower() for keypoint in keypoints)
    ]

    # Calculate distances to the user and sort by the number of matching keypoints and distance
    for p in matching_psychotherapists:
        p_lat, p_lon = geocode_address(p[3])
        if not p_lat or not p_lon:
            continue

        p.append(haversine_distance(user_lat, user_lon, p_lat, p_lon))

    matching_psychotherapists.sort(key=lambda x: (len(keypoints) - sum(kp.lower() in x[5].lower() for kp in keypoints), x[-1]))

    # Return the top 5 ranked therapists
    return matching_psychotherapists[:5]



## ------------------------------HELPER FUNCTIONS---------------------------------##
def geocode_address(address):
    location = geolocator.geocode(address)
    if location:
        return location.latitude, location.longitude
    else:
        return None

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth's radius in kilometers

    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))

    return R * c