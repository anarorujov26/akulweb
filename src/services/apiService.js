import axios from "axios";

const API_BASE_URL = "https://api.akul.az/2.1/dev";

const apiService = {
  request: async (method, url, data = null) => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Token: token }),
    };

    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers,
      ...(data && { data }),
    };

    const response = await axios(config);
    if (response.data.status !== "success") {
      throw new Error(response.data.message);
    }
    return response.data;
  },
  
  get: (url) => apiService.request("GET", url),
  post: (url, data) => apiService.request("POST", url, data),
  put: (url, data) => apiService.request("PUT", url, data),
  delete: (url) => apiService.request("DELETE", url),
};

export default apiService;