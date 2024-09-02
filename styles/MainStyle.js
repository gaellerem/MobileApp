import { StyleSheet } from 'react-native'

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily : 'Helvetica',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderRadius: 10,
    color: 'black',
    borderColor: "#FFFFFF",
    backgroundColor : "white",
    padding: 7,
    margin: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent : 'center',
    padding: 7,
    borderRadius: 10,
    margin: 5,
  },
  blueButton: {
    backgroundColor : '#35607c',
  },
  greyButton: {
    backgroundColor : '#ccc',
  },
  whiteText: {
    color: 'white',
  },
  poster: {
    width: '50%',
    aspectRatio: 2 / 3,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  h3: {
    fontSize: 18,
    paddingBottom: 5,
  },
  underline: {
    textDecorationLine: 'underline',
  }
});

export default mainStyles;
