import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { formatTime } from '../../util/time';
import { GlobalStyles } from '../../constants/styles';

function SeekBar({ maxVal, val, onChange}) {
    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                value={val}
                maximumValue={maxVal}
                onValueChange={onChange}
                minimumTrackTintColor={GlobalStyles.colors.primary1}
                maximumTrackTintColor={GlobalStyles.colors.primary2}
            />
            <Text style={styles.timeline}>{formatTime(val)} / {formatTime(maxVal)}</Text>
        </View>
    );
}

export default SeekBar;

const styles = StyleSheet.create({
    container: {
        marginVertical: 25
    },
    timeline: {
        color: GlobalStyles.colors.primary1,
        textAlign: 'center'
    },
    slider: {
        width: 250,
        height: 40,
    }
});