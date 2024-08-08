import liudonghan from '@/utils/AxiosManagerUtils'

export function getShopApi() {
  return liudonghan
    .createAxiosServer()
    .baseApi('https://csapi1.xinfushenghuo.cn')
    .addLogcatInterceptors()
    .addParamsInterceptors(params => {
      return params
    })
    .addCodeInterceptors(code => {
      return code.data
    })
}

export function getLiveApi() {
  return liudonghan
    .createAxiosServer()
    .baseApi('https://zhibo.youdekan.me')
    .addHeaders({
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyRENCNzE2RTE3NzAzMjQxQjM5QzU4NTlCQjNDNDI5IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2OTA2MTE1NDIsImV4cCI6MTY5MTQ3NTU0MiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5sYXd4cC5jb20iLCJjbGllbnRfaWQiOiJhcHAiLCJzdWIiOiI3MThfaXN3ZWJvYTpUcnVlX2lzd2VzYWxlOkZhbHNlX2lzYWdlbnQ6RmFsc2UiLCJhdXRoX3RpbWUiOjE2OTA2MTE1NDIsImlkcCI6ImxvY2FsIiwiVXNlcklkIjoiMjEwMjk2MTExMCIsIm5hbWUiOiIxODY0NzQ5OTk5NiIsImdpdmVuX25hbWUiOiLliJjlhqzmtrUiLCJlbWFpbCI6ImxpdWRvbmdoYW5AbGF3eHAuY29tIiwianRpIjoiODUzRUM3QjEwOUQyRDhBNzNDQUI3RDZBNENDQ0ZBN0QiLCJpYXQiOjE2OTA2MTE1NDIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiY3VzdG9tIl19.VmeXtYBt_MkA-7O1E0tQ5EU6crAJJFJ4iYeZjJqgzUyr4hZp96_J9lmms8AhehlD8XP6QxVvOS2Do2ol0Lq_v3-Zo8rAK_ebJHIU5SxOtqG4TdUZaRnzSHHvyBiu3CZV8n5fBO9Iwp_vKyOZTyqExsVIlR2vcmGy9Ydbr9a5aHCVVGiaOlD_6o9uOWsInq_bTGMUIXvYtbXNVf3alX8mUTJahI6zJq4qMrWu-ZCttU2v9eYDk6ajfpWYOJxHwCZogt3q7VeH1PoB1ekthOzz5DzA3uPd_8_UENv0_gRmpjdt5uqVPERKESOOeWv8qMxmR_jeTG3FNTGESW-2TgoYHg'
    })
    .addLogcatInterceptors()
    .addParamsInterceptors(params => {
      return params
    })
    .addCodeInterceptors(code => {
      return code
    })
}

export function getFileApi() {
  return liudonghan
    .createBlobAxiosServer()
    .addHeaders({
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyRENCNzE2RTE3NzAzMjQxQjM5QzU4NTlCQjNDNDI5IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDMxMjMxODUsImV4cCI6MTcwMzk4NzE4NSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5sYXd4cC5jb20iLCJjbGllbnRfaWQiOiJjcm0iLCJzdWIiOiI1NzdfaXN3ZWJvYTpUcnVlX2lzd2VzYWxlOlRydWVfaXNhZ2VudDpGYWxzZSIsImF1dGhfdGltZSI6MTcwMzEyMzE4NSwiaWRwIjoibG9jYWwiLCJVc2VySWQiOiIyMTAyNzIxMzY2IiwibmFtZSI6Iua1i-ivlWxhdzMiLCJnaXZlbl9uYW1lIjoi5rWL6K-VbGF3Myjli7_liKApIiwiZW1haWwiOiI_RD8_Zz8_w6w_P2phP8OqYT_vv6UiLCJqdGkiOiIyMTgwMUY3RUYxNkFFQzFBRjkzMzIzMzFBN0U2QzA5OSIsImlhdCI6MTcwMzEyMzE4NSwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSJdLCJhbXIiOlsiY3VzdG9tIl19.Dk3wWZmjfX_gtAllNefs2DrczgzVyaNkM1dwA2yAhDerlkogzrCLJCHAdSInwX5ETIqgB6z_p8MmeZtVAYfcHG6PdPbY01-R2L7UJa23w71mdf7zH-nm6ibyqSacwKPWeuJNTA2mFm7dk05E5rcowDMAdlRTQO6MGWG9pi5ceHNQxPO7B1AUuVOtTel-7y2Z9o1QpyXQFV9ustE6Qv7yWyzkr6TBDkc4fbKVx7o3yuqSqQuP6bJ560CjSoAMRXfAMz3__rwHkGqwVD_zZRELeSqJFXHM4Jz_ZBkaSn3NzCAZACZPi4rXm6KcqC8yOlGqXP1SxEhUPByO9fJYFrJwOw'
    })
    .baseApi('https://api1.likewon.cn')
    .addLogcatInterceptors()
    .addBlobInterceptors()
}

