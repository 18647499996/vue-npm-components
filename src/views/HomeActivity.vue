<template>
  <van-row class='row-body'>
    <van-picker :columns="columns" @change="onChange" />
    <van-row v-for="(item, index) in selectChildList" :key="index">
      <van-checkbox style="height: 30px;" v-model="item.checked" shape="square">{{ item.regionName }}</van-checkbox>
    </van-row>
    <van-button type="primary" @click="onClick">拆分</van-button>

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </van-row>


</template>

<script>

export default {
  name: 'HomeActivity',
  data() {
    return {
      showPicker: false,
      value1: '57856',
      columns: [
        {
          "searchValue": null,
          "createUserId": "1",
          "createUserName": "admin",
          "createTime": "2023-07-31 22:16:42",
          "updateUserId": "2355",
          "updateUserName": "MN18810642341ZB",
          "updateTime": "2024-02-23 11:05:21",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 57856,
          "value": 57856,
          "text": "晋蒙东北",
          "regionName": "晋蒙东北",
          "responsiblePerson": "邹恒",
          "responsiblePhone": "13359518688",
          "status": 1,
          "deleted": 0,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": "1",
          "createUserName": "admin",
          "createTime": "2023-07-31 22:16:58",
          "updateUserId": "2355",
          "updateUserName": "MN18810642341ZB",
          "updateTime": "2024-02-23 11:04:53",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 57857,
          "regionName": "鲁皖",
          "value": 57857,
          "text": "鲁皖",
          "responsiblePerson": "路金桥",
          "responsiblePhone": "17260485253",
          "status": 1,
          "deleted": 0,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": "1",
          "createUserName": "admin",
          "createTime": "2023-07-31 22:17:13",
          "updateUserId": "2355",
          "updateUserName": "MN18810642341ZB",
          "updateTime": "2024-02-23 11:04:11",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 57858,
          "regionName": "江浙沪",
          "value": 57858,
          "text": "江浙沪",
          "responsiblePerson": "杨偲晨",
          "responsiblePhone": "15951405315",
          "status": 1,
          "deleted": 0,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": "1",
          "createUserName": "admin",
          "createTime": "2023-07-31 22:17:28",
          "updateUserId": "2355",
          "updateUserName": "MN18810642341ZB",
          "updateTime": "2024-02-23 11:03:29",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 57859,
          "regionName": "京津冀",
          "value": 57859,
          "text": "京津冀",
          "responsiblePerson": "蔡素成",
          "responsiblePhone": "15822796618",
          "status": 1,
          "deleted": 0,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": "1",
          "createUserName": "admin",
          "createTime": "2023-07-31 22:17:42",
          "updateUserId": "2355",
          "updateUserName": "MN18810642341ZB",
          "updateTime": "2024-02-23 11:03:03",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 57860,
          "regionName": "中南",
          "value": 57860,
          "text": "中南",
          "responsiblePerson": "雷文浩",
          "responsiblePhone": "17324001683",
          "status": 1,
          "deleted": 0,
          "password": null,
          "userId": null
        }
      ],
      childColumns: [
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-05-26 09:06:14",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-15 10:13:51",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 8,
          "regionName": "东北省区",
          "largeRegionId": 57856,
          "responsiblePerson": "武国龙",
          "responsiblePhone": "15598259955",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-06-03 07:20:08",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:42:28",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 9,
          "regionName": "山西省区",
          "largeRegionId": 57856,
          "responsiblePerson": "何仁龙",
          "responsiblePhone": "15073168783",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2023-03-20 16:15:26",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:38:47",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 21,
          "regionName": "内蒙古省区",
          "largeRegionId": 57856,
          "responsiblePerson": "翟建国",
          "responsiblePhone": "18347248888",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-04-01 13:20:20",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:45:51",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 6,
          "regionName": "安徽省区",
          "largeRegionId": 57857,
          "responsiblePerson": "潘金友",
          "responsiblePhone": "15315243070",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-04-20 11:35:17",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:45:12",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 7,
          "regionName": "鲁西省区",
          "largeRegionId": 57857,
          "responsiblePerson": "何俊涛",
          "responsiblePhone": "13333751034",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2023-03-20 16:16:45",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:38:31",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 22,
          "regionName": "鲁东省区",
          "largeRegionId": 57857,
          "responsiblePerson": "李孝良",
          "responsiblePhone": "18530990227",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-01-24 16:09:55",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:46:26",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 3,
          "regionName": "江苏省区",
          "largeRegionId": 57858,
          "responsiblePerson": "白瑞雨",
          "responsiblePhone": "15332185309",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-06-13 17:19:25",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:39:20",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 18,
          "regionName": "浙江省区",
          "largeRegionId": 57858,
          "responsiblePerson": "赵继新",
          "responsiblePhone": "15828165225",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-06-13 17:17:12",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:40:23",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 13,
          "regionName": "京津省区",
          "largeRegionId": 57859,
          "responsiblePerson": "杨冰",
          "responsiblePhone": "18859659928",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2022-06-13 17:18:55",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2023-08-05 17:39:33",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 16,
          "regionName": "河北省区",
          "largeRegionId": 57859,
          "responsiblePerson": "王庆义",
          "responsiblePhone": "18547132777",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2023-03-21 09:34:09",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2024-04-17 18:05:05",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 26,
          "regionName": "湘赣省区",
          "largeRegionId": 57860,
          "responsiblePerson": "杨源",
          "responsiblePhone": "18607154806",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        },
        {
          "searchValue": null,
          "createUserId": null,
          "createUserName": null,
          "createTime": "2023-03-21 09:35:50",
          "updateUserId": "1",
          "updateUserName": "admin",
          "updateTime": "2024-04-17 18:00:42",
          "remark": null,
          "params": {

          },
          "pageNum": null,
          "pageSize": null,
          "token": null,
          "id": 27,
          "regionName": "鄂西南省区",
          "largeRegionId": 57860,
          "responsiblePerson": "李志磊",
          "responsiblePhone": "13135860198",
          "status": 1,
          "deleted": 0,
          "largeRegionName": null,
          "password": null,
          "userId": null
        }
      ],
      selectChildList: [],
      selectSplit: [],
    }
  },

  created() {

  },

  computed: {},

  mounted() {

  },

  methods: {
    onChange(picker, value, index) {
      this.selectChildList = []
      for (let index = 0; index < this.childColumns.length; index++) {
        const element = this.childColumns[index];
        if (value.id == element.largeRegionId) {
          this.selectChildList.push(element)
        }
      }
      console.log('~~~~~~选择二级~~~~~~~~', this.selectChildList)
    },

    checkToggle(value) {
      console.log('~~~~~~~', value)
    },

    onClick() {
      this.showPicker = true
    },

    onConfirm(item, index) {
      this.showPicker = false
      console.log('~~~~~~~~~~~选中目标大区~~~~~~~', item)
      var child = []
      // todo 第一步：首先遍历二级省份列表（ 获取已选中的二级省份 ）
      for (let index = 0; index < this.selectChildList.length; index++) {
        const element = this.selectChildList[index];
        if (element.checked) {
          child.push(element)
        }
      }
      // todo 第二步：然后判断selectSplit( 目标大区数据 )里面元素是否为空
      if (this.selectSplit.length == 0) {
        // 如果为空的话说明是否首次操作拆分，直接添加组装并添加大区
        // 将已选中的二级省份列表添加到目标大区下面
        item.child = child
        this.selectSplit.push(item)
        console.log('~~~~~~~~首次选择~~~~~~~', this.selectSplit)
      } else {
        // todo 如果selectSplit( 目标大区 )列表数据不为空 则判断是否包含当前选择的目标大区
        var isSome = this.selectSplit.findIndex(value => value.id === item.id)
        if (isSome == -1) {
          // 不包含当前选中目标大区对象
          // 将已选中的二级省份列表添加到目标大区下面
          item.child = child
          this.selectSplit.push(item)
        } else {
          // 包含当前选中目标大区
          for (let i = 0; i < this.selectSplit.length; i++) {
            const element = this.selectSplit[i];
            // 遍历目标大区列表（ 判断筛选当前选中大区数据
            if (item.id == element.id) {
              // 遍历当前选中的省区列表（ 二级列表 ）
              for (let j = 0; j < child.length; j++) {
                const c = child[j];
                // 判断当前是否包含当前省区列表（ 二级列表 ）
                var findIndex = element.child.findIndex(value => value.id === c.id)
                if (findIndex === -1) {
                  element.child.push(c)
                }
              }
            }
          }
        }
        console.log('~~~~~~~~当前拆分大区数据~~~~~~', this.selectSplit)
      }
    }
  }
}

</script>

<style scoped>
.row-body {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
