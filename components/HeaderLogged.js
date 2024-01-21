import { StyleSheet, View } from 'react-native';
import CircleButton from './CircleButton';
import Header from './Header';
import Avatar from './Avatar';

export default function HeaderLogged({image}) {
  return (
    <View style={styles.container}>
      <CircleButton func={() => console.log("I'm clicked")}/>
      <Header bgColor={'white'}/>
      <Avatar size={40} image={image}/>
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
