import axios from 'axios';
import type { Photo, PhotoSet } from '@/types/index';

const host = import.meta.env.VITE_FLICKR_HOST;
const apiKey = import.meta.env.VITE_FLICKR_API_KEY;
const userId = import.meta.env.VITE_FLICKR_USER_ID;

export default {
  async getPhotos(setId?: string): Promise<Photo[]> {
    if (!host || !apiKey || !userId) {
      throw new Error('Flickr API configuration is missing');
    }

    let url;
    if (!setId) { // If setId is not provided, fetch the most recent public photos
      url = `${host}/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;
    } else { // If setId is provided, fetch photos from the specified set
      url = `${host}/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${setId}&user_id=${userId}&format=json&nojsoncallback=1`;
    }
    let response;

    try {
      response = await axios.get(url);
    } catch (error) {
      console.error('flickr#getPhotos - Failed to fetch photos from Flickr:', error);
      throw new Error('Failed to fetch photos');
    }
    
    let data;
    if (setId) {
      data = response.data.photoset;
    } else {
      data = response.data.photos;
    }

    const photos = await Promise.all(
      data.photo.map(async (photo: Photo) => ({
        id: photo.id,
        title: photo.title,
        url: await getPhotoSizes(photo.id),
      }))
    );

    return photos;
  },
  getSetList: async (): Promise<PhotoSet[]> => {
    if (!host || !apiKey || !userId) {
      throw new Error('Flickr API configuration is missing');
    }

    let response;
    const url = `${host}/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;
    try {
      response = await axios.get(url);
    } catch (error) {
      console.error('flickr#getSetList - Failed to fetch photo sets:', error);
      throw new Error('Failed to fetch photo sets');
    }

    const data = response.data;
    return data.photosets.photoset.map((set: { id: string, title: { _content: string }, description: { _content: string } }) => ({
      id: set.id,
      title: set.title._content,
      description: set.description._content,
    })) as PhotoSet[];
  },
};

const getPhotoSizes = async (photoId: string): Promise<string> => {
  const url = `${host}/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  let response;

  try {
    response = await axios.get(url);
  } catch (error) {
    console.error('flickr#getPhotoSizes - Failed to fetch photo sizes:', error);
    throw new Error('Failed to fetch photo sizes');
  }

  const data = await response.data;

  return data.sizes.size[data.sizes.size.length - 1].source; // Return the largest size
};
