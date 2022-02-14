import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const PokeItem = (item) => {

    const [pokeInfo, setPokeInfo] = useState([]);
    const [type, setType] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation()
    const { url, name } = item;
    const pokeID = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(url);
            setPokeInfo(res.data);
            setType(res.data.types[0].type.name);
            setHeight(res.data.height);
            setWeight(res.data.weight);
            setLoading(false);
        }
        fetchData();
    }, [])

    const backgroundColor = {
        'grass': '#7CB342',
        'poison': '#9C27B0',
        'fire': '#F44336',
        'flying': '#1976D2',
        'water': '#2196F3',
        'bug': '#4CAF50',
        'normal': '#9E9E9E',
        'electric': '#FFEB3B',
        'ground': '#FBC02D',
        'fairy': '#FFCDD2',
        'fighting': '#D50000',
        'psychic': '#E91E63',
        'rock': '#795548',
        'steel': '#BDBDBD',
        'ghost': '#607D8B',
        'ice': '#00BCD4',
        'dragon': '#3F51B5',
    }

    return (
        loading ?
            <ActivityIndicator />
            :
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Detail', { url: url, name: name, id: pokeID, type: type, pokeInfo: pokeInfo })}
                    style={{ margin: 12, flex: 1, borderRadius: 20, backgroundColor: backgroundColor[type], paddingVertical: 10, justifyContent: 'center', alignItems: 'center', ...styles.shadow }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name[0].toUpperCase() + name.slice(1)}</Text>
                        <Image source={{ uri: imageURL }} style={{ width: 100, height: 100 }} resizeMode="contain" />
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>#{pokeID.padStart('3', '0')}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 5, borderRadius: 20, width: 65, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: backgroundColor[type], textAlign: 'center', fontWeight: 'bold' }}>{type.toUpperCase()}</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 5, borderRadius: 20, width: 65, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', textAlign: 'center', margin: 'auto' }}>{height} CM</Text>
                        <Text style={{ color: 'white', textAlign: 'center' }}>{weight} KG</Text>
                    </View>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default PokeItem