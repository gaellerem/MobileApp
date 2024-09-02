import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

export default function ({
  movie,
  onPress,
  showOriginalTitle,
  showReleaseDate,
  cardWidth,
}) {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer, { width: cardWidth }]}>
      <View style={styles.card}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
            {movie.title}
          </Text>
          {movie.title !== movie.original_title && showOriginalTitle ? (
            <Text style={styles.originalTitle} numberOfLines={2} adjustsFontSizeToFit>
              {movie.original_title}
              </Text>
          ) : null}
          {showReleaseDate ? (
            <Text style={styles.releaseDate}>
              Date de sortie :{' '}
              {new Date(movie.release_date).toLocaleDateString()}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexBasis: '47%',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: '100%',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  originalTitle: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
});
