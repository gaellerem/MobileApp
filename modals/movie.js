import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyles from '../styles/MainStyle';
import modalStyles from '../styles/ModalStyle';
import CommentCard from '../components/CommentCard';
import { useAuth } from '../contexts/authContext';
import { fetchMovieComments } from '../services/api';

export default function ({ visible, onClose, movie }) {
  const {
    user,
    movieList,
    comments,
    addMovieToList,
    removeMovieFromList,
    addUserComment,
  } = useAuth();
  const [movieComments, setMovieComments] = useState([]);
  const [isInList, setIsInList] = useState(false);
  const [listItemID, setListItemID] = useState(null);
  const [comment, setComment] = useState('');
  const [visibleInput, setVisibleInput] = useState(false);

  useEffect(() => {
    setVisibleInput(false);
    setComment('');
    if (movie) {
      const loadComments = async () => {
        const newMovieComments = await fetchMovieComments(movie.id);
        setMovieComments(newMovieComments);
      };
      loadComments();
      const userMovie = movieList.find((item) => item.movie_id.toString() === movie.id.toString());
      setListItemID(userMovie ? userMovie.id : null);
      setIsInList(!!userMovie);
    }
  }, [movie, comments]);

  useEffect(() => {
    if (movie) {
      const userMovie = movieList.find((item) => item.movie_id.toString() === movie.id.toString());
      setListItemID(userMovie ? userMovie.id : null);
      setIsInList(!!userMovie);
    }
  }, [movieList]);

  const handleAddMovie = async () => {
    try {
      await addMovieToList(movie.id);
    } catch (error) {
      console.log('failed to add movie');
    }
  };

  const handleRemoveMovie = async () => {
    try {
      await removeMovieFromList(listItemID);
    } catch (error) {
      console.log('failed to remove movie');
    }
  };

  const handleAddComment = async () => {
    try {
      await addUserComment(comment, movie.id);
      setComment('');
      setVisibleInput(false);
    } catch (error) {
      console.log('Failed to add comment');
    }
  };

  const renderItem = ({ item }) => (
    <CommentCard
      comment={item}
      title={item.user.username}
      onPressTitle={() => {}}
      style={null}
    />
  );

  if (!movie) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={modalStyles.container}
        activeOpacity={1}
        onPressOut={onClose}>
        <View
          style={[modalStyles.content, styles.content]}
          onStartShouldSetResponder={() => true}>
          <View style={styles.row}>
            <Image
              style={[mainStyles.poster, styles.poster]}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              resizeMode="contain"
            />
            <View style={styles.movieDetails}>
              <Text style={styles.title}>{movie.title}</Text>
              {movie.title !== movie.original_title ? (
                <Text style={styles.originalTitle}>{movie.original_title}</Text>
              ) : null}
              <Text style={styles.runtime}>Durée : {movie.runtime}min</Text>
              <Text>
                Date de sortie :{' '}
                {new Date(movie.release_date).toLocaleDateString()}
              </Text>
              <Text>Popularité : {movie.popularity}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={18} />
            </TouchableOpacity>
          </View>
          <Text style={mainStyles.h3}>Résumé</Text>
          <ScrollView style={styles.scrollView}>
            <View onStartShouldSetResponder={() => true}>
              <Text>{movie.overview}</Text>
            </View>
          </ScrollView>
          {movieComments.length > 0 && (
            <>
              <Text style={mainStyles.h3}>Commentaires</Text>
              <ScrollView style={styles.scrollView}>
                <View onStartShouldSetResponder={() => true}>
                  <FlatList
                    data={movieComments}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </ScrollView>
            </>
          )}
          {user && (
            <>
              <TouchableOpacity
                style={[mainStyles.button, mainStyles.blueButton]}
                onPress={isInList ? handleRemoveMovie : handleAddMovie}>
                <Text style={mainStyles.whiteText}>
                  {isInList ? 'Retirer de la liste' : 'Ajouter à la liste'}
                </Text>
              </TouchableOpacity>
              {visibleInput ? (
                <TextInput
                  editable
                  multiline
                  numberOfLines={3}
                  maxLength={255}
                  onChangeText={setComment}
                  value={comment}
                  style={styles.input}
                />
              ) : null}
              <TouchableOpacity
                style={[mainStyles.button, mainStyles.blueButton]}
                onPress={
                  visibleInput ? handleAddComment : () => setVisibleInput(true)
                }>
                <Text style={mainStyles.whiteText}>
                  {visibleInput ? 'Valider' : 'Ajouter un commentaire'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    maxHeight: 700,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  poster: {
    width: '35%',
  },
  movieDetails: {
    flex: 1,
    paddingLeft: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  originalTitle: {
    fontStyle: 'italic',
  },
  runtime: {
    marginTop: 10,
  },
  scrollView: {
    maxHeight: 170,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
});
