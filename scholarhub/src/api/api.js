import service from "./service";
// 登陆
export function Login(data) {
    return service({
        method: 'post',
        url: '/user/login',
        data
    })
}
// 注册
export function Register(data) {
    return service({
        method: 'post',
        url: '/user/register',
        data
    })
}

// 关注学者
export function FollowAuthor(data, token) {
    return service({
        method: 'post',
        url: '/user/follow_author',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 申请成为学者
export function ApplyAuthor(data, token) {
    return service({
        method: 'post',
        url: '/user/apply_author',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 发送验证码
export function SendCode(data, token) {
    return service({
        method: 'post',
        url: '/user/send_code',
        data
    })
}
// 确认验证码
export function VerifyCode(data, token) {
    return service({
        method: 'post',
        url: '/user/verify_code',
        data
    })
}

// 申请成为管理员
export function ApplyAdmin(data, token) {
    return service({
        method: 'post',
        url: '/user/apply_admin',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 认领学术成果
export function ApplyWork(data, token) {
    return service({
        method: 'post',
        url: '/user/apply_work',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 查询处理结果
export function GetApplyResults(token) {
    return service({
        method: 'get',
        url: '/user/apply_work',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 获取关注学者列表
export function ShowFollowAuthor(token) {
    return service({
        method: 'get',
        url: '/user/show_follow_author',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 查看浏览历史
export function ShowBrowseHistory(token) {
    return service({
        method: 'get',
        url: '/user/show_browse_history',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}


// 检索相关
export function FuzzySearch(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/academia/fuzzysearch',
        data
    })
}

export function ExactSearch(data) {
    data = JSON.stringify(data)
    console.log(data)
    return service({
        method: 'post',
        url: '/academia/basicsearch',
        data
    })
}

export function MultiSearch(data) {
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/academia/multisearch',
        data
    })
}

// 获取论文详细信息
export function GetPaper(param) {
    return service({
        method: 'get',
        url: `/academia/get_paper`,
        params: {
            'paper_id': param
        }
    })
}
// 收藏学术成果
export function FavoritePaper(data, token) {
    return service({
        method: 'post',
        url: '/academia/favorite_paper',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 学者检索
export function AuthorSearch(data) {
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/academia/authorsearch',
        data
    })
}

export function AuthorFuzzySearch(data) {
    data = JSON.stringify(data)
    return service({
        method: 'post',
        url: '/academia/authorfuzzysearch',
        data
    })
}
// 获取收藏学术成功列表
export function ShowFavorites(token) {
    return service({
        method: 'get',
        url: '/academia/show_favorites',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 展示热门成果
export function ShowHot(token) {
    return service({
        method: 'get',
        url: '/message/show_hot',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}


// 查看学者申请
export function ShowAuthorMessage(token) {
    return service({
        method: 'get',
        url: '/Administrator/show_author_message',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}


// 获得论文认领申请
export function ShowPaperMessage(token) {
    return service({
        method: 'get',
        url: '/Administrator/show_paper_message',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 处理学者申请
export function HandleAuthorMessage(data, token) {
    return service({
        method: 'post',
        url: '/Administrator/handle_author_message',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 处理成果申请
export function HandlePaperMessage(data, token) {
    return service({
        method: 'post',
        url: '/Administrator/handle_paper_message',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 查看单个学者申请详情
export function GetSpecificAuthorApply(data, token) {
    return service({
        method: 'post',
        url: '/Administrator/get_specific_author_apply',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}



// 获取浏览记录
export function GetWorkList(token) {
    return service({
        method: 'get',
        url: '/browhistory/get_work_list',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 添加浏览记录
export function AddBrowHistory(data, token) {
    return service({
        method: 'post',
        url: '/browhistory/add_brow_history',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 删除浏览记录
export function DeleteBrowHistory(data, token) {
    return service({
        method: 'post',
        url: '/browhistory/delete_brow_history',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}

// 删除所有浏览记录
export function DeleteAllBrowHistory(data, token) {
    return service({
        method: 'post',
        url: '/browhistory/delete_all_brow_history',
        data,
        headers: {
            'Authorization': `Token ${token}`
        }
    })
}