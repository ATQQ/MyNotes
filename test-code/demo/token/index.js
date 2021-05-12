class TokenUtil{
    createToken(user,timeout=60*60*12){
        const token ='方法生成一个唯一的'        
        this.map.set(token,user)   
    }
    constructor(){
        this.map = new Map()
        this.loop()
    }
    static getInstance(){
        if(!TokenUtil.instance){
            TokenUtil.instance = new TokenUtil()
        }
        return TokenUtil.instance
    }
}

export default TokenUtil.getInstance()