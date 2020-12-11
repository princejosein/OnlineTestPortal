import axios from 'axios'

const axioshelper = axios;

const token = localStorage.getItem('token')
if (token) {
    axioshelper.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

export default axioshelper;
