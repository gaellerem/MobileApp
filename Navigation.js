import { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAuth } from './contexts/authContext';
import CustomHeader from './components/Header';
import Home from './screens/Home';
import Search from './screens/Search';
import LoginStack from './stacks/LoginStack';
import Profile from './screens/Profile';
import MovieList from './screens/MovieList';
import Movie from './modals/movie';

const Tab = createBottomTabNavigator();

export default function () {
  const { user } = useAuth();
  const [movieVisible, setMovieVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const toggleMovie = () => {
    setMovieVisible((prev) => !prev);
  };

  const handleCardPress = (movie) => {
    setSelectedMovie(movie);
    setMovieVisible(true);
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <CustomHeader />
        <Tab.Navigator
          initialRouteName="Accueil"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case 'Accueil':
                  return (
                    <Ionicons
                      name={focused ? 'home' : 'home-outline'}
                      size={size}
                      color={color}
                    />
                  );
                case 'Recherche':
                  return (
                    <Ionicons
                      name={focused ? 'search' : 'search-outline'}
                      size={size}
                      color={color}
                    />
                  );
                case 'Connexion':
                  return (
                    <Ionicons
                      name={focused ? 'log-in' : 'log-in-outline'}
                      size={size}
                      color={color}
                    />
                  );
                case 'Ma liste':
                  return (
                    <Ionicons
                      name={focused ? 'reader' : 'reader-outline'}
                      size={size}
                      color={color}
                    />
                  );
                case 'Profil':
                  return (
                    <Ionicons
                      name={focused ? 'person-circle' : 'person-circle-outline'}
                      size={size}
                      color={color}
                    />
                  );
              }
            },
            tabBarActiveTintColor: '#35607c',
            tabBarInactiveTintColor: '#8f8e93',
          })}>
          <Tab.Screen name="Accueil">
            {() => <Home handleCardPress={handleCardPress} />}
          </Tab.Screen>
          <Tab.Screen name="Recherche">
            {() => <Search handleCardPress={handleCardPress} />}
          </Tab.Screen>
          {!user ? (
            <Tab.Screen name="Connexion" component={LoginStack} />
          ) : (
            <>
              <Tab.Screen name="Ma liste" component={MovieList} />
              <Tab.Screen name="Profil">
                {() => <Profile handleCardPress={handleCardPress} />}
              </Tab.Screen>
            </>
          )}
        </Tab.Navigator>
      </View>
      <Movie
        visible={movieVisible}
        onClose={toggleMovie}
        movie={selectedMovie}
      />
    </NavigationContainer>
  );
}
