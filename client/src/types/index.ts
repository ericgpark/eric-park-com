export interface Photo {
  id: string
  src: string
  categories: Category['id'][]
}

export interface Category {
  id: string;
  name: string;
}

export type ToastType = 'success' | 'alert' | 'warning' | 'error';

export interface Toast {
  message: string,
  type: ToastType,
  isVisible?: boolean,
};
