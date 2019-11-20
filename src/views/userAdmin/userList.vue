<template>
    <div class="userlist">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary">添加用户</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-table
          border
          stripe
          :data="usersList"
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
           <el-table-column
            prop="role_name"
            label="角色">
          </el-table-column>
           <el-table-column
            prop="mg_state"
            label="状态">
              <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    >
                  </el-switch>

              </template>
          </el-table-column>
           <el-table-column
            prop="address"
            label="操作">
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { request } from '@/api/axios.js'
var _self
export default {
  name: 'users',
  created () {
    _self = this
    _self.getusersList()
    console.log(_self)
  },
  data () {
    return {
      userInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      usersList: [],
      total: ''
    }
  },
  methods: {
    async getusersList () {
      const { data: res } = await request({
        url: '/users',
        params: _self.userInfo
      })
      _self.usersList = res.data.users
      _self.total = res.data.total
    }
  }
}
</script>
<style lang="less" scoped>

</style>
