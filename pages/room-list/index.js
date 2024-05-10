import request from '../../service/index'
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        moduleRoomList: [{
                roomNumber: 101
            },
            {
                roomNumber: 102
            },
            {
                roomNumber: 201
            },
            {
                roomNumber: 202
            },
            {
                roomNumber: 301
            },
            {
                roomNumber: 302
            },
            {
                roomNumber: 401
            },
            {
                roomNumber: 402
            },
            {
                roomNumber: 501
            },
            {
                roomNumber: 502
            },
            {
                roomNumber: 601
            },
            {
                roomNumber: 602
            },
        ],
        roomList: [],
        showAddDialog: false,
        roomNumber: "",
        renterName: "",
        phone: "",
        deposit: "",
        rentCost: "",
        isRenting: true,
    },
    onReachBottom: function () {
        console.log('到底')
    },
    onShow: function () {
        this.getRoomList()
    },
    getRoomList: function () {
        const resRoomList = JSON.parse(JSON.stringify(this.data.moduleRoomList))
        request('/room/getlist', 'get', {}).then(res => {
            this.data.moduleRoomList.forEach((item, index) => {
                const tempData = res.find(resItem => {
                    return resItem.roomNumber === item.roomNumber
                })
                // 只有在租,才展示数据
                if (tempData && tempData.isRenting) {
                    console.log('tempData', tempData)
                    resRoomList[index] = {
                        ...resRoomList[index],
                        ...tempData
                    }
                }
            })
            this.setData({
                roomList: resRoomList
            })
        }).catch(err => {})
    },
    openDialog: function (event) {
        this.setData({
            showAddDialog: true,
            roomNumber: '',
            renterName: '',
            phone: '',
            rentCost: '',
            deposit: ''
        })
        const room = event.currentTarget.dataset.room_item;
        this.setData({
            showAddDialog: true,
            isAdd: event.currentTarget.dataset.action,
            roomNumber: room.roomNumber || '',
            renterName: room.renterName || '',
            phone: room.phone || '',
            deposit: room.deposit || '',
            rentCost: room.rentCost || '',
        })
    },
    handleCloseDialog: function () {
        this.getRoomList()
        this.setData({
            showAddDialog: false
        })
    },
    onCloseAddDialog: function () {
        this.handleCloseDialog()
    },
    // 弹窗确定按钮
    onConfirm: function () {
        const params = {
            roomNumber: this.data.roomNumber,
            renterName: this.data.renterName,
            phone: this.data.phone,
            deposit: this.data.deposit,
            rentCost: this.data.rentCost,
            isRenting: true
        }
        if (
            !params.renterName ||
            !params.phone ||
            !params.rentCost ||
            !params.deposit
        ) {
            wx.showToast({
                title: '请填写所有必填项',
                icon: 'none',
                duration: 1000
            })
            return
        }
        if (this.data.isAdd) {
            request('/room/addroom', 'post', params).then(res => {
                console.log(res)
                this.handleCloseDialog()
            }).catch(err => {
                wx.showToast({
                    title: '请填写正确格式',
                    icon: 'none',
                    duration: 1000
                })
            })
        } else {
            request(`/room/${params.roomNumber}`, 'put', params).then(res => {
                console.log(res)
                this.handleCloseDialog()
            }).catch(err => {
                wx.showToast({
                    title: '请填写正确格式',
                    icon: 'none',
                    duration: 1000
                })
            })

        }
    },
    // 退租按钮
    handleCheckout: function (event) {
        const that = this
        wx.showModal({
            title: `${event.currentTarget.dataset.room_item}房将退租`,
            success(res) {
                if (res.confirm) {
                    request(`/room/${event.currentTarget.dataset.room_item}`, 'delete').then(res => {
                        that.getRoomList()
                    })
                }
            }
        })
    }
});