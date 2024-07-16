import { List } from "react-native-paper";
// components
import SettingItem from "./SettingItem";

function SettingsList({ data }) {
	return (
		<List.Section>
			{data.map((item) => {
				return (
					<SettingItem
						key={item.id}
						title={item.title}
						pressHandler={item.callbackFn}
						icon={item.icon}
						id={item.id}
					/>
				);
			})}
		</List.Section>
	);
}

export default SettingsList;
