import React, { forwardRef } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import { fetchPlaces, setPlaces } from '../redux/slice';
import { AntDesign } from '@expo/vector-icons'; 

interface SearchBarProps {
    value: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onClear?: () => void;
    onChangeText: (text: string) => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(({ value, onBlur, onFocus, onClear, onChangeText}, ref) => {
    const dispatch = useAppDispatch();

    const handleSearchText = (text: string) => {
        onChangeText(text);

        if (text.length === 0) {
            dispatch(setPlaces([])); // clear the place list if input is empty
            return;
        }

        if (text.length > 2) {
            dispatch(fetchPlaces(text));
        }
    };

    const handleClearText = () => {
        onChangeText('');
        dispatch(setPlaces([]));
        onClear?.();
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={ref}
                    placeholder="Search places..."
                    value={value}
                    onChangeText={handleSearchText}
                    style={styles.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {value.length > 0 && (
                    <TouchableOpacity onPress={handleClearText} style={styles.clearButton}>
                        {/* <Icon name="close" color="gray" span={1}/> */}
                        <AntDesign name="close" size={15} color="red" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        borderWidth: 1, 
        borderRadius: 8,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
    },
});

export default SearchBar;
