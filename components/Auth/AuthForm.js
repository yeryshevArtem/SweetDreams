import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// ui
import Input from "../ui/Input";
import Button from '../ui/Button';
// constants 
import { templates } from '../../constants/templates';

function AuthForm({ onSubmit, isLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function updateInputField(type, value) {
        switch(type) {
            case 'email': {
                setEmail(value);
                break;
            }
            case 'password': {
                setPassword(value);
                break;
            }
        }
    }

    function confirmHandler() {
        onSubmit({
            email, 
            password
        });
    }

    return (
        <View style={styles.form}>
            <Input 
                labelText="Email Address" 
                value={email} 
                onChange={updateInputField.bind(this, 'email')}
                keyboardType="email-address"
            />
            <Input 
                labelText="Password" 
                value={password} 
                onChange={updateInputField.bind(this, 'password')}
                secure
            />
            <View style={styles.buttonsBox}>
                <Button onPress={confirmHandler}>
                    { isLogin ? templates.login : templates.signUp }
                </Button>
            </View>
        </View>
    );  
}

export default AuthForm;

const styles = StyleSheet.create({
    form: {
       
    },
    buttonsBox: {
        marginVertical: 40
    }
});