import axios from 'axios';

export const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/jobs`
export const createJob = async (title: string, description: string) => {
  const response = await axios.post(API_URL, { title, description });
  return response.data;
};

export const fetchJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchJobById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateJob = async (id: string, title: string, description: string) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, description });
  return response.data;
};
