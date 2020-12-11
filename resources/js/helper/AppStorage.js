import axioshelper from './AxiosHelper'
class AppStorage {
    setToken(token){
        localStorage.setItem('token', token);
        axioshelper.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setUser(user){
        localStorage.setItem('user',JSON.stringify(user));
    }
    store(token,user){
        this.setToken(token);
        this.setUser(user);
    }
    clear(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //Remove authorization header
        delete axioshelper.defaults.headers.common['Authorization']
    }
    getToken() {
        return localStorage.getItem('token');
    }
    getUser() {
        console.log('getUser')
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default AppStorage = new AppStorage();
