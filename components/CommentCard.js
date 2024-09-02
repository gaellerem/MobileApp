import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import he from 'he';
  
  import mainStyles from '../styles/MainStyle';
  
  export default function ({ comment, title, onPressTitle, style }) {
    return (
      <View style={style}>
        <View style={styles.row}>
          <TouchableOpacity style={{ width: '70%' }} onPress={onPressTitle}>
            <Text
              style={mainStyles.underline}
              numberOfLines={2}
              ellipsizeMode="tail">
              {title}
            </Text>
          </TouchableOpacity>
          <Text style={styles.date}>
            {new Date(comment.updated_at).toLocaleDateString()}
          </Text>
        </View>
        <Text>{he.decode(comment.content)}</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    date: {
      fontStyle: 'italic',
    },
  });
  