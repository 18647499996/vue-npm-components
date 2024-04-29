<template>
  <van-row>
    <van-row style='height: 100%'>
      上
    </van-row>
    <van-row class='row-bottom'>
      <van-col span='12' class='van-col'>
        <van-button>电子签名</van-button>
      </van-col>
      <van-col span='12' class='van-col'>
        <van-button>下载PDF</van-button>
      </van-col>
    </van-row>
  </van-row>
</template>

<script>
export default {
  name: 'SignActivity'
}
</script>

<style scoped>
.row-bottom {
  position: absolute;
  width: 100%;
  float: left;
  padding-bottom: 30px;
  bottom: 0;
}

.van-col{
  text-align: center;
}

</style>
