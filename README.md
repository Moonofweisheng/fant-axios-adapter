# fant-axios-adapter

#### 介绍
`fant-axios-adapter`用于帮助开发者在`uni-app`项目使用`axios`请求库，提供了使用`uni.request`发起网络请求的`axios`适配器。


#### 安装
`yarn add fant-axios-adapter -D`
或
`npm i fant-axios-adapter --save`


#### 安装axios  
`yarn add axios -D`
#### 使用
##### 配置axios拦截器
```ts
// http.ts
import axios from 'axios'
import { uniAdapter } from 'fant-axios-adapter'

axios.defaults.timeout = 60000
export default class ApiClient {
  public static server() {
    // 可以在这里拦截
    const baseURL = import.meta.env.VITE_BASEURL
    return ApiClient.create(baseURL)
  }

  public static create(baseURL: string) {
    const instance = axios.create({
      withCredentials: true,
      baseURL: baseURL,
      adapter: uniAdapter // 配置适配器
    })

    instance.interceptors.request.use(
      (request) => {
        return request
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    return instance
  }
}
```
##### 使用拦截器
```ts
// api.ts
    http
      .server()
      .post(
        '/login',
        {},
        {
          params: { a: 22 }
        }
      )
      .then((res) => {
        return res.data
      })
```
