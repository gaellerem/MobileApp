import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import modalStyles from '../styles/ModalStyle';

export default function ({ visible, onClose, onSort, sortOrder, sortBy }) {
  const getNextSortOrder = (currentSortBy) => {
    if (sortBy !== currentSortBy) {
      if (currentSortBy === 'title') return 'asc';
      return 'desc';
    }
    if (currentSortBy === 'title') {
      if (sortOrder === 'asc') return 'desc';
      if (sortOrder === 'desc') return '';
      return 'asc';
    }
    if (sortOrder === 'desc') return 'asc';
    if (sortOrder === 'asc') return '';
    return 'desc';
  };

  const handleSort = (sortBy) => {
    const nextSortOrder = getNextSortOrder(sortBy);
    onSort(nextSortOrder, nextSortOrder? sortBy : "");
  };

  const getIconName = () => {
    if (sortOrder === 'asc') return 'arrow-up';
    if (sortOrder === 'desc') return 'arrow-down';
    return null;
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={modalStyles.container}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={modalStyles.content}>
          <TouchableOpacity
            style={styles.line}
            onPress={() => handleSort('title')}>
            <Text
              style={
                sortBy === 'title'
                  ? styles.selected
                  : null
              }>
              Alphabétique
            </Text>
            {sortBy === 'title' && (
              <Ionicons
                style={[styles.icon, sortOrder && styles.selected]}
                name={getIconName()}
                size={20}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.line}
            onPress={() => handleSort('popularity')}>
            <Text
              style={
                sortBy === 'popularity'
                  ? styles.selected
                  : null
              }>
              Popularité
            </Text>
            {sortBy === 'popularity' && (
              <Ionicons
                style={[styles.icon, sortOrder && styles.selected]}
                name={getIconName()}
                size={20}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.line}
            onPress={() => handleSort('release_date')}>
            <Text
              style={
                sortBy === 'release_date'
                  ? styles.selected
                  : null
              }>
              Date de sortie
            </Text>
            {sortBy === 'release_date' && (
              <Ionicons
                style={[styles.icon, sortOrder && styles.selected]}
                name={getIconName()}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selected: {
    color: '#35607c',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 5,
  },
});
