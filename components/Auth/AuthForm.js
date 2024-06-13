import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
// ui
import Input from "../ui/Input";
import Button from '../ui/Button';
// constants 
import { templates } from '../../constants/templates';

const validationRules = {
    email: {
        minLength: {
            value: 10,
            message: 'Email must be at least 10 characters long'
        },
        maxLength: {
            value: 50,
            message: 'Email cannot contain more than 50 characters'
        },
        required: {
            value: true,
            message: 'Email is required',
        },
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address'
        }
    },
    password: {
        maxLength: {
            value: 20,
            message: 'Password cannot contain more than 20 characters'
        },
        required: {
            value: true,
            message: 'Password is required'
        },
        minLength: {
            value: 10,
            message: 'Email must be at least 10 characters long'
        }
    }
};

function AuthForm({ onSubmit, isLogin }) {
    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    function confirmHandler({ email, password }) {
        onSubmit({
            email,
            password
        });
    }

    return (
        <View style={styles.form}>
            <Controller
                control={control}
                rules={validationRules.email}
                render={({ field: { onChange, value } }) => (
                    <Input
                        labelText="Email Address"
                        value={value}
                        onChange={onChange}
                        keyboardType="email-address"
                    />
                )}
                name="email"
            />
            {errors.email && <Text>{errors.email.message}</Text>}
            <Controller
                control={control}
                rules={validationRules.password}
                render={({ field: { onChange, value } }) => (
                    <Input
                        labelText="Password"
                        value={value}
                        onChange={onChange}
                        secure
                    />
                )}
                name="password"
            />
            {errors.password && <Text>{errors.password.message}</Text>}
            <View style={styles.buttonsBox}>
                <Button onPress={handleSubmit(confirmHandler)}>
                    {isLogin ? templates.login : templates.signUp}
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