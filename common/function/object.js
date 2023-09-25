/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 10:19:15
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-29 16:36:25
 * @FilePath: /smart-park/common/function/object.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { stringify } from "./string";

// export function createHashTable(list = [], key = "id") {
//     // 创建一个哈希表
//     const hashTable = {};
//     for (const element of list) {
//         hashTable[element[key]] = element;
//     }
//     return hashTable;
// }

//数据快照
export function dataSnapshot(data) {
    const snapshot = stringify(data);
    return (changeData) => snapshot === stringify(changeData);
}


/**
 * @description:
 * @param {array} list 待处理数据
 * @param {string} [key= "id"] 键值
 * @param {boolean} [integrate= false] 是否整合([整合数据,数据首项])
 * @return {*}
 */
export function createHashTable(list = [], key = "id", integrate = false) {
    // 创建一个哈希表
    const hashTable = {};
    if (key === true || typeof key === "function") {
        integrate = key;
        key = "id";
    }
    if (integrate) {
        const getValue = (() => {
            if (typeof integrate === "function") return integrate;
            return item => item;
        })();
        let first = [];
        //如果key或者integrate为true则开启整合
        for (const element of list) {
            if (hashTable[element[key]]) {
                hashTable[element[key]].push(getValue(element));
            } else {
                first.push(element);
                hashTable[element[key]] = [getValue(element)];
            }
        }
        return [hashTable, first];
    } else {
        for (const element of list) {
            hashTable[element[key]] = element;
        }
        return hashTable;
    }
}