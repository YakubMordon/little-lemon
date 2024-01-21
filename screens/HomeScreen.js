import { FlatList, Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { createTable, getMenuItems, saveMenuItems, truncateMenuItems } from '../database';
import Item from '../components/Item';
import HeaderProfile from '../components/HeaderProfile';
import headFood from '../assets/headFood.bmp'
import Avatar from '../components/Avatar';
import MagnifyingGlass from '../components/MagnifyingGlass';
import FilterButton from '../components/FilterButton';

export default function ProfileScreen({navigation}) {
  const [starters, setStarters] = useState(false);
  const [mains, setMains] = useState(false);
  const [desserts, setDesserts] = useState(false);
  const [drinks, setDrinks] = useState(false);

  const [image, setImage] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImage = async() =>{
    try{
        const data = await AsyncStorage.getItem("avatar");
        setImage(data);
    }catch(error){
        console.error(error);
    }
  }
  
  const fetchData = async() => {
    const data = await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json").then(res => res.json())
    return data.menu;
  }

  const dataManipulation = async() =>{
    try {
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
         menuItems = await fetchData();
         saveMenuItems(menuItems);
        }

       setMenu(menuItems);
     } catch (e) {
       Alert.alert(e.message);
     }
  }

  useEffect(()=>{
    setLoading(true);
    getImage();
    dataManipulation();
    setLoading(false);
  },[])

  if(loading) return <SplashScreen />

  const imageRender = () => {
    return(
    <Pressable onPress={() => navigation.navigate("Profile")}>
        <Avatar size={40} image={image}/>
    </Pressable>
    )}

  const goBackRender = () => {return (<View style={{height: 40, width: 40}} />)}

  const item = ({item}) => <Item name={item.name} description={item.description} price={item.price} image={item.image}/>

  return (
    <View style={styles.container}>
        <HeaderProfile image={imageRender} goBack={goBackRender}/>
        <View style={styles.containerHead}>
            <View style={styles.containerInnerHead}>
                <Text style={styles.headLeadingText}>Little Lemon</Text>
                <Text style={styles.headCityText}>Chicago</Text>
                <View style={styles.headImageContainer}>
                    <View style={styles.headDescriptionContainer}>
                        <Text style={styles.headDescription}>We are a family owned</Text>
                        <Text style={styles.headDescription}>Mediterranean restaurant,</Text> 
                        <Text style={styles.headDescription}>focused on a traditional</Text>
                        <Text style={styles.headDescription}>recipes served</Text>
                        <Text style={styles.headDescription}>with a modern twist.</Text>
                    </View>
                    <Image style={styles.headImage} source={headFood}/>
                </View>
                <MagnifyingGlass func={() => console.log("I'm pressed")}/>
            </View>
        </View>
        <Text style={styles.deliveryText}>ORDER FOR DELIVERY!</Text>
        <View style={styles.filterContainer}>
            <FilterButton func={() => setStarters(!starters)} text={'Starters'} isSelected={starters}/>
            <FilterButton func={() => setMains(!mains)} text={'Mains'} isSelected={mains}/>
            <FilterButton func={() => setDesserts(!desserts)} text={'Desserts'} isSelected={desserts}/>
            <FilterButton func={() => setDrinks(!drinks)} text={'Drinks'} isSelected={drinks}/>
        </View>
        <FlatList 
            data={menu}
            renderItem={item}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  containerHead:{
    backgroundColor: '#495e57',
    height: '40%'
  },
  containerInnerHead:{
    marginLeft: 15,
  },
  headLeadingText:{
    color: '#f4ce14',
    fontSize: 30,
    marginTop: 5
  },
  headCityText:{
    color: 'white',
    fontSize: 27,
  },
  headImageContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headDescriptionContainer:{
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20
  },
  headDescription:{
    color: 'white',
    fontSize: 16,
  },
  headImage:{
    width: 160,
    height: 160,
    borderWidth: 15,
    marginRight: 10
  },
  deliveryText:{
    color: '#333333',
    fontWeight: '600',
    fontSize: 19,
    marginTop: 15,
    marginLeft: 8
  },
  filterContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginLeft: 30,
  }
});
