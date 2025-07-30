import axios from 'axios';
import type { Photo } from '@/types/index';

export default {
  async getPhotos(): Promise<Photo[]> {
    const response = await axios.get(`/photos`);
    return response.data;
  },
}
