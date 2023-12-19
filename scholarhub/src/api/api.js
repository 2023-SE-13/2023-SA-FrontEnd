import service from "./service";

export function Login(data){
    return service({
        method:'post',
        url:'/user/login',
        data
    })
}