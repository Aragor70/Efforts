import axios from 'axios';


export default async (payload) => {
    try {
        
        const res = await axios.put('/api/tasks/' + payload.id, payload)

        return res.data;

    } catch (err) {
        console.log(err.message);
    }
}