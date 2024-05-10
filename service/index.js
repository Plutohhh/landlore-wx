const BASE_URL = "http://127.0.0.1:5000"

// class Request {
function request(url, method, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            method: method,
            data: params,
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data.data)
                } else {
                    reject(res.data.msg)
                }
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
// }
// const request = new Request()
export default request