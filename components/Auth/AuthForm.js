import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
// ui
import Input from '../ui/form/Input';
import Button from '../ui/Button';
import ErrorMessage from '../ui/form/ErrorMessage';
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
            value: 7,
            message: 'Email must be at least 7 characters long'
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
                        hasError={errors && errors.email && errors.email.message}
                    />
                )}
                name="email"
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            <Controller
                control={control}
                rules={validationRules.password}
                render={({ field: { onChange, value } }) => (
                    <Input
                        labelText="Password"
                        value={value}
                        onChange={onChange}
                        secure
                        hasError={errors && errors.password && errors.password.message}
                    />
                )}
                name="password"
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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