import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const TouchableButton = ({ red, children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            margin: 20,
            height: 30,
            width: 120,
            borderRadius: 5,
            backgroundColor: red ? '#df1010' : '#007aff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{ color: '#fff' }}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default TouchableButton
