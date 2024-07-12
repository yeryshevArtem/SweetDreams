import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
// firebase
import { storage } from "../../firebase/storage";
// ui
import Loading from "../ui/Loading";
import Alert from "../ui/Alert";
import Badge from "../ui/Badge";
// constants
import { locale, enums } from "../../constants/locale";

function TaleItem({ title, imageUrl, id }) {
	const [imgUri, setImgUri] = useState("");
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);

	const navigation = useNavigation();

	useEffect(() => {
		const imgReference = ref(storage, imageUrl);

		getDownloadURL(imgReference)
			.then((url) => {
				setImgUri(url);
			})
			.catch((error) => {
				setIsFetching(false);
				setError(error);
			});
	}, [imageUrl]);

	const talePressHandler = () => {
		navigation.navigate("TaleDetail", { taleId: id });
	};

	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			onPress={talePressHandler}
		>
			<View style={styles.imageContainer}>
				{isFetching && <Loading />}
				{imgUri && (
					<Image
						source={{ uri: imgUri }}
						style={styles.image}
						onLoadStart={() => setIsFetching(true)}
						onLoadEnd={() => setIsFetching(false)}
					/>
				)}
				{error && !isFetching && (
					<Alert
						message={locale.taleImageError}
						width={150}
						height={150}
						type={enums.alertTypes.ERROR}
						contentSize={17}
					/>
				)}
			</View>
			<View style={styles.titleBox}>
				<Badge>{title}</Badge>
			</View>
		</Pressable>
	);
}

export default TaleItem;

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.75,
	},
	container: {
		flex: 1,
		marginHorizontal: 10,
	},
	imageContainer: {
		maxHeight: 150,
		maxWidth: 150,
		width: 150,
		height: 150,
		flex: 1,
		alignItems: "center",
	},
	titleBox: {
		flex: 1,
		marginVertical: 10,
		width: 150,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 10,
	},
});
