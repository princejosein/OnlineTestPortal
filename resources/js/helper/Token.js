class Token {
    isValid(token) {
        const payload = this.payload(token);
        if(payload){
            const fromCheck = payload.iss === `${process.env.MIX_VUE_APP_BASE_URL}auth/login` || `${process.env.MIX_VUE_APP_BASE_URL}auth/register` ? true : false;
            // Seconds
            const expCheck = new Date().getTime() / 1000 < payload.exp;
            //call refresh token - expcheck
            return fromCheck && expCheck
        }
        return false;
    }
    payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }
    decode(payload) {
        return JSON.parse(atob(payload));
    }
}

export default Token = new Token();
