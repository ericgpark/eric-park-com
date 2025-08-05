export interface Photo {
  id: string
  title: string
  url: string
}

export interface PhotoSet {
  id: string;
  title: string;
  description: string;
}

export type ToastType = 'success' | 'alert' | 'warning' | 'error';

export interface Toast {
  message: string,
  type: ToastType,
  isVisible?: boolean,
};
