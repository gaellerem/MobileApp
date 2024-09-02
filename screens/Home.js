import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import mainStyles from '../styles/MainStyle';
import MovieCard from '../components/MovieCard';
import { fetchNowPlayingMovies, fetchUpcomingMovies, fetchPopularMovies } from '../services/api'

export default function ({ handleCardPress }) {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const loadData= async () => {
      const newPlayingMovies = await fetchNowPlayingMovies();
      const newUpcomingMovies = await fetchUpcomingMovies();
      const newPopularMovies = await fetchPopularMovies();
      setNowPlayingMovies(newPlayingMovies);
      setUpcomingMovies(newUpcomingMovies);
      setPopularMovies(newPopularMovies);
    }
    loadData()
  }, []);

  const renderItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => handleCardPress(item)}
      showOriginalTitle={false}
      showReleaseDate={true}
      cardWidth={130}
    />
  );

  return (
    <View style={[mainStyles.container, styles.container]}>
      <ScrollView>
        <Text style={mainStyles.h1}>Dernières sorties</Text>
        <FlatList
          data={nowPlayingMovies}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          style={styles.flatList}
        />
        <Text style={mainStyles.h1}>Films à venir</Text>
        <FlatList
          data={upcomingMovies}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          style={styles.flatList}
        />
        <Text style={mainStyles.h1}>Top 10 popularité</Text>
        <FlatList
          data={popularMovies}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          style={styles.flatList}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  flatList: {
    height: 285,
  },
});
