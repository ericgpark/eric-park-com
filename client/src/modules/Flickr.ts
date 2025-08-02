import type { Photo, PhotoSet } from '@/types/index';
import Flickr from '@/util/api/flickr';

const flickr = {
  namespaced: true,
  state: {
    recents: [] as Photo[],
    setList: [] as PhotoSet[],
  },
  getters: {
    recents: (state: { recents: Photo[] }) => {
      return state.recents;
    },
    setList: (state: { setList: PhotoSet[] }) => {
      return state.setList;
    },
  },
  mutations: {
    setRecents: (state: { recents: Photo[] }, photos: Photo[]) => {
      state.recents = photos;
    },
    setSetList: (state: { setList: PhotoSet[] }, sets: PhotoSet[]) => {
      state.setList = sets;
    },
  },
  actions: {
    getPhotos: async ({ state, commit }: { state: { recents: Photo[] }, commit: (mutation: string, payload: Photo[]) => void }, setId: string) => {
      if (state.recents.length > 0) {
        return state.recents;
      }
      // Fetch recent photos from Flickr API
      try {
        const photos: Photo[] = await Flickr.getPhotos(setId);
        commit('setRecents', photos);
      } catch (error) {
        console.error('Failed to fetch recent photos:', error);
      }
    },
    getSetList: async ({ state, commit }: { state: { setList: PhotoSet[] }, commit: (mutation: string, payload: PhotoSet[]) => void }) => {
      if (state.setList.length > 0) {
        return state.setList;
      }
      // Fetch photo sets from Flickr API
      try {
        const sets: PhotoSet[] = await Flickr.getSetList();
        commit('setSetList', sets);
      } catch (error) {
        console.error('Failed to fetch photo sets:', error);
      }
    }
  },
};

export default flickr;
