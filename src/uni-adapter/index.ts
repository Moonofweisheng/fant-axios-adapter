/*
 * @Author: weisheng
 * @Date: 2023-04-17 14:09:39
 * @LastEditTime: 2023-04-20 16:38:47
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
    let url: string = beautifyUrl(`${config.baseURL || ''}/${config.url || ''}`)
    url = setParams(url, new Map(Object.entries(params)))
    const requestOptions: UniNamespace.RequestOptions = {
      method:
        config.method !== undefined
          ? (config.method!.toUpperCase() as 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT')
          : undefined,
      url: url,
      header: { ...config.headers },
      timeout: config.timeout,
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
          status: (res as any).statusCode,
          statusText: res.errMsg || '',
          config: config
        }
        reject(response)
      }
    }
    let requestTask: UniApp.RequestTask | null = uni.request(requestOptions)
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!requestTask) {
          return
        }
        // 取消请求
        requestTask.abort()
        reject(cancel)
        requestTask = null
      })
    }
  })
}
