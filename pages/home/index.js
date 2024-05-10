import request from '../../service/index'
import {
    frontZeroLength2
} from '../../utils/index.js'
// import {
//     mockData
// } from '../../utils/mockData.js'

Page({
    data: {
        house: [],
        date: '2017-09',
        formData: {},
        roomNumber: '',
        electricity: '',
        water: '',
        electricityPrice: '',
        waterPrice: '',
        actualRental: '',
        remark: '',
    },
    onLoad: function () {
        this.initDate()
        this.initHouse()
    },
    // 下拉刷新
    onPullDownRefresh: function () {
        console.log('下拉刷新')
    },
    // 点击房号，打开弹窗
    clickHouse: function (event) {
        // wx.navigateTo({
        //     url: '/pages/detail-house/index?number=' + event.currentTarget.dataset.item.number,
        // })

        // 为编辑表单赋值
        console.log('event.currentTarget.dataset.item', event.currentTarget.dataset.item)
        const room = event.currentTarget.dataset.item;
        this.setData({
            formData: event.currentTarget.dataset.item,
            roomNumber: room.roomNumber || '',
            electricity: room.electricity || '',
            water: room.water || '',
            electricityPrice: room.electricityPrice || '',
            waterPrice: room.waterPrice || '',
            actualRental: room.actualRental || '',
            remark: room.remark || '',
            isPay: room.isPay,
            showAddDialog: true,
        })
    },
    // 修改日期选择器
    dateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
        this.initHouse()
    },
    // 初始化日期选择器为当前年月（例：2024-01）
    initDate: function () {
        const nowDate = new Date().getFullYear() + '-' + frontZeroLength2(new Date().getMonth() + 1)
        this.setData({
            date: nowDate
        })
    },
    // 初始化房子数据
    initHouse: function () {
        request('/rental/getRental', 'post', {
            rentalVersion: this.data.date
        }).then(res => {
            this.setData({
                house: res
            })
        }).catch(err => {})
    },
    // 关闭弹窗
    onCloseAddDialog: function () {
        this.handleCloseDialog()
    },
    // 更新数据,关闭弹窗
    handleCloseDialog: function () {
        this.initHouse()
        this.setData({
            showAddDialog: false
        })
    },
    // 确定提交表单(编辑)
    onConfirm: function () {
        const params = {
            electricity: this.data.electricity,
            water: this.data.water,
            actualRental: this.data.actualRental,
            remark: this.data.remark,
            isPay: this.data.isPay
        }
        Object.keys(params).forEach(key => {
            if (params[key] === "") {
                delete params[key]
            }
        })
        //发起编辑请求
        request(`/rental/${this.data.formData._id}`, 'patch', params).then(res => {
            console.log(res)
            this.handleCloseDialog()
        }).catch(err => {})
    },
    // 开关事件
    onSwitchChange: function (event) {
        this.setData({
            isPay: event.detail
        })
    },
    // 计算房租赋值
    handlePutRantal: function (e) {
        this.setData({
            actualRental: e.currentTarget.dataset.countrental
        })
    }
})