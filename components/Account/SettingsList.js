import { FlatList } from "react-native";
// components
import SettingItem from "./SettingItem";

function renderSettingsItem({ item }) {
	return (
		<SettingItem
			title={item.title}
			pressHandler={item.callbackFn}
			icon={item.icon}
		/>
	);
}

function SettingsList({ data }) {
	return (
		<FlatList
			data={data}
			renderItem={renderSettingsItem}
			keyExtractor={(item) => item.id}
		/>
	);
}

export default SettingsList;
