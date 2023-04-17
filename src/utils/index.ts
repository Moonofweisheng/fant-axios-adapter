/*
 * @Author: weisheng
 * @Date: 2023-04-17 17:27:26
 * @LastEditTime: 2023-04-17 18:08:08
 * @LastEditors: weisheng
 * @Description: 工具类
 * @FilePath: \fant-axios-adapter\src\utils\index.ts
 * 记得注释
 */

/**
 * 去除拼接url产生的多余的/
 * @param url 目标路径
 */
export function beautifyUrl(url: string) {
  return url.replaceAll('//', '/').replaceAll('https:/', 'https://').replaceAll('http:/', 'http://')
}

/**
 * 获取url参数
 * @param path 完整路径
 * @returns
 */
export function getParams(path: string) {
  const params: Map<string, string> = new Map()
  const pathArray: string[] = path.split('?') // 路径根据？拆分为2部分
  let paramString: string = '' // 参数字符串
  let paramArrary: string[] = [] // 参数数组
  if (pathArray.length > 1) {
    paramString = pathArray[1]
  }
  paramArrary = paramString.split('&')
  for (let index = 0; index < paramArrary.length; index++) {
    if (paramArrary[index].split('=').length === 2) {
      params.set(paramArrary[index].split('=')[0], paramArrary[index].split('=')[1])
    }
  }
  return params
}

/**
 * 设置参数
 * @param path 路径（无参数）
 * @param params （参数）
 * @returns
 */
export function setParams(path: string, params: Map<string, string>) {
  params.forEach((value: string, key: string) => {
    if (path.indexOf('?') > -1) {
      path = path + `&${key}=${value}`
    } else {
      path = path + `?${key}=${value}`
    }
  })
  return path
}
