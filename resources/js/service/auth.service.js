import axioshelper from '../helper/AxiosHelper'
import User from '../helper/User';

export const AuthService = {
    login,
    register,
    logout,
    isLoggedIn,
    getUser,
    me
}
// process.env.MIX_VUE_APP_BASE_URL
async function login(data) {
    this.logout();
    try {
        const response = await axioshelper.post(`${process.env.MIX_VUE_APP_BASE_URL}auth/login`, data);
        if(User.responseAfterLogin(response.data)) {
            return {
                success:true,
                result:response.data
            }
        } else {
            return {
                success:false,
                result:{},
                message:'Token Error'
            }
        }
    } catch (error) {
        return {
            success:false,
            result:{},
            message:'Email or Password error'
        }
    }
}
// checking the tokens validity with server
async function me() {
    try {
        const response = await axioshelper.post(`${process.env.MIX_VUE_APP_BASE_URL}auth/me`)
        console.log('user',response.data)
        return true;
    } catch (error) {
        return false;
    }
}

async function register(data) {
    this.logout();
    try {
        const response = await axioshelper.post(`${process.env.MIX_VUE_APP_BASE_URL}auth/register`, data);
        if(User.responseAfterLogin(response.data)) {
            return {
                success:true,
                result:response.data
            }
        } else {
            return {
                success:false,
                result:{},
                message:'Token Error'
            }
        }
    } catch (error) {
        return handleError(error);
    }
}

function logout() {
    User.logout();
}

function isLoggedIn()
{
    return User.loggedIn();
}

function getUser()
{
    return User.user();
}

function handleResponse(response) {


}

function handleError(error) {
    console.log(error.response.statusText)
    let errorMessage = error.response.statusText
    let formError = {}
    if(error.response.status == 422 && typeof error.response.data == "object" && error.response.data)
    {
        errorMessage = 'Validation Error';
        formError = error.response.data.errors;
    }
    return {
        success:false,
        result:{},
        message:errorMessage,
        formError:formError
    }
}
