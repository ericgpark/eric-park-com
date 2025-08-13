import axios from 'axios';
import type { Photo, PhotoSet } from '@/types/index';

export default {
  async getPhotos(setId?: string): Promise<Photo[]> {
    const endpoint = `/photos${setId ? `?setId=${setId}` : ''}`;

    let response;
    try {
      response = await axios.get(endpoint);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error ?? 'Unknown error');
      } else {
        throw error;
      }
    }

    return response.data as Photo[];
  },
  async getSetList(): Promise<PhotoSet[]> {
    let response;
    try {
      response = await axios.get(`/sets`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error ?? 'Unknown error');
      } else {
        throw error;
      }
    }

    return response.data as PhotoSet[];
  },
};
