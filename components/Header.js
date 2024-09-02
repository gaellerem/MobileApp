import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function () {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Image source={require('../assets/logo_sans.png')} style={styles.logo} />
      <Image
        source={require('../assets/logo_ecriture.png')}
        style={styles.logoname}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: '10%',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  logoname: {
    width: 200,
    resizeMode: 'contain',
  },
});
