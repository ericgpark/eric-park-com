export interface Photo {
  id: string
  title: string
  url: string
}

export interface PhotoSet {
  id: string;
  title: {
    _content: string;
  };
  description: {
    _content: string;
  };
}
