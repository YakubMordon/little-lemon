import { StyleSheet, Text, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Avatar({size, image}) {
  const imageSize = {width: size, height: size }

  return (
    <View style={styles.container}>
        {image.length > 2 
        ? 
            (<Image style={[styles.image, imageSize]} source={{uri: image}}/>)
        :
        (
            <View style={[styles.image, styles.nonImage, imageSize]}>
                <Text style={styles.text}>{image}</Text>
            </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginRight: 20,
        marginLeft: 8,
    },
    image:{
        borderRadius: 50
    },
    nonImage:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#62d6c4'
    },
    text:{
        color: 'white'
    }
});
