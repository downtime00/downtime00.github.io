import axios from 'axios';

export class ApiService {
  token = '';
  csrf_toekn = '';
  constructor() {
    this.init();
  }

  static init() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL
    axios.defaults.withCredentials = true;
  };

  static setHeader(access_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer  ${access_token}`;
  };

  static setCRSFHeader(csrf_token) {
    axios.defaults.headers.common['x-csrf-token'] = `${csrf_token}`;
  }

  static async GET(url, params = {}) {
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async POST(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async DELETE(url, data) {
    try {
      const response = await axios.delete(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

