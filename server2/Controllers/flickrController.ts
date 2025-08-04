import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import type { Photo, PhotoSet } from '../Types/index';

dotenv.config();

const host = process.env.FLICKR_HOST;
const apiKey = process.env.FLICKR_API_KEY;
const apiSecret = process.env.FLICKR_API_SECRET;
const userId = process.env.FLICKR_USER_ID;

export const getPhotos = async (req: Request, res: Response) => {
  const url = `${host}/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error('flickrController#getPhotos - Failed to fetch photos from Flickr: ', error);
    return res.status(error?.response?.status ?? 500).json({ error: `Failed to fetch photos: ${error?.response?.statusText ?? 'unknown error'}` });
  }

  const data = response.data;

  const photos = await Promise.all(
    data.photos.photo.map(async (photo: any) => ({
      id: photo.id,
      title: photo.title,
      url: await getPhotoSizes(photo.id),
    }))
  );

  return res.json(photos) as Photo[];
};

export const getPhotosFromSet = async (req: Request, res: Response): Promise<Photo[]> => {
  const setId = req.query.setId as string;
  if (!setId) {
    console.error('flickrController#getPhotosFromSet - setId is required');
    return res.status(400).json({ error: 'setId is required' });
  }

  const url = `${host}/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

  let response: any;
  try {
    response = await axios.get(url);
  } catch (error: any) {
    console.error('flickrController#getPhotosFromSet - Failed to fetch photos from Flickr:', error);
    return res.status(error?.response?.status ?? 500).json({ error: `Failed to fetch photos from set: ${error?.response?.statusText ?? 'unknown error'}` });
  }

  const data = response.data;

  const photos = await Promise.all(
    data.photoset.photo.map(async (photo: any) => ({
      id: photo.id,
      title: photo.title,
      url: await getPhotoSizes(photo.id),
    }))
  );

  return res.json(photos) as Photo[];
};

export const getSetList = async (req: Request, res: Response): Promise<PhotoSet[]> => {
  let response: any;
  try {
    response = await axios.get(`${host}/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`);
  } catch (error: any) {
    console.error('flickrController#getSetList - Failed to fetch photo sets from Flickr:', error);
    return res.status(error?.response?.status ?? 500).json({ error: `Failed to fetch photo sets: ${error?.response?.statusText ?? 'unknown error'}` });
  }

  const data = response.data;
  const sets = data.photosets.photoset.map((set: any) => ({
    id: set.id,
    title: set.title._content,
    description: set.description._content,
  }));

  return res.json(sets) as PhotoSet[];
};

const getPhotoSizes = async (photoId: string): Promise<string> => {
  const url = `${host}/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error('flickrController#getPhotoSizes - Failed to fetch photo sizes from Flickr:', error);
    throw new Error('Failed to fetch photo sizes');
  }

  const data = response.data;

  return data.sizes.size[data.sizes.size.length - 1].source as string;
};
