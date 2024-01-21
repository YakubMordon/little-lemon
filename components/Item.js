import { Image, StyleSheet, Text, View } from 'react-native';

export default function Item({name, description, price, image}) {
  const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`;

  return (
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            <Text style={styles.priceText}>${price}</Text>
        </View>
        <View>
            <Image style={styles.image} source={{uri: imageUrl}}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
  },
  textContainer:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15
  },
  nameText:{
    fontWeight: '600',
    fontSize: 17,
  },
  descriptionText:{
    width: 250,
    color: '#495e57',
    fontSize: 17,
  },
  priceText:{
    color: '#495e57',
    fontSize: 17,
  },
  image:{
    width: 80,
    height: 80,
    marginTop: 20,
  },
});
