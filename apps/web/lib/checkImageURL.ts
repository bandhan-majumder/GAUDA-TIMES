import axios from 'axios';

export async function checkImage(url: string): Promise<boolean> {
    try {
        const response = await axios.head(url);
        return response.status === 200;
    } catch (error) {
        return false;
    }
}
