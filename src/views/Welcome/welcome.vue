<template>
    <div class="welcome">
        欢迎你
    </div>
</template>
<script>
var _self
export default {
  name: 'welcome',
  created () {
    _self = this
    console.log(_self)
  },
  data () {
    return {
      aaa: ''
    }
  }
}
</script>
<style lang="less" scoped>

</style>
