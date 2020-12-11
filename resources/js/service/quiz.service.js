import axioshelper from '../helper/AxiosHelper'

export const QuizService = {
    featuredQuiz,
    searchQuiz
}

async function featuredQuiz() {
    try {
        const response = await axioshelper.get(`${process.env.MIX_VUE_APP_BASE_URL}quiz`)
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

async function searchQuiz(searchParams) {
    try {
        const response = await axioshelper.get(`${process.env.MIX_VUE_APP_BASE_URL}quiz`,{
            params:searchParams
        })
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

