import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
  } from 'react-native';
  
  import modalStyles from '../styles/ModalStyle';
  import mainStyles from '../styles/MainStyle';
  
  export default function ({ visible, onClose }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={modalStyles.container}>
            <View style={modalStyles.content}>
              <Text>Vous pourrez bientôt filtrer !</Text>
              <TouchableOpacity
                style={[mainStyles.button, mainStyles.blueButton]}>
                <Text style={mainStyles.whiteText}> Enregistrer </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  