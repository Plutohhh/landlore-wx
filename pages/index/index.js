// index.js
import {
    mockData
} from '../../utils/mockData.js'
Page({
    data: {
        man: {
            sex: '男'
        },
        text: 'testtest',
        show: true,
        list: [],
        formData: {},
        isPay: true
    },
    onLoad: function (options) {
        console.log(1)
        console.log(mock)
    },
    onShow: function () {
        console.log(2)
        console.log(mockData)
        console.log(3)
    },
    changeMan: function () {
        this.setData({
            'man.sex': this.data.man.sex === '男' ? '女' : '男'
        })
        this.setData({
            show: this.data.show ? false : true
        })
        this.setData({
            text: '男'
        })
    },
    onReachBottom: function () {
        console.log('到底')
    }
})