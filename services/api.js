import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API = 'http://192.168.1.178:8000/api';
const NB_PER_PAGE = 20;

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email: email,
      password: password,
    });
    return {
      userData: response.data.user,
      accessToken: response.data.access_token,
    };
  } catch (error) {
    handleApiError(error)
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`/checkEmail`, {
      params: { email },
    });
    return response.data.exists;
  } catch (error) {
    handleApiError(error);
  }
};

export const signUp = async (email, name, username, password, confirmPassword) => {
  try {
    const response = await api.post('/register', {
      email: email,
      name: name,
      username: username,
      password: password,
      password_confirmation: confirmPassword
    });
    return {
      userData: response.data.user,
      accessToken: response.data.access_token,
    };
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUserData = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Token invalide ou session expirée');
    } else {
      handleApiError(error);
    }
  }
};

export const fetchMovies = async (
  searchString,
  sortOrder,
  sortBy,
  page = 1
) => {
  try {
    let params = {
      page: page,
      perPage: NB_PER_PAGE,
    };
    if (searchString) {
      params.title = searchString;
    }
    if (sortOrder && sortBy) {
      params.sortOrder = sortOrder;
      params.sortBy = sortBy;
    }
    const response = await api.get('/movies/search', {
      params: params,
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await api.get('/movies/nowPlaying');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await api.get('/movies/upcoming');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await api.get('/movies/topPopular');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchUserMovieList = async () => {
  try {
    const response = await api.get(`/user/movielist`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchMovieComments = async (movie_id) => {
  try {
    const response = await api.get(`/movie/${movie_id}/comments`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    } else {
      handleApiError(error);
    }
  }
};

export const fetchUserComments = async () => {
  try {
    const response = await api.get(`/user/comments`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    } else {
      handleApiError(error);
    }
  }
};

export const addMovie = async (movie_id) => {
  try {
    const response = await api.post('/list', {
      movie_id: movie_id,
      status: 'À voir',
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeMovie = async (movie_id) => {
  try {
    const response = await api.delete(`/lists/${movie_id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateMovieStatus = async (id) => {
  try {
    const response = await api.put(`/lists/${id}`);
    if (response && response.data && response.data.item_status) {
      return response.data.item_status;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const addComment = async (content, movie_id) => {
  try {
    const response = await api.post('/comment', {
      content: content,
      movie_id: movie_id,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeComment = async (id) => {
  try {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateComment = async (id, content) => {
  try {
    const response = await api.put(`/comments/${id}`, {
      content: content,
    });
    return response.data.comment;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.message || 'API Error');
  } else if (error.request) {
    console.error('API Error: No response received', error.request);
    throw new Error('No response received from the server');
  } else {
    console.error('API Error:', error.message);
    throw new Error(error.message);
  }
};
