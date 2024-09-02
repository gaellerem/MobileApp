import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import isEmail from 'validator/lib/isEmail';

import mainStyles from '../styles/MainStyle';
import loginStyles from '../styles/LoginStyle';
import { checkEmailExists } from '../services/api'

export default function ({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleInput = (newText) => {
    setEmail(newText.trim());
    setError('');
  };

  const signup = async () => {
    if (email.trim() === '') {
      setError('Merci de renseigner une adresse e-mail.');
    } else if (!isEmail(email)) {
      setError('Merci de renseigner une adresse e-mail valide.');
    } else {
      try {
        const exists = await checkEmailExists(email);
        if(exists) {
          setError('Cet e-mail est déjà utilisé.');
        } else {
          navigation.navigate('Register', {
            data: email,
          });
        }
      } catch (error) {
        setError('Erreur de communication')
      }
    }
  };

  const googleConnect = () => {};
  return (
    <View style={[mainStyles.container, loginStyles.container]}>
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        placeholder="E-mail"
        onChangeText={handleInput}
        keyboardType="email-address"
        value={email}
        inputmode="email"
        autoComplete="email"
        autoCapitalize="none"
        onSubmitEditing={signup}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      {error ? <Text style={{ color: 'red' }}> {error} </Text> : null}
      <TouchableOpacity
        onPress={signup}
        style={[loginStyles.button, loginStyles.connectButton]}>
        <Text style={loginStyles.text}>S'inscrire</Text>
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
        onPress={() => navigation.navigate('Login')}>
        <Text>Déjà un compte ? Connectes-toi ici</Text>
      </TouchableOpacity>
    </View>
  );
}
