import axios from 'axios';
import type { Photo, PhotoSet } from '@/types/index';

export default {
  async getPhotos(setId?: string): Promise<Photo[]> {
    const endpoint = `/photos${setId ? `?setId=${setId}` : ''}`;

    let response;
    try {
      response = await axios.get(endpoint);
    } catch (error) {
      console.error('flickr#getPhotos - Failed to fetch photos from Flickr:', error);
      throw new Error('Failed to fetch photos');
    }

    return response.data as Photo[];
  },
  async getSetList(): Promise<PhotoSet[]> {
    let response;
    try {
      response = await axios.get(`/sets`);
    } catch (error) {
      console.error('flickr#getSetList - Failed to fetch photo sets from Flickr:', error);
      throw new Error('Failed to fetch photo sets');
    }

    return response.data as PhotoSet[];
  },
};
