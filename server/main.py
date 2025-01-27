import os
from flask import Flask, request, jsonify
from Controllers.flickrController import get_photos
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
cors = CORS(app, origins=[os.getenv('LOCAL_ORIGIN')])

@app.route('/photos', methods=['GET'])
def photos():
    return jsonify(get_photos())

if __name__ == '__main__':
    app.run(debug=True)
