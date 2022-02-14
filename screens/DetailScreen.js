import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const DetailScreen = ({ route, navigation }) => {

    const { name, url, id } = route.params;
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return (
        <View style={{ marginTop: 40 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{

                }}
            >
                <Text>Go back</Text>
            </TouchableOpacity>
            <Text>{name}</Text>
            <Text>{url}</Text>
            <Text>{id}</Text>
            <Image source={{ uri: imageURL }} style={{ width: 100, height: 100 }} />
        </View>
    )
}

export default DetailScreen