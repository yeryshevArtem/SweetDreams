import { useState, useEffect } from "react";
import { View, StyleSheet, Image } from 'react-native';
import { Audio } from "expo-av";
// firebase
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/storage';
// ui
import Error from "./Error";
import Loading from "./Loading";
import IconButton from "./IconButton";
// constants 
import { GlobalStyles } from "../../constants/styles";

function Player({ imageUrl, audioUrl }) {
    const [sound, setSound] = useState();
    const [imgUri, setImgUri] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);


    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/beauty-beast.mp3'));

        setSound(sound);

        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;

    }, [sound]);

    useEffect(() => {
        const imgReference = ref(storage, imageUrl);

        getDownloadURL(imgReference)
            .then((url) => {
                setIsFetching(false);
                setImgUri(url);
            })
            .catch((error) => {
                setIsFetching(false);
                setError(error);
            });
    }, [imageUrl]);

    const playBack = () => {};

    const playForward = () => {};

    return (
        <View style={styles.container}>
            <View style={styles.imagePanel}>
                {
                    isFetching && <Loading />
                }
                {
                    imgUri && <Image source={{ uri: imgUri }} style={styles.image} />
                }
                {
                    error && !isFetching && <Error message="Cannot upload player logo." />
                }
                <View style={styles.controlPanel}>
                    <IconButton onPress={playBack} size={75} color={GlobalStyles.colors.primary3} icon="play-back-circle" />
                    <IconButton onPress={playSound} size={75} color={GlobalStyles.colors.primary3} icon="play-circle" />
                    <IconButton onPress={playForward} size={75} color={GlobalStyles.colors.primary3} icon="play-forward-circle" />
                </View>
            </View>

        </View>
    );
}

export default Player;

const styles = StyleSheet.create({
    container: {
        marginVertical: 25,
        alignItems: 'center'
    },
    imagePanel: {
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 5
    },
    controlPanel: {
        flexDirection: 'row',
        marginVertical: 30
    }
})