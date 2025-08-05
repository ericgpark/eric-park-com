import axios from 'axios';
import type { Photo, PhotoSet } from '@/types/index';

export default {
  async getPhotos(setId?: string): Promise<Photo[]> {
    const endpoint = `/photos${setId ? `?setId=${setId}` : ''}`;

    const response = await axios.get(endpoint);

    return response.data as Photo[];
  },
  async getSetList(): Promise<PhotoSet[]> {
    const response = await axios.get(`/sets`);

    return response.data as PhotoSet[];
  },
};
