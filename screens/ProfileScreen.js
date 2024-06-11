import { StyleSheet, View, Linking, Alert } from 'react-native';
// ui
import Background from '../components/ui/Background';
// components
import SettingsList from '../components/Account/SettingsList';
// constants
import { templates } from '../constants/templates';

const settingsOptions = [
    {
        id: 'accountDetails',
        title: 'Account Details',
        callbackFn: () => {
            console.log('Naviate to account details');
        },
        icon: "person"
    },
    { 
        id: 'support',
        title: 'Our customer care',
        callbackFn: () => {
            const email = templates.supportEmail;
            const subject = templates.supportSubject;
            const body = templates.supportBody;
        
            const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
            Linking.openURL(url).catch((err) => Alert.alert(templates.supportErrorTitle, templates.supportErrorBody));
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
        marginTop: 20
    }
});
