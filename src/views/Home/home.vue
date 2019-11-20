<template>
        <el-container>
          <!-- 头部区域 -->
          <el-header>
            <div class="h-left">
                <img src="@/assets/images/logo.jpg" alt="">
                <span>后台管理系统</span>logout
            </div>
            <el-button type="primary" @click="logout">退出登录</el-button>
          </el-header>
          <!-- 主体区域 -->
          <el-container>
            <!-- 测边栏区域 -->
            <el-aside :width="isOk?'64px':'200px'">
                <div class="button" @click="toggleCollapse">| | |</div>
                <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    unique-opened
                    :collapse="isOk"
                    :collapse-transition="false"
                    :router="true"
                    :default-active="activePath"
                    active-text-color="#409EFF">
                    <!-- 一级菜单 -->
                    <el-submenu :index ="item.id + ''" v-for ="item in mneusList" :key="item.id">
                      <!-- 一级菜单模板 -->
                      <template slot="title">
                        <!-- 菜单图标 -->
                        <i class="el-icon-location"></i>
                        <!-- 一级菜单文本 -->
                        <span>{{item.authName}}</span>
                      </template>
                      <!-- 二级菜单 -->
                      <el-menu-item :index ="'/'+ item1.path + ''" v-for ="(item1, index) in item.children" :key="index" @click="saveNavState('/' + item1.path + '')">
                          <template slot="title">
                             <i class="el-icon-menu"></i>
                             <span>{{item1.authName}}</span>
                          </template>
                      </el-menu-item>
                    </el-submenu>
                  </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
</template>
<script>
import { request } from '@/api/axios.js'
var _self
export default {
  name: 'home',
  created () {
    _self = this
    this.getMnuesList()
    _self.activePath = window.sessionStorage.getItem('activePath')
  },
  data () {
    return {
      isOk: false,
      mneusList: [],
      activePath: ''
    }
  },
  methods: {
    // 退出登录
    logout () {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
    async getMnuesList () {
      const { data: res } = await request({ url: '/menus' })
      _self.mneusList = res.data
    },
    toggleCollapse () {
      _self.isOk = !_self.isOk
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      _self.activePath = activePath
    }
  }
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
    display: flex;
    justify-content: space-between;
    .h-left{
       height: 60px;
       display: flex;
       justify-content: left;
       img{
         height: 100%;
         margin-right: 50px;
       }
       span{
         font-size: 28px;
         color: #ffffff;
         height: 60px;
         line-height: 60px;
       }
    }
  }
  .el-container{
    height: 100%;
    display: flex;
    flex-direction: row;
    .el-aside {
      background: #323744;
      .button{
        color: #fff;
        cursor: pointer;
        height: 25px;
        text-align: center;
        line-height: 27px
      }
      .el-menu{
        border-right: none;
         .el-menu-item{
            margin-left:30px;
            background: red;
          }
      }
    }
    .el-main {
      background: #EAEDF2
    }
  }
  .el-button{
    height: 40px;
    margin-top: 10px
  }

</style>
