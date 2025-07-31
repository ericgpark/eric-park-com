import dotenv from 'dotenv';
dotenv.config();

const host = process.env.FLICKR_HOST;
const apiKey = process.env.FLICKR_API_KEY;
const apiSecret = process.env.FLICKR_API_SECRET;
const userId = process.env.FLICKR_USER_ID;

import { Request, Response } from 'express';

export const getPhotos = async (req: Request, res: Response) => {
  const url = `${host}/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  const response = await fetch(url);

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch photos' });
  }

  const data = await response.json();

  const photos = await Promise.all(
    data.photos.photo.map(async (photo: any) => ({
      id: photo.id,
      title: photo.title,
      url: await getPhotoSizes(photo.id),
    }))
  );

  return res.json(photos);
};

const getPhotoSizes = async (photoId: string) => {
  const url = `${host}/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch photo sizes');
  }

  const data = await response.json();

  return data.sizes.size[data.sizes.size.length - 1].source; // Return the largest size
};
