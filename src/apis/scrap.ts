import axios from 'axios';

const apiName = {
  Scrap: '/api/crawler'
};

export const apiScrapByUrl = async (url: string) => {
  if (!url || url.length <= 0) return [];
  const res = await axios.get<string[]>(`${apiName.Scrap}`, { params: { url } });
  if (res.data) return res?.data ?? [];
};
