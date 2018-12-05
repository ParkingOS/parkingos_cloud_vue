import request from './request'

export function getTableQuery($url,$sform) {
    return request({
        url: $url,
        method: 'post',
        params:$sform
    })

}
export function delTableData($url,$sform) {
    return request({
        url: $url,
        method: 'post',
        params:$sform,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })

}
export function editTableData($url,$sform) {
    return request({
        url: $url,
        method: 'post',
        params:$sform,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}
export function addTableData($url,$sform) {
    return request({
        url: $url,
        method: 'post',
        params:$sform,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

export function getPayState($url,$sform) {
    return request({
        url: $url,
        method: 'get',
        params:$sform,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}