export function getAmbApi() {
  return liudonghan
    .createAxiosServer()
    .baseApi('http://114.113.144.174:8089/')
    .addHeaders({
      'Authorization': ' Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyRENCNzE2RTE3NzAzMjQxQjM5QzU4NTlCQjNDNDI5IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MDMxMjMxODUsImV4cCI6MTcwMzk4NzE4NSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5sYXd4cC5jb20iLCJjbGllbnRfaWQiOiJjcm0iLCJzdWIiOiI1NzdfaXN3ZWJvYTpUcnVlX2lzd2VzYWxlOlRydWVfaXNhZ2VudDpGYWxzZSIsImF1dGhfdGltZSI6MTcwMzEyMzE4NSwiaWRwIjoibG9jYWwiLCJVc2VySWQiOiIyMTAyNzIxMzY2IiwibmFtZSI6Iua1i-ivlWxhdzMiLCJnaXZlbl9uYW1lIjoi5rWL6K-VbGF3Myjli7_liKApIiwiZW1haWwiOiI_RD8_Zz8_w6w_P2phP8OqYT_vv6UiLCJqdGkiOiIyMTgwMUY3RUYxNkFFQzFBRjkzMzIzMzFBN0U2QzA5OSIsImlhdCI6MTcwMzEyMzE4NSwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSJdLCJhbXIiOlsiY3VzdG9tIl19.Dk3wWZmjfX_gtAllNefs2DrczgzVyaNkM1dwA2yAhDerlkogzrCLJCHAdSInwX5ETIqgB6z_p8MmeZtVAYfcHG6PdPbY01-R2L7UJa23w71mdf7zH-nm6ibyqSacwKPWeuJNTA2mFm7dk05E5rcowDMAdlRTQO6MGWG9pi5ceHNQxPO7B1AUuVOtTel-7y2Z9o1QpyXQFV9ustE6Qv7yWyzkr6TBDkc4fbKVx7o3yuqSqQuP6bJ560CjSoAMRXfAMz3__rwHkGqwVD_zZRELeSqJFXHM4Jz_ZBkaSn3NzCAZACZPi4rXm6KcqC8yOlGqXP1SxEhUPByO9fJYFrJwOw'
    })
    .addLogcatInterceptors()
    .addCodeInterceptors(code => {
      switch (code.status) {
        case 200:
          switch (code.data.code) {
            case 200:
              return Promise.resolve(code.data)
            default:
              return Promise.reject({ code: code.data.code, message: code.data.message })
          }
        case 401:
          return Promise.reject({ code: 401, message: '登录过期' })
        default:
          return Promise.reject({ code: code.status, message: code })
      }
    })
}

function baseMyfService() {
  return liudonghan
    .createAxiosServer()
    .baseApi('https://uat-delivery-wlx.mengniu.cn/')
    .addHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Wlx-Client-Id': 'Please enter your Client Id',
      'Wlx-Ts': new Date().getTime().toString()
    })
    .transformRequestData((data, header) => {
      console.log('~~~~~~~转换请求数据', data);
      console.log('~~~~~~~转换请求头部', header)
      data.demo = '刘冬涵'
      header['demo'] = 'ssssssss'
      return data
    })
    .addLogcatInterceptors()
    .addParamsInterceptors(params => {
      return params
    })
    .addCodeInterceptors(
      code => {
        return code
      },
      error => {
        console.log(error.response)
        return error
      })
}

export function getAxiosManger() {
  return liudonghan.createAxiosServer()
}

export default {
  getAxiosManger,
  getShopApi,
  getLiveApi,
  getFileApi,
  getAmbApi,
  baseMyfService
}

