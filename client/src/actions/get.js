import axios from 'axios';


export const getAll = async (payload = null) => {
    try {

        const options = {
            params: {
                ...payload
            }
        }
        
        const res = await axios.get('/api/tasks/', options)
        console.log(res.data)
        return res.data;

    } catch (err) {
        console.log(err.message);
    }
}
export const getOneById = async (dispatch) => {
    try {

        const { payload } = dispatch;

        const options = {
            params: {
                id: payload.id
            }
        }
        
        const res = await axios.get('/api/tasks', options)

        return res.data;

    } catch (err) {
        console.log(err.message);
    }
}