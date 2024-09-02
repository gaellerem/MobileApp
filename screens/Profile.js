import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import mainStyles from '../styles/MainStyle';
import modalStyles from '../styles/ModalStyle';
import CommentCard from '../components/CommentCard';
import { useAuth } from '../contexts/authContext';

export default function ({ handleCardPress }) {
  const { 
    user, 
    comments,
    signOutUser, 
    removeUserComment,
    updateUserComment } = useAuth();
  const [visible, setVisible] = useState(false)
  const [commentId, setCommentId] = useState(null);
  const [content, setContent] = useState('');

  const toggleEditComment = () =>{
    setVisible(!visible)
  }
  
  const handleEditPress = async (item) => {
    toggleEditComment()
    setContent(item.content)
    setCommentId(item.id)
  };

  const handleRemove = async (id) => {
    await removeUserComment(id);
  };

  const handleUpdateComment = async () => {
    if (commentId) {
      await updateUserComment(commentId, content);
      toggleEditComment();
      setCommentId(null);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={mainStyles.row}>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Ionicons
            name="trash"
            size={20}
            color="#35607c"
            style={styles.icon}
          />
        </TouchableOpacity>
        <CommentCard
          comment={item}
          title={item.movie.title}
          onPressTitle={() => handleCardPress(item.movie)}
          style={styles.card}
        />
        <View>
          <TouchableOpacity onPress={() => handleEditPress(item)}>
            <Ionicons
              name="pencil"
              size={20}
              color="#35607c"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[mainStyles.container, styles.container]}>
      <Image source={require('../assets/Avatar_2.png')} style={styles.avatar} />
      <Text style={styles.h2}>{user?.username}</Text>
      <View style={styles.profileInfos}>
        <View style={mainStyles.row}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.infoText}>Email : {user.email}</Text>
        </View>
        <View style={mainStyles.row}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.infoText}>Nom : {user.name}</Text>
        </View>
        <View style={mainStyles.row}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            Membre depuis : {new Date(user.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={styles.h2}>Commentaires</Text>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={signOutUser}
        style={[mainStyles.button, mainStyles.blueButton]}>
        <Text style={mainStyles.whiteText}>Déconnexion</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={toggleEditComment}>
        <TouchableOpacity 
          style={modalStyles.container}
          activeOpacity={1}
          onPressOut={toggleEditComment}>
          <View 
            style={modalStyles.content} 
            onStartShouldSetResponder={() => true}
          >
            <TextInput
              editable
              multiline
              numberOfLines={3}
              maxLength={255}
              onChangeText={setContent}
              value={content}
              style={styles.input}
            />
            <TouchableOpacity
              style={[mainStyles.button, mainStyles.blueButton]}
              onPress={handleUpdateComment}>
              <Text style={mainStyles.whiteText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfos: {
    alignItems: 'center',
  },
  icon: {
    margin: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
});
