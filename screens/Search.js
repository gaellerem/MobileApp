import { useState, useRef, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fetchMovies } from '../services/api';
import mainStyles from '../styles/MainStyle';
import MovieCard from '../components/MovieCard';
import Filter from '../modals/filter';
import Sort from '../modals/sort';

export default function ({ handleCardPress }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [sortDisplay, setSortDisplay] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const flatListRef = useRef(null);

  const fetchData = async (page) => {
    let data = await fetchMovies(searchString, sortOrder, sortBy, page);
    if (page !== 1) {
      data = [...movies, ...data];
    }
    setMovies(data);
    if (data.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [sortOrder, sortBy, sortDisplay]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(page + 1);
      fetchData(page + 1);
    }
  };

  const loadData = () => {
    setPage(1);
    setHasMore(true);
    fetchData(1);
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const debounced = useDebouncedCallback(loadData, 500);

  const handleSearch = (text) => {
    setSearchString(text);
    debounced(text);
  };

  const handleSort = (order, by) => {
    setSortOrder(order);
    setSortBy(by);
    switch (by) {
      case 'popularity':
        display = order === 'asc' ? '(Moins populaire)' : '(Plus populaire)';
        break;
      case 'release_date':
        display = order === 'asc' ? '(Moins récent)' : '(Plus récent)';
        break;
      case 'title':
        display = order === 'asc' ? '(A-Z)' : '(Z-A)';
        break;
      default:
        display = '';
    }
    setSortDisplay(display);
  };

  const renderItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => handleCardPress(item)}
      showOriginalTitle={true}
      showReleaseDate={false}
      cardWidth={'47%'}
    />
  );

  return (
    <View style={[mainStyles.container, styles.container]}>
      <View style={[mainStyles.row, styles.searchSection]}>
        <Ionicons style={styles.icon} name="search" />
        <TextInput
          style={styles.input}
          placeholder="Titre de film..."
          value={searchString}
          onChangeText={handleSearch}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={[mainStyles.row, styles.filterSection]}>
        <TouchableOpacity
          style={mainStyles.row}
          onPress={() => setFilterVisible((prev) => !prev)}>
          <Ionicons name="filter" size={15} />
          <Text style={styles.text}> Filtre </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={mainStyles.row}
          onPress={() => setSortVisible((prev) => !prev)}>
          <Ionicons name="swap-vertical" size={15} />
          <Text style={styles.text}> Trier </Text>
          {sortOrder ? (
            <Text style={styles.sortOrder}> {sortDisplay} </Text>
          ) : null}
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
      />
      <Filter
        visible={filterVisible}
        onClose={() => setFilterVisible((prev) => !prev)}
      />
      <Sort
        visible={sortVisible}
        onClose={() => setSortVisible((prev) => !prev)}
        onSort={handleSort}
        sortOrder={sortOrder}
        sortBy={sortBy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchSection: {
    margin: 10,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  icon: {
    padding: 10,
  },
  text: {
    fontSize: 15,
  },
  filterSection: {
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    outlineStyle: 'none',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 5,
  },
  sortOrder: {
    color: 'grey',
  },
});
