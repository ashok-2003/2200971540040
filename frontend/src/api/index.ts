import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const createShortUrl = async (payload: {
  url: string;
  validity?: number;
  shortcode?: string;
}) => {
  const res = await axios.post(`${BASE_URL}/shorturls`, payload);
  return res.data;
};

export const getShortUrlStats = async (code: string) => {
  const res = await axios.get(`${BASE_URL}/shorturls/${code}`);
  return res.data;
};
