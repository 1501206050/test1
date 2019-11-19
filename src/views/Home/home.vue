<template>
        <el-container>
          <el-header>Header</el-header>
          <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
</template>
<script>
export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
  .el-container{
    display: flex;
    flex-direction: column
  }
  .el-header {
    background: #373C41;
    height: 50px;
  }
  .el-container{
    height: 100%;
    display: flex;
    flex-direction: row;
    .el-aside {
      background: #323744;
    }
    .el-main {
      background: #EAEDF2
    }
  }

</style>
