import axios from 'axios';


export default async (id) => {
    try {
        const options = {
            params: {
                id
            }
        }
        
        const res = await axios.delete('/api/tasks/' + id)
        console.log(res.data)
        return res.data;

    } catch (err) {
        console.log(err.message);
    }
}