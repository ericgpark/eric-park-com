import os
import requests

host = os.getenv('FLICKR_HOST')
apiKey = os.getenv('FLICKR_API_KEY')
apiSecret = os.getenv('FLICKR_API_SECRET')
userId = os.getenv('FLICKR_USER_ID')

def get_photos():
    getPhotosUrl = f'{host}/?method=flickr.people.getPublicPhotos&api_key={apiKey}&user_id={userId}&format=json&nojsoncallback=1'

    response = requests.get(getPhotosUrl).json()
    flickrPhotos = response['photos']['photo']

    photos = []

    for photo in flickrPhotos:
        photos.append({
            'id': photo['id'],
            'title': photo['title'],
            'url': get_photo_sizes(photo['id'])
        })

    return photos

def get_photo_sizes(photoId):
    getPhotoSizesUrl = f'{host}/?method=flickr.photos.getSizes&api_key={apiKey}&photo_id={photoId}&format=json&nojsoncallback=1'
    sizes = requests.get(getPhotoSizesUrl).json()
    return sizes['sizes']['size'][-1]['source']
