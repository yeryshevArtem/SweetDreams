import { StyleSheet, View } from 'react-native';
// ui
import Background from '../components/ui/Background';
// components
import SettingsList from '../components/Account/SettingsList';

const settingsOptions = [
    {
        id: 'accountDetails',
        title: 'Account Details',
        callbackFn: () => {
            console.log('Naviate to account details')
        },
        icon: "person"
    },
    { 
        id: 'support',
        title: 'Our customer care',
        callbackFn: () => {
            console.log('Write us')
        },
        icon: "chatbox"
    }
];

function Profile() {
    return (
        <Background style={styles.container}>
            <View style={styles.settingsListBox}>
                <SettingsList data={settingsOptions} />
            </View>

        </Background>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    settingsListBox: {
        marginTop:20
    }
});
