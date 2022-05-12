import axios from 'axios';


export default async (payload) => {
    try {
        
        const res = await axios.post('/api/tasks/', payload)
        console.log(res.data)
        return res.data;

    } catch (err) {
        console.log(err.message);
    }
}