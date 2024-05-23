import axios from 'axios';

const BACKEND_URL = 'https://sweet-dreams-bc3b1-default-rtdb.firebaseio.com';

export async function fetchAllTales() {
    const tales = [];
    try {
        const response = await axios.get(`${BACKEND_URL}/tales.json`);
        for (let key of Object.keys(response.data)) {
            const tale = {
                id: key,
                title: response.data[key].title,
                audioUrl: response.data[key].audioUrl,
                imageUrl: response.data[key].imageUrl
            };
            tales.push(tale);
        }
        return tales;
    } catch(err) {
        throw new Error(err);
    }

}