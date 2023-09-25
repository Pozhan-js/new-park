/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-08 14:33:39
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-22 16:35:52
 * @FilePath: /smart-park/store/module/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { getModelList } from '@/api/index'
import helper from '@/common/helper'
const state = {
    banner: [], // 轮播图
    notice: [], // 小区公告
    activities: [] //小区活动
}

const actions = {
    // 获取轮播图
    async getBanner({ commit }, config = {}) {
        const { data } = await getModelList('64c9b7579673175b8828996c', config)
        commit('GET_BANNER', data)
    },

    // // 获取小区公告数据
    // async getNotice({ commit }, config = {}) {
    //     const { data } = await getModelList('64d2f5525d3fa95536f04c02', config)
    //     commit('GET_NOTICE', data)
    // },

    // 获取小区活动数据
    async getActivity({ commit }, config = {}) {
        const { data } = await getModelList('64d48b955d3fa95536f04cb4', config)
        commit('GET_ACTIVITY', data)
    }


}

const mutations = {
    // 轮播图
    GET_BANNER(state, data) {
        // console.log("mutations", data);
        state.banner = data.list
        // console.log("state", state.banner);
    },
    // GET_NOTICE(state, data) {
    //     // console.log("mutations", data);
    //     state.notice = data.list
    //     // console.log("state", state.notice);
    // },
    GET_ACTIVITY(state, data) {
        // console.log("mutations", data);
        state.activities = data.list
    }
}

const getters = {
    // 轮播图数据重新处理
    newBanner(state) {
        return state.banner.map(item => {
            return {
                url: helper.filterCover(item.banner[0].url),
                image: item.banner[0].name,
                id: item.banner[0].fileId
            }
        }) || []
    },
    // 公告数据重新处理
    // newNotice(state) {
    //     return state.notice.reverse.map(item => {
    //         return {
    //             title: item.title,
    //             image: helper.filterCover(item.cover_picture[0].url),
    //             imageCover: helper.filterCover(item['cover_picture_2']||item['cover_picture_2']),
    //             read_num: item.reade_num,
    //             content: item.announcement_details,
    //             id: item._id,
    //             top: item.is_top,
    //             name: item.publisher,
    //             time: item?.activity_time||[]
    //         }
    //     }) || []
    // },
    // 小区活动数据重新处理
    newActivities(state) {
        return state.activities.map((item) => {
            return {
                ...item,
                id: item._id,
                image: helper.filterCover(item.activity_image[0].url),
                address: item.activity_address.address,
                activity_apply_start: uni.$u.date(item.activity_apply_start),
                activity_hold_date: uni.$u.date(item.activity_hold_date)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}