import axios from 'axios'
export function request (config) {
  var instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1',
    timeout: 10000
  })
  instance.interceptors.request.use(config => {
    return config
  }, (err) => {
    console.log(err)
    return err
  })
  instance.interceptors.response.use(res => {
    return res
  }, (err) => {
    return err
  })
  return instance(config)
}
