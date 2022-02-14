import { View, Text, TextInput, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import PokeItem from '../components/PokeItem';
import PokeContext from '../context/PokeContext';

const HomeScreen = () => {

    const { fetchPokemons, pokemons } = useContext(PokeContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPokemons();
        setLoading(false)
    }, [])

    function renderHeader() {
        return (
            <View style={{ marginTop: 40, marginHorizontal: 12, marginBottom: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 32 }}>PokeDex</Text>
                <View style={{ borderRadius: 20, paddingHorizontal: 20, borderWidth: 1, marginTop: 20 }}>
                    <TextInput placeholder='Search for a Pokemon!' style={{ borderRadius: 20, width: '100%', height: 40 }} />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar style='auto' />
            {renderHeader()}
            {
                loading ?
                    <Text>Loading...</Text>
                    : <FlatList
                        data={pokemons}
                        keyExtractor={item => `Poke-${item.name}`}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <PokeItem {...item} />}
                    />}
        </View>
    )
}

export default HomeScreen