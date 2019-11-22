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
                <el-input placeholder="请输入内容" v-model="userInfo.query" clearable @clear="getusersList">
                  <el-button slot="append" icon="el-icon-search" @click="getusersList"  style="width:30px"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="addDialogFormVisible = true">添加用户</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-table
          align="center"
          border
          stripe
          :data="usersList"
          style="width: 100%">
          <el-table-column type="index"  align="center"></el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            align="center"
            label="电话">
          </el-table-column>
           <el-table-column
            prop="role_name"
            align="center"
            label="角色">
          </el-table-column>
           <el-table-column
            prop="mg_state"
            align="center"
            label="状态">
              <template slot-scope="scope">
                  <el-switch
                    @change="handleChange(scope.row)"
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    >
                  </el-switch>
              </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="操作">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
                    <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="角色分配" placement="top" :enterable="false">
                    <el-button type="warning" icon="el-icon-setting" circle></el-button>
                  </el-tooltip>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userInfo.pagenum"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="userInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
        <!-- 添加用户对话框 -->
        <el-dialog
        title="添加用户"
        :visible.sync="addDialogFormVisible"
        @close="addDialogClose"
        >
          <el-form :model="addForm" label-width="80px"   :rules="formRules" ref="dialogRef">
             <el-form-item label="用户名：" prop="username">
                <el-input v-model="addForm.username" class="input" ></el-input>
            </el-form-item>
            <el-form-item label="密 码：" prop="password">
                <el-input v-model="addForm.password" class="input"  type="password"  ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="addForm.email" class="input" ></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="mobile">
                <el-input v-model="addForm.mobile" class="input"  ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑用户信息的对话框 -->
        <el-dialog
        title="修改用户"
        :visible.sync="editDialogFormVisible"
        @close="addDialogClose"
        >
          <el-form :model="editForm" label-width="80px"   :rules="formRules" ref="editDialogRef">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="editFrom.username" class="input" ></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="mobile">
                <el-input v-model="editFrom.mobile" class="input"  type="password"  ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="editFrom.email" class="input" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>
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
    // 验证邮箱的正则
    var checkEmail = (rule, value, cb) => {
      const regemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regemail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    // 验证手机号的正则
    var checkModiel = (rule, value, cb) => {
      const regModiel = /^1[3456789]\d{9}$/
      if (regModiel.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      search: '',
      userInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      usersList: [],
      total: '',
      // 控制对话框的显示与隐藏
      addDialogFormVisible: false,
      // 控制编辑对话框
      editDialogFormVisible: false,
      // 添加用户表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑的用户信息
      editFrom: {},
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkModiel, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
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
    },
    // pageSize 改变时会触发
    handleSizeChange (newSize) {
      _self.userInfo.pagesize = newSize
      this.getusersList()
    },
    // 当前页改变时会触发
    handleCurrentChange (newPage) {
      _self.userInfo.pagenum = newPage
      this.getusersList()
    },
    async handleChange (state) {
      const { data: res } = await request({
        url: `/users/${state.id}/state/${state.mg_state}`,
        method: 'put'
      })
      if (res.meta.status !== 200) {
        state.mg_state = !state.mg_state
        return _self.$message.error('状态修改失败')
      }
      this.$message.sucess('状态修改成功')
    },
    // 监听对话框关闭事件
    addDialogClose () {
      _self.$refs.dialogRef.resetFields()
    },
    addUser () {
      _self.$refs.dialogRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await request({
          url: '/users',
          method: 'post',
          data: {
            username: _self.addForm.username,
            password: _self.addForm.password,
            email: _self.addForm.email,
            mobile: _self.addForm.mobile
          }
        })
        console.log(res)
        if (res.meta.status !== 201) return
        _self.addDialogFormVisible = false
        this.getusersList()
      })
    },
    // 展示编辑对话框
    async showEditDialog (id) {
      _self.editDialogFormVisible = true
      console.log(id)
      const { data: res } = await request({
        url: `/users/${id}`
      })
      if (res.meta.status !== 200) return
      _self.editFrom = res.data
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
  .el-table-column{
    display: flex;
    justify-content: center
  }
  .el-button{
    margin: 0 20px;
  }
  .el-pagination{
      margin-top: 50px;
      text-align:right;
  }
</style>
