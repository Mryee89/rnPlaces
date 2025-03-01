import React, { forwardRef } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import { fetchPlaces, setPlaces } from '../redux/slice';
import { Icon } from '@ant-design/react-native';

interface SearchBarProps {
    value: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onClear?: () => void;
    onChangeText: (text: string) => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(({ value, onChangeText, onFocus, onBlur, onClear }, ref) => {
    const dispatch = useAppDispatch();

    const handleSearch = (text: string) => {
        onChangeText(text);

        if (text.length === 0) {
            dispatch(setPlaces([])); // clear the place list if input is empty
            return;
        }

        if (text.length > 2) {
            dispatch(fetchPlaces(text));
        }
    };

    const handleClear = () => {
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
                    onChangeText={handleSearch}
                    style={styles.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {value.length > 0 && (
                    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                        <Icon name="close" size="sm" color="gray" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1, 
        borderColor: '#ccc',
        borderRadius: 8,
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
