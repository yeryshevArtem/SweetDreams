import { View, Text } from 'react-native';

function TaleDetail({ route }) {
    console.log(route.params)
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: isEditing ? 'Edit Expense' : 'Add Expense'
    //     });
    
    // }, [navigation, isEditing]);
    return (
        <View>
            <Text>Detail Page</Text>
        </View>
    );
}

export default TaleDetail;