/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-14 12:36:54
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-14 12:41:59
 * @FilePath: /smart-park/api/file.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const http = uni.$u.http;
import config from "@/common/config";

export const UpdateFilePath = "/api/mongoFile/Uploader/annexpic";

export const getFileDownloadUrl = url =>
    http.get(`api/mongoFile/Download/annex/${config.tenantId}/${url}`);