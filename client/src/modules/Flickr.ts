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
    fetchRecents: async ({ commit }: { commit: (mutation: string, payload: Photo[]) => void }) => {
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
