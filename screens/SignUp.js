import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import mainStyles from '../styles/MainStyle';
import loginStyles from '../styles/LoginStyle';
import { useAuth } from '../contexts/authContext';

export default function ({ route }) {
  const { signUpUser } = useAuth();

  const { data } = route.params;
  const [email, setEmail] = useState(data);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSignUp = async () => {
    if (password != confirmPassword){
      setError("Les mots de passe ne correspondent pas.")
      return;
    }
    if (email && password && confirmPassword && username && name) {
      try {
        await signUpUser(email, name, username, password, confirmPassword);
      } catch (error) {
        setError('Erreur de création');
      }
    } else {
      setError('Veuillez remplir tous les champs');
    }
  };

  return (
    <View style={[mainStyles.container, loginStyles.container]}>
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        placeholder="Pseudo"
        onChangeText={(newText) => setUsername(newText)}
        value={username}
        onSubmitEditing={() => nameRef.current.focus()}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        placeholder="Nom et prénom"
        onChangeText={(newText) => setName(newText)}
        value={name}
        autoComplete="name"
        onSubmitEditing={() => passwordRef.current.focus()}
        ref={nameRef}
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        onChangeText={(newText) => setEmail(newText)}
        value={email}
        editable={false}
      />
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        secureTextEntry={true}
        placeholder="Mot de passe"
        onChangeText={(newText) => setPassword(newText)}
        value={password}
        autoComplete="new-password"
        ref={passwordRef}
      />
      <TextInput
        style={[mainStyles.textInput, loginStyles.textInput]}
        secureTextEntry={true}
        placeholder="Confirmer le mot de passe"
        onChangeText={(newText) => setConfirmPassword(newText)}
        value={confirmPassword}
        ref={confirmPasswordRef}
      />
      {error ? <Text style={{ color: 'red' }}> {error} </Text> : null}
      <TouchableOpacity
        onPress={handleSignUp}
        style={[loginStyles.button, loginStyles.connectButton]}>
        <Text style={loginStyles.text}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}
