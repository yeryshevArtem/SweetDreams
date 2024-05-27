import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/storage';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import { GlobalStyles } from '../../constants/styles';

function TaleItem({ title, imageUrl }) {
    const [imgUri, setImgUri] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const imgReference = ref(storage, imageUrl);
        setIsFetching(true);

        getDownloadURL(imgReference)
            .then((url) => {
                setIsFetching(false);
                setImgUri(url);
            })
            .catch((error) => {
                setIsFetching(false);
                setError(error);
            });
    }, [imageUrl, title]);

    return (
        <View style={styles.container}>
            {
                isFetching && <Loading />
            }
            {
                imgUri && <Image source={{ uri: imgUri }} style={styles.image} />
            }
            {
                error && !isFetching && <Error message="Cannot upload tale image."/>
            }
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
        </View>
    );
}

export default TaleItem;

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 200,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    titleBox: {
        marginVertical: 10,

    },
    titleText: {
        color: GlobalStyles.colors.primary1
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10
    }
});