import type { ToastType, Toast } from '@/types/index';

const toast = {
  namespaced: true,
  state: {
    message: '' as string,
    type: '' as ToastType,
    isVisible: false as boolean,
  },
  getters: {
    getToast: (state: Toast): Toast => {
      return state;
    },
  },
  mutations: {
    setToast: (state: Toast, newToast: { message: string, type: ToastType, duration?: number }) => {
      state.message = newToast.message;
      state.type = newToast.type;
      state.isVisible = true;

      // Display toast for 4 sec (default)
      setTimeout(() => {
        state.isVisible = false;
      }, newToast.duration ?? 4000);
    }
  },
};

export default toast;
