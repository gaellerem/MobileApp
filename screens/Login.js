import { useState, useRef } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import mainStyles from '../styles/MainStyle';
import loginStyles from '../styles/LoginStyle';
import { useAuth } from '../contexts/authContext';

export default function ({ navigation }) {
  const { signInUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const passwordRef = useRef();

  const handleEmail = (newText) => {
    setEmail(newText.trim());
    setError('');
  }

  const handleLogin = async () => {
    if (email && password) {
      try {
        await signInUser(email, password);
        navigation.navigate('Accueil');
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Veuillez entrer votre email et mot de passe');
    }
  };

  const googleConnect = () => {};

  return (
    <View style={[mainStyles.container, loginStyles.container]}>
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        placeholder="E-mail"
        onChangeText={handleEmail}
        value={email}
        inputmode="email"
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        placeholder="Ton mot de passe"
        autoComplete="current-password"
        ref={passwordRef}
        returnKeyType="next"
        onSubmitEditing={handleLogin}
      />
      {error ? <Text style={{ color: 'red' }}> {error} </Text> : null}
      <TouchableOpacity
        onPress={handleLogin}
        style={[loginStyles.button, loginStyles.connectButton]}>
        <Text style={loginStyles.text}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={googleConnect}
        style={[loginStyles.googleButton, loginStyles.button]}>
        <Image
          style={loginStyles.googleImage}
          source={require('../assets/google_logo.png')}
        />
        <Text style={loginStyles.text}>Continuer avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={loginStyles.signup}
        onPress={() => navigation.navigate('SignUp')}>
        <Text>Pas de compte ? Crées-le ici</Text>
      </TouchableOpacity>
    </View>
  );
}


