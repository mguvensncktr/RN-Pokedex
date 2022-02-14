import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';

const DetailScreen = ({ route, navigation }) => {

    const { name, url, id, type, pokeInfo } = route.params;
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const [fav, setFav] = useState(false);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 20 : 30, justifyContent: 'space-between', marginHorizontal: 12, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="chevron-left" size={24} color="blue" />
                        <Text style={{ color: 'blue', marginLeft: 5, fontSize: 16 }}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => setFav(!fav)}
                >
                    <Entypo name={fav ? "heart" : "heart-outlined"} size={30} color="red" />
                </TouchableOpacity>
            </View>
        )
    }

    function renderPokeInfo() {
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: imageURL }} resizeMode="contain" style={{ width: '100%', height: 225 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 10, fontSize: 16, fontWeight: '700' }}>ID: #{id.padStart('3', '0')}</Text>
                        <Text style={{ color: 'black', fontWeight: '700', fontSize: 16 }}>Type: {type[0].toUpperCase() + type.slice(1)}</Text>
                    </View>
                </View>
            </View>

        )
    }

    function renderAbilities() {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 12 }}>Abilities</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                    {
                        pokeInfo.abilities.map((ability, idx) => {
                            return (
                                <View key={idx} style={{ width: '50%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{ability.ability.name.toUpperCase()}</Text>
                                    <Text style={{ fontSize: 14, color: 'black' }}>{ability.is_hidden ? 'Hidden' : 'Visible'}</Text>
                                </View>
                            )
                        }
                        )}
                </View>
            </View>
        )
    }

    function renderStats() {
        return (
            <View style={{ marginTop: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 12 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Stats</Text>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Base Stat</Text>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Effort</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    {
                        pokeInfo.stats.map((stat, idx) => {
                            return (
                                <View key={idx} style={{ marginHorizontal: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: '700' }}>{stat.stat.name.toUpperCase()}</Text>
                                        <Text style={{ flex: 1, fontSize: 14, color: 'black' }}>{stat.base_stat}</Text>
                                        <Text style={{ fontSize: 14, color: 'black' }}>{stat.effort}</Text>
                                    </View>
                                </View>

                            )
                        }
                        )}
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {renderHeader()}
            {renderPokeInfo()}
            {renderAbilities()}
            {renderStats()}
        </View>
    )
}

export default DetailScreen