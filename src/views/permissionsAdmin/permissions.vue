<template>
    <div class="rightsList">
       <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
          <el-table
            align="center"
            border
            stripe
            :data="rightsList"
            style="width: 100%">
            <el-table-column type="index"  align="center"></el-table-column>
            <el-table-column
              prop="authName"
              label="权限名称"
              align="center"
              width="500">
            </el-table-column>
            <el-table-column
              prop="path"
              label="权限路径"
              align="center"
              width="500">
            </el-table-column>
            <el-table-column
              prop="level"
              align="center"
              label="权限等级">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.level === '0'">
                    一级
                  </el-tag>
                  <el-tag type='success' v-else-if="scope.row.level ==='1'">
                    二级
                  </el-tag >
                  <el-tag type='warning' v-else >
                    三级
                  </el-tag>
                </template>
            </el-table-column>
          </el-table>
        </el-card>
    </div>
</template>
<script>
import { request } from '@/api/axios.js'
var _self
export default {
  name: 'rights',
  created () {
    _self = this
    _self.gitRightsList()
  },
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    async gitRightsList () {
      const { data: res } = await request({
        url: '/rights/list'
      })
      if (res.meta.status !== 200) return
      _self.rightsList = res.data
    }
  }
}
</script>
<style lang="less" scoped>

</style>
