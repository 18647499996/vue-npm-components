<template>
  <van-row>
    <div id='container' style='width: 100%; height: 830px;'></div>
    <div id='panel'></div>
  </van-row>
</template>
<script>
export default {
  name: 'MapActivity',
  data() {
    return {}
  },

  created() {

  },

  computed: {},

  mounted() {
    this.utils
    this.utils.LocationManagerUtils.getCurrentLocation(result => {
      console.warn('精确定位：', result)
    })
    this.utils.LocationManagerUtils.getCurrentCityLocation(result => {
      console.warn('IP定位：', result)
    })
    this.utils.LocationManagerUtils.getWeatherLive('北京市', result => {
      console.warn('天气数据：', result)
    })
    this.utils.LocationManagerUtils.getWeatherForecast('北京市', result => {
      console.warn('预报数据：', result)
    })
    this.utils.LocationManagerUtils.getPoiSearch({ keyword: '江城明珠', city: '武汉' }, result => {
      console.warn('POI周边信息：', result)
    })

    // this.utils.LocationManagerUtils.getDrivingSearch('container', 39.961280, 116.406399, 33.876436, 115.779081, {}, {},
    //   [
    //     [116.379028, 39.885042],
    //     [115.779081, 33.876436]
    //   ], function(res, map) {
    //     console.log('规划路线：', res)
    //     console.log('地图引用：', map)
    //   })
      this.utils.LocationManagerUtils.addMap('container',{
          viewMode: '2D', //默认使用 2D 模式
          zoom: 14, //地图级别
      },map => {
        console.log(map)
      })
  },

  methods: {}
}
</script>
