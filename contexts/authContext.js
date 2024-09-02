import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signIn,
  signUp,
  fetchUserData,
  fetchUserMovieList,
  fetchUserComments,
  addMovie,
  removeMovie,
  updateMovieStatus,
  addComment,
  removeComment,
  updateComment,
} from '../services/api';
import InitialLoadingScreen from '../components/InitialLoading';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (storedToken && !user) {
        try {
          const userData = await fetchUserData();
          if(userData){
            const userComments = await fetchUserComments();
            const userMovieList = await fetchUserMovieList();
            setUser(userData);
            setComments(userComments);
            setMovieList(userMovieList);
            setToken(storedToken);
          }
        } catch(error) {
          if (error.response && error.response.status === 401){
            await AsyncStorage.removeItem("access_token");
          } 
        }
      }
      setIsLoading(false);
    };
    loadUserData();
  }, []);

  const signInUser = async (email, password) => {
    try {
      const { userData, accessToken } = await signIn(email, password);
      setToken(accessToken);
      await AsyncStorage.setItem('access_token', accessToken);
      const userComments = await fetchUserComments();
      const userMovieList = await fetchUserMovieList();
      setUser(userData);
      setComments(userComments);
      setMovieList(userMovieList);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOutUser = async () => {
    setUser(null);
    setComments([]);
    setMovieList([]);
    setToken(null);
    await AsyncStorage.removeItem('access_token');
  };

  const signUpUser = async (email, name, username, password, confirmPassword) => {
    try {
      const { userData, accessToken } = await signUp(email, name, username, password, confirmPassword);
      setToken(accessToken)
      await AsyncStorage.setItem('access_token', accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to sign up', error);
      throw error;
    }
  };

  const addMovieToList = async (movie_id) => {
    try {
      const data = await addMovie(movie_id);
      let newItem = data.item;
      newItem.movie = data.item_movie;
      setMovieList((prevMovieList) => [...prevMovieList, newItem]);
    } catch (error) {
      console.error('Failed to add movie', error);
    }
  };

  const removeMovieFromList = async (id) => {
    try {
      await removeMovie(id);
      setMovieList((prevMovieList) =>
        prevMovieList.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error('Failed to remove movie', error);
    }
  };

  const toggleMovie = async (id) => {
    try {
      const newStatus = await updateMovieStatus(id);
      const newMovieList = movieList.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, status: newStatus } : prevItem
      );
      setMovieList(newMovieList);
    } catch (error) {
      console.error('Failed to update movie status', error);
    }
  };

  const addUserComment = async (content, movie_id) => {
    try {
      const data = await addComment(content, movie_id);
      let newComment = data.comment;
      newComment.movie = data.movie;
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error('Failed to add comment', error);
      throw error;
    }
  };

  const removeUserComment = async (id) => {
    try {
      await removeComment(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error('Failed to remove comment', error);
      throw error;
    }
  };

  const updateUserComment = async (id, content) => {
    try {
      await updateComment(id, content);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, content: content } : comment
        )
      );
    } catch (error) {
      console.error('Failed to update comment', error);
    }
  };
  
  if (isLoading) {
    return <InitialLoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        comments,
        movieList,
        token,
        signInUser,
        signOutUser,
        signUpUser,
        addMovieToList,
        removeMovieFromList,
        toggleMovie,
        addUserComment,
        removeUserComment,
        updateUserComment,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
