import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyles from '../styles/MainStyle';
import { useAuth } from '../contexts/authContext';

export default function () {
  const { movieList, removeMovieFromList, toggleMovie } = useAuth();

  const [selectedIds, setSelectedIds] = useState([]);
  const [filterMode, setFilterMode] = useState('all');
  const [selectAll, setSelectAll] = useState(false);

  const handleFilter = () => {
    let newFilterMode;
    if (filterMode === 'all') {
      newFilterMode = 'seen';
    } else if (filterMode === 'seen') {
      newFilterMode = 'unseen';
    } else {
      newFilterMode = 'all';
    }
    setFilterMode(newFilterMode);
    if (selectAll) {
      toggleSelectAll();
      setSelectAll(!selectAll);
    }
  };

  const getFilteredMovies = () => {
    if (filterMode === 'seen') {
      return movieList.filter((item) => item.status === "Vus");
    } else if (filterMode === 'unseen') {
      return movieList.filter((item) => item.status !== "Vus");
    } else {
      return movieList;
    }
  };

  const toggleSeen = async (id) => {
    await toggleMovie(id);
  };

  const toggleSelection = (id) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  const toggleSelectAll = () => {
    const filteredMovies = getFilteredMovies();
    const newSelectAll = !selectAll;
    setSelectedIds(
      newSelectAll
        ? filteredMovies.map((item) => item.id)
        : []
    );
    setSelectAll(newSelectAll);
  };

  const removeSelected = () => {
    selectedIds.forEach((id) => removeMovieFromList(id));
    setSelectedIds([]);
    setSelectAll(false);
  };

  const confirmRemoveSelected = () => {
    if (selectedIds.length > 0) {
      Alert.alert(
        'Confirmation',
        'Êtes-vous sûr de vouloir supprimer les éléments sélectionnés ?',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: removeSelected,
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  };

  const renderHeader = () => (
    <TableWrapper style={[styles.header, styles.row]}>
      <Cell
        data={
          <CheckBox
            checked={selectAll}
            onPress={toggleSelectAll}
            checkedColor="#35607c"
          />
        }
        style={{ flex: 1 }}
      />
      <Cell
        data={<Text style={styles.headText}>Titre du film</Text>}
        style={{ flex: 4 }}
      />
      <Cell
        data={
          <TouchableOpacity onPress={handleFilter}>
            <Text style={[styles.headText, styles.centerText]}>
              {filterMode === 'seen' ? 'Vus' : filterMode === 'unseen' ? 'À voir' : 'À voir/Vus'}
            </Text>
          </TouchableOpacity>
        }
        style={{ flex: 2 }}
      />
    </TableWrapper>
  );

  const renderData = (item, index) => (
    <TableWrapper key={index} style={styles.row}>
      <Cell
        key={0}
        data={
          <CheckBox
            checked={selectedIds.includes(item.id)}
            checkedColor="#35607c"
            size={20}
            onPress={() => toggleSelection(item.id)}
          />
        }
        style={{ flex: 1 }}
      />
      <Cell
        key={1}
        data={<Text style={styles.cellText}>{item.movie.title}</Text>}
        style={{ flex: 4 }}
      />
      <Cell
        key={2}
        data={
          <View style={styles.switchContainer}>
            <Switch
              value={item.status === "Vus"}
              onValueChange={() => toggleSeen(item.id)}
              style={styles.switch}
            />
          </View>
        }
        style={{ flex: 2 }}
      />
    </TableWrapper>
  );

  const renderFooter = () => (
    <TableWrapper style={[styles.footer, styles.row]}>
      <Cell
        style={{ flex: 1 }}
        data={
          <TouchableOpacity
            onPress={confirmRemoveSelected}
            style={styles.removeButton}>
            <Ionicons name="trash" size={26} color="#35607c" />
          </TouchableOpacity>
        }
      />
      <Cell
        data={<Text style={styles.rightText}>Total films vus: </Text>}
        style={{ flex: 4 }}
      />
      <Cell
        data={
          <Text style={styles.centerText}>
            {movieList.filter((row) => row.movie.status === 'Vus').length}/{movieList.length}
          </Text>
        }
        style={{ flex: 2 }}
      />
    </TableWrapper>
  );

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.h1}>Ma liste de films</Text>
      {renderHeader()}
      <ScrollView>
        <Table>
          {getFilteredMovies().map((item, index) => renderData(item, index))}
        </Table>
      </ScrollView>
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headText: {
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    margin: 4,
  },
  cellText: {
    fontSize: 16,
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footer: {
    height: 44,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  removeButton: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  rightText: {
    textAlign: 'right',
  },
});
