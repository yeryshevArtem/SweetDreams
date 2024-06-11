import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
// ui
import Input from "../ui/Input";

function AuthForm() {
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

    return (
        <View style={styles.form}>
            <Input 
                labelText="Email Address" 
                value={email} 
                onChange={updateInputField.bind(this, 'email')}
            />
            <Input 
                labelText="Password" 
                value={password} 
                onChange={updateInputField.bind(this, 'password')}
            />
        </View>
    );  
}

export default AuthForm;

const styles = StyleSheet.create({
    form: {
       
    }
});