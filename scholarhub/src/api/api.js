import service from "./service";

export function Login(data){
    return service({
        method:'post',
        url:'/user/login',
        data
    })
}

//获取学术成果详细
export function get_paper(paper_id) {
    return service({
        method: 'get',
        url: '/academia/get_paper',
        params: {
            paper_id
        }
    })
}