import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
// ui
import Input from "../ui/Form/Input";
import { Button } from "react-native-paper";
// constants
import { locale } from "../../constants/locale";

const validationRules = {
	email: {
		minLength: {
			value: 10,
			message: locale.emailValidationErrorMinLength,
		},
		maxLength: {
			value: 50,
			message: locale.emailValidationErrorMaxLength,
		},
		required: {
			value: true,
			message: locale.emailValidationErrorRequired,
		},
		pattern: {
			value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			message: locale.emailValidationErrorInvalidFormat,
		},
	},
	password: {
		maxLength: {
			value: 20,
			message: locale.passwordValidationErrorMaxLength,
		},
		required: {
			value: true,
			message: locale.passwordValidationErrorRequired,
		},
		minLength: {
			value: 7,
			message: locale.passwordValidationErrorMinLength,
		},
	},
};

function AuthForm({ onSubmit, isLogin }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function confirmHandler({ email, password }) {
		onSubmit({
			email,
			password,
		});
	}

	return (
		<View style={styles.form}>
			<Controller
				control={control}
				rules={validationRules.email}
				render={({ field: { onChange, value } }) => (
					<Input
						labelText={locale.emailInputFieldLabel}
						value={value}
						onChange={onChange}
						keyboardType="email-address"
						error={errors && errors.email && errors.email.message}
					/>
				)}
				name="email"
			/>
			<Controller
				control={control}
				rules={validationRules.password}
				render={({ field: { onChange, value } }) => (
					<Input
						labelText={locale.passwordInputFieldLabel}
						value={value}
						onChange={onChange}
						secure
						error={errors && errors.password && errors.password.message}
					/>
				)}
				name="password"
			/>
			<View style={styles.buttonsBox}>
				<Button mode="contained" onPress={handleSubmit(confirmHandler)}>
					{isLogin ? locale.login : locale.signUp}
				</Button>
			</View>
		</View>
	);
}

export default AuthForm;

const styles = StyleSheet.create({
	form: {},
	buttonsBox: {
		marginVertical: 15,
	},
});
