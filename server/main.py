import os
from flask import Flask, request, jsonify
from flask_caching import Cache
from flask_cors import CORS
from Controllers.flickrController import get_photos
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

cors = CORS(app, origins=[os.getenv('LOCAL_ORIGIN')])

# Set up server side cache to store photo urls
app.config["SECRET_KEY"] = "any random string"
app.config["CACHE_TYPE"] = "SimpleCache"
app.config["CACHE_DEFAULT_TIMEOUT"] = 300 # timeout in seconds  
cache = Cache(app)


@app.route('/photos', methods=['GET'])
def photos():
    # Check if photos are cached
    cached_photos = cache.get('photos')
    if cached_photos:
        return cached_photos

    # If not, fetch photos from the Flickr API
    photos = jsonify(get_photos())
    cache.set('photos', photos)
    return photos

if __name__ == '__main__':
    app.run(debug=True)
