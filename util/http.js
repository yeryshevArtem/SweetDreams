import axios from 'axios';
import { API_DOMAIN, AUTH_DOMAIN, WEB_API_KEY } from '../firebase/config';

export async function fetchAllTales(token) {
    const tales = [];
    try {
        const response = await axios.get(`${API_DOMAIN}/tales.json?auth=${token}`);
        for (let key of Object.keys(response.data)) {
            const tale = {
                id: key,
                title: response.data[key].title,
                audioUrl: response.data[key].audioUrl,
                imageUrl: response.data[key].imageUrl,
                liked: response.data[key].liked
            };
            tales.push(tale);
        }
        return tales;
    } catch (err) {
        throw new Error(err);
    }

}

export async function updateTale({ id, data, token }) {
    try {
        const response = await axios.patch(`${API_DOMAIN}/tales/${id}.json?auth=${token}`, data);
        return {
            id,
            ...response.data
        };
    } catch (err) {
        throw new Error(err);
    }
}

export async function authorize({ email, password, mode }) {
    // method - signUp
    try {
        const response = await axios.post(`${AUTH_DOMAIN}/v1/accounts:${mode}?key=${WEB_API_KEY}`, {
            email,
            password,
            returnSecureToken: true
        });
        const token = response.data.idToken;

        return token;
    } catch (err) {
        throw new Error(err);
    }
}