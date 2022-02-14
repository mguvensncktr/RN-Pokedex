import { View, Text, TextInput, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import PokeItem from '../components/PokeItem';
import PokeContext from '../context/PokeContext';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {

    const { fetchPokemons, pokemons, setPokemons } = useContext(PokeContext);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        fetchPokemons();
        setLoading(false);
    }, [])

    function handleSubmit() {
        setSearch(!search)
        setPokemons(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input.toLowerCase())))
        setInput('')
    }

    function handleOnClose() {
        setSearch(!search)
        fetchPokemons();
    }


    function renderHeader() {
        return (
            <View style={{ marginTop: 40, marginHorizontal: 12, marginBottom: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 32 }}>PokeDex</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ borderRadius: 20, paddingHorizontal: 20, borderWidth: 1, marginTop: 20, flex: 1 }}>
                        <TextInput placeholder='Search for a Pokemon!' value={input} onChangeText={text => setInput(text)} style={{ borderRadius: 20, width: '100%', height: 40 }} />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#1a73e8',
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            marginTop: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                        }}
                        onPress={() => search ? handleOnClose() : handleSubmit()}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {search ? <AntDesign name='close' size={20} color='white' /> : <AntDesign name='search1' size={20} color='white' />}
                            <Text style={{ color: 'white', marginLeft: 5 }}>{search ? "See All" : "Search"}</Text>
                        </View>
                    </TouchableOpacity>
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