import { StyleSheet } from 'react-native'

const loginStyles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 230,
    placeholderTextColor : "grey",
  },
  text: {
    color: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent : 'center',
    padding: 5,
    width: 200,
    height: 40,
    borderRadius: 10,
    margin: 5,
  },
  connectButton: {
    backgroundColor : '#35607c',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor : '#b1bfd6',
  },
  googleImage: {
    height: 25,
    width : 25,
    marginRight: 10
  },
  signup: {
    padding:10,
  }
});

export default loginStyles;