import request from '@/utils/request'

export function login(data) {

}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`,
  method: 'GET'
})

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
export function logout() {

}
