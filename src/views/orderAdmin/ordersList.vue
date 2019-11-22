<template>
    <div class="userlist">
        订单列表页
         <el-select  >
          <el-option
            v-for="item in options"
            :key="item.id"
            :value="item.value">
          </el-option>
        </el-select>
         <el-input ></el-input>
    </div>
</template>
<script>
var _self
export default {
  name: 'orders',
  created () {
    _self = this
    console.log(_self)
  },
  data () {
    return {
      aaa: '',
      selected: 'A',
      options: [
        { id: 'One', value: 'A', aaaa: '123' },
        { id: 'Two', value: 'B', aaaa: '123ww' },
        { id: 'Three', value: 'C', aaaa: '123www' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>

</style>
