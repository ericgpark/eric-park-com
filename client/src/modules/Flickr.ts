import type { Photo } from '@/types/index';
import Flickr from '@/util/api/flickr';

const flickr = {
  namespaced: true,
  state: {
    recents: [] as Photo[],
  },
  getters: {
    recents: (state: { recents: Photo[] }) => {
      return state.recents;
    },
  },
  mutations: {
    setRecents: (state: { recents: Photo[] }, photos: Photo[]) => {
      state.recents = photos;
    },
  },
  actions: {
    fetchRecents: async ({ state, commit }: { state: { recents: Photo[] }, commit: (mutation: string, payload: Photo[]) => void }) => {
      if (state.recents.length > 0) {
        return state.recents;
      }
      // Fetch recent photos from Flickr API
      try {
        const photos: Photo[] = await Flickr.getPhotos();
        commit('setRecents', photos);
      } catch (error) {
        console.error('Failed to fetch recent photos:', error);
      }
    },
  },
};

export default flickr;
