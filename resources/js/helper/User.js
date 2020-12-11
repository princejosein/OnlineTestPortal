import Token from './Token'
import AppStorage from './AppStorage'
// import axioshelper from './AxiosHelper'
class User{
    responseAfterLogin(res) {
        const access_token = res.access_token;
        const user = res.user;
        if(Token.isValid(access_token))
        {
            AppStorage.store(access_token,user);
            //Update header in axios
            return true;
        }
        return false;
    }

    hasToken()
    {
        const token = AppStorage.getToken();
        if(token)
        {
            if(Token.isValid(token)){
                return true;
            }
        }
        return false;
    }

    loggedIn()
    {
        return this.hasToken();
    }

    logout()
    {
        AppStorage.clear();
    }

    user() {
        if(this.loggedIn){
            return AppStorage.getUser();
        }
    }
    admin() {
        const user = this.user();
        return user.is_admin ? true : false;
    }
    own(user_id) {
        const user = this.user();
        return user.is_admin === user_id ? true : false;
    }
}

export default User = new User();
