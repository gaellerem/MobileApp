import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/authContext';
import Navigation from './Navigation';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
