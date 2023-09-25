/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-16 10:40:26
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-28 17:22:40
 * @FilePath: /smart-park/store/module/neighborhood.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getModelList, dataInterface, getModelInfo } from '@/api/index'
import helper from '@/common/helper'

const state = {
    neighborhoodSwiper: [],
    // 所有列表数据 包含收藏参加id
    activityList: [],
    activityDetail: {}
}

const actions = {
    async getBannerList({ commit }) {
        const result = await getModelList('64dc36b543432c56038f3000')
        if (result.code === 200) {
            commit('SET_BANNER_LIST', result?.data)
        } else {
            console.log(result);
        }
    },

    //TODO获取活动数据 (定制接口)
    async getActivityList({ commit }, payload = {}) {
        const result = await dataInterface('64e32602642a000093003854')
        if (result.code === 200) {
            commit('SET_ACTIVITY_LIST', result?.data)
        } else {
            console.log(result);
        }
        // message('列表数据获取', true, { auto: true })
    },

    // 查询详情 
    async getActivityDetail({ commit }, payload = {}) {
        const result = await getModelInfo('64dc41e943432c56038f3005', payload.id)
        commit('SET_ACTIVITY_DETAIL', result?.data)
    },

}

const mutations = {
    SET_BANNER_LIST(state, data) {
        state.neighborhoodSwiper = data?.list
    },
    SET_ACTIVITY_LIST(state, data) {
        state.activityList = data
    },
    SET_ACTIVITY_DETAIL(state, data) {
        state.activityDetail = data
    }

}

const getters = {
    newNeighborhoodSwiper(state) {
        return state.neighborhoodSwiper?.map(item => {
            return {
                ...item,
                url: helper.filterCover(item.uploadImgField101[0].url)
            }
        }) || []
    },
    // 获取活动列表
    newActivityList(state) {
        return state.activityList?.map(item => {
            return {
                ...item,
                activity_log: item.activity_log?.map((data) => {
                    return helper.filterCover(data.url)
                }) || [],
                activity_avatar: item.activity_avatar?.map((data) => {
                    return helper.filterCover(data.url)
                }) || [],
                activity_locations: item.activity_location?.address
            }
        }) || []
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}