import axios from 'axios';

export const deleteData = async (endpoint) => {
    const c = confirm('Are you sure to delete this data?');
    if (!c) return false;

    try {
        const response = await axios.delete(endpoint, { withCredentials: true });

        return true;
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        return false;
    }
};
