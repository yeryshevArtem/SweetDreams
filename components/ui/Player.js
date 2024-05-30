import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
// firebase
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/storage';
// ui
import Error from "./Error";
import Loading from "./Loading";
import IconButton from "./IconButton";
// constants 
import { GlobalStyles } from "../../constants/styles";
// utils
import { formatTime } from '../../util/time';

function Player({ imageUrl, audioUrl }) {
    // uri related state
    const [imgUri, setImgUri] = useState('');
    const [audioUri, setAudioUri] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    // audio related state
    const soundRef = useRef(null);
    const [sound, setSound] = useState(null);
    const [status, setStatus] = useState({
        isPlaying: false,
        durationMillis: 0,
        positionMillis: 0
    });

    // Firebase storage work
    useEffect(() => {
        const imgReference = ref(storage, imageUrl);
        const audioReference = ref(storage, audioUrl);

        // download image for player
        getDownloadURL(imgReference)
            .then((url) => {
                setImgUri(url);
            })
            .catch((error) => {
                setError(error);
            });

        // download audio for player
        getDownloadURL(audioReference)
            .then((url) => {
                setAudioUri(url);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);


    useEffect(() => {
        async function unloadAudio() {
            if (sound) {
                await sound.unloadAsync();
            } else {
                if (soundRef.current) {
                    await soundRef.current.unloadAsync();
                    soundRef.current = null;
                }
            }
        }

        if (audioUri) {
            loadAudio();

        }
        return () => {
            unloadAudio();
        }
    }, [audioUri]);



    async function loadAudio() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: audioUri },
            { shouldPlay: true },
            onPlaybackStatusUpdate

        );
        soundRef.current = sound;
        setSound(sound);

    }

    function onPlaybackStatusUpdate(playbackStatus) {
        if (playbackStatus.isLoaded) {
            setStatus({
                isPlaying: playbackStatus.isPlaying,
                durationMillis: playbackStatus.durationMillis,
                positionMillis: playbackStatus.positionMillis
            });
        }
    }

    async function handlePlayPause() {
        if (sound) {
            if (status.isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();

            }
        }
    };

    async function handleSliderChange(value) {
        if (sound) {
            try {
                await sound.setPositionAsync(value);
            } catch (err) {
                // https://stackoverflow.com/questions/63490637/methods-being-called-on-audio-sound-after-ive-unload-it-and-moved-screen/69601460#69601460
                console.log(err);
            }

        }
    }

    const playBack = () => { };

    const playForward = () => { };

    return (
        <View style={styles.container}>
            <View style={styles.imagePanel}>
                {
                    isFetching && <Loading />
                }
                {
                    imgUri && !isFetching && <Image source={{ uri: imgUri }} style={styles.image} />
                }
                {
                    error && !isFetching && <Error message="Cannot upload player logo." />
                }
                <Slider
                    style={styles.slider}
                    value={status.positionMillis}
                    maximumValue={status.durationMillis}
                    onValueChange={handleSliderChange}
                    minimumTrackTintColor={GlobalStyles.colors.primary3}
                    maximumTrackTintColor={GlobalStyles.colors.primary2}
                />
                <Text style={styles.timeline}>{formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}</Text>
                <View style={styles.controlPanel}>
                    <IconButton onPress={playBack} size={75} color={GlobalStyles.colors.primary3} icon="play-back-circle" />
                    <IconButton onPress={handlePlayPause} size={75} color={GlobalStyles.colors.primary3} icon={status.isPlaying ? "pause-circle" : "play-circle"} />
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
    slider: {
        marginTop: 50,
        width: 250,
        height: 40,
    },
    controlPanel: {
        flexDirection: 'row',
        marginVertical: 30
    },
    timeline: {
        color: GlobalStyles.colors.primary1
    }
})