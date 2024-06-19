import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
// firebase
import { storage } from '../../firebase/storage';
// ui
import Loading from '../ui/Loading';
import Error from '../ui/ErrorAlert';
// constants
import { GlobalStyles } from '../../constants/styles';
import { templates } from '../../constants/templates';

function TaleItem({ title, imageUrl, id }) {
    const [imgUri, setImgUri] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const imgReference = ref(storage, imageUrl);

        getDownloadURL(imgReference)
            .then((url) => {
                setImgUri(url);
            })
            .catch((error) => {
                setIsFetching(false);
                setError(error);
            });
    }, [imageUrl]);


    const talePressHandler = () => {
        navigation.navigate('TaleDetail', { taleId: id });
    };

    return (
        <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={talePressHandler}>
            <View style={styles.coverBox}>
                {
                    isFetching && <Loading />
                }
                {
                    imgUri && (
                        <Image 
                            source={{ uri: imgUri }} 
                            style={styles.image} 
                            onLoadStart={() => setIsFetching(true)}
                            onLoadEnd={() => setIsFetching(false)}
                        />
                    )
                }
                {
                    error && !isFetching && <Error message={templates.taleImageError} />
                }
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default TaleItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    coverBox: {
        flex: 1
    },
    titleBox: {
        flex: 1,
        marginVertical: 10,
        width: 150
    },
    title: {
        color: GlobalStyles.colors.primary1,
        fontSize: 15,
        fontWeight: '700'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10
    }
});