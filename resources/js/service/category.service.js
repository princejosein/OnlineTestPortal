import axioshelper from '../helper/AxiosHelper'
import User from '../helper/User'

export const CategoryService = {
    getAll,
    getById
}

async function getAll() {
    try {
        const response = await axioshelper.get(`${process.env.MIX_VUE_APP_BASE_URL}category`);
        return {
            success:true,
            result:response.data,
        }
    } catch (error) {
        return {
            success:false,
            result:{},
            message:error.response.statusText
        }
    }
}
async function getById(cat_id) {
    try {
        const response = await axioshelper.get(`${process.env.MIX_VUE_APP_BASE_URL}category/${cat_id}`);
        return {
            success:true,
            result:response.data,
        }
    } catch (error) {
        return {
            success:false,
            result:{},
            message:error.response.statusText
        }
    }
}
