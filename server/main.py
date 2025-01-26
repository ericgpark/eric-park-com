from flask import Flask, request, jsonify
from Controllers.flickrController import get_photos
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:51732"}})

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hello World!'})

@app.route('/photos', methods=['GET'])
def photos():
    response = jsonify(get_photos())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)
