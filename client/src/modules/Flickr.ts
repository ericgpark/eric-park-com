import type { Photo, PhotoSet, Toast } from '@/types/index';
import Flickr from '@/util/api/flickr';

const flickr = {
  namespaced: true,
  state: {
    currentSet: [] as Photo[],
    setList: [] as PhotoSet[],
  },
  getters: {
    currentSet: (state: { currentSet: Photo[] }) => {
      return state.currentSet;
    },
    setList: (state: { setList: PhotoSet[] }) => {
      return state.setList;
    },
  },
  mutations: {
    setCurrentSet: (state: { currentSet: Photo[] }, photos: Photo[]) => {
      state.currentSet = photos;
    },
    setSetList: (state: { setList: PhotoSet[] }, sets: PhotoSet[]) => {
      state.setList = sets;
    },
  },
  actions: {
    getPhotos: async ({ state, commit }: { state: { currentSet: Photo[] }, commit: (mutation: string, payload: Photo[] | Toast) => void }, setId?: string) => {
      if (!setId && state.currentSet.length > 0) {
        return state.currentSet;
      }
      // Fetch photos from Flickr API
      const photos: Photo[] = await Flickr.getPhotos(setId);
      commit('setCurrentSet', photos);
    },
    getSetList: async ({ state, commit }: { state: { setList: PhotoSet[] }, commit: (mutation: string, payload: PhotoSet[]) => void }) => {
      if (state.setList.length > 0) {
        return state.setList;
      }
      // Fetch photo sets from Flickr API
      const sets: PhotoSet[] = await Flickr.getSetList();
      commit('setSetList', sets);
    }
  },
};

export default flickr;
