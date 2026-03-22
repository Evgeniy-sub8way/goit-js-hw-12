import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '55036572-7370ebd0316836cff88f01645';

export async function getImagesByQuery(query, page) {
  const response = await axios.get('/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page, // 🔹 номер сторінки
      per_page: 15, // 🔹 кількість результатів
    },
  });
  return response.data;
}
