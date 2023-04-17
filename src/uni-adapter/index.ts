/*
 * @Author: weisheng
 * @Date: 2023-04-17 14:09:39
 * @LastEditTime: 2023-04-17 19:50:45
 * @LastEditors: weisheng
 * @Description: 基于uni-app实现的axios适配器
 * @FilePath: \fant-axios-adapter\src\uni-adapter\index.ts
 * 记得注释
 */
import { beautifyUrl, setParams } from '../utils/index'
import { AxiosPromise, AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'

export const uniAdapter = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const params = typeof config.params === 'object' ? config.params : {}
    let url: string = beautifyUrl((config.baseURL || '') + (config.url || ''))
    url = setParams(url, new Map(Object.entries(params)))
    const requestOptions: UniNamespace.RequestOptions = {
      method:
        config.method !== undefined
          ? (config.method!.toUpperCase() as 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT')
          : undefined,
      url: url,
      header: config.headers,
      data: config.data || {},
      success(res) {
        const response: any = {
          data: res.data,
          status: res.statusCode,
          headers: res.header as RawAxiosResponseHeaders | AxiosResponseHeaders,
          config: config
        }
        if (res.statusCode == 0 || res.statusCode == 200) {
          resolve(response)
        } else {
          reject(response)
        }
      },
      fail(res) {
        const response: any = {
          ...res,
          statusText: res.errMsg || '',
          config: config
        }
        reject(response)
      }
    }
    uni.request(requestOptions)
  })
}
