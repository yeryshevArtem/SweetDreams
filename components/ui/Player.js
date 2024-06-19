import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
import { Audio } from "expo-av";
// firebase
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/storage';
// ui
import Error from "./ErrorAlert";
import Loading from "./Loading";
import IconButton from "./IconButton";
import SeekBar from "./SeekBar";
// constants 
import { GlobalStyles } from "../../constants/styles";
import { templates } from "../../constants/templates";

function Player({ imageUrl, audioUrl, onPlayForward = () => {}, onPlayBack = () => {} }) {
    // uri related state
    const [imgUri, setImgUri] = useState('');
    const [audioUri, setAudioUri] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    // audio related state
    const soundRef = useRef(null);

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
    }, [imageUrl, audioUrl]);


    useEffect(() => {
        async function unloadAudio() {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
                soundRef.current = null;
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
        if (soundRef.current) {
            if (status.isPlaying) {
                await soundRef.current.pauseAsync();
            } else {
                await soundRef.current.playAsync();

            }
        }
    };

    async function handleSliderChange(value) {
        if (soundRef.current) {
            try {
                await soundRef.current.setPositionAsync(value);
            } catch (err) {
                // https://stackoverflow.com/questions/63490637/methods-being-called-on-audio-sound-after-ive-unload-it-and-moved-screen/69601460#69601460
                console.log(err);
            }

        }
    }

    const playBack = () => {
        onPlayBack();
    };

    const playForward = () => {
        onPlayForward();
    };

    return (
        <View style={styles.container}>
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
                    error && !isFetching && <Error message={templates.playerCoverError} />
                }
                <View style={styles.seekBarBox}>
                    <SeekBar
                        maxVal={status.durationMillis}
                        val={status.positionMillis}
                        onChange={handleSliderChange}
                    />
                </View>
                <View style={styles.buttonsBox}>
                    <IconButton onPress={playBack} size={75} color={GlobalStyles.colors.primary1} icon="play-back-circle" />
                    <IconButton onPress={handlePlayPause} size={75} color={GlobalStyles.colors.primary1} icon={status.isPlaying ? "pause-circle" : "play-circle"} />
                    <IconButton onPress={playForward} size={75} color={GlobalStyles.colors.primary1} icon="play-forward-circle" />
                </View>

            </View>

        </View>
    );
}

export default Player;

const styles = StyleSheet.create({
    container: {
        marginVertical: 25,
        alignItems: 'center',
        flex: 1
    },
    coverBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 5,
        resizeMode: 'contain'
    },
    seekBarBox: {
        flex: 2
    },
    buttonsBox: {
        flexDirection: 'row',
        flex: 6
    }
})