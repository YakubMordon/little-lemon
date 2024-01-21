import { StyleSheet, View } from 'react-native';
import Header from './Header';

export default function HeaderProfile({image, goBack}) {
  return (
    <View style={styles.container}>
      {goBack()}
      <Header bgColor={'white'}/>
      {image()}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: 55,
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
