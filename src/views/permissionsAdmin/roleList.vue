<template>
    <div class="userlist">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
         <el-card class="box-card">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="addDialogFormVisible = true" >添加角色</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-table
                align="center"
                border
                stripe
                :data="roleList"
                style="width: 100%">
                <!-- 展开列 -->
                <el-table-column type="expand"  align="center">
                  <template slot-scope="scope">
                    <el-row v-for="(item1,index) in scope.row.children"

                    :key="item1.id" :class="['bdbottom',index===0?'bdtop':'','vcenter']">
                      <!-- 渲染一级权限 -->
                      <el-col :span="5">
                        <el-tag
                         @close='deleteRights(scope.row, item1.id)'
                         closable
                        >
                            {{item1.authName}}
                        </el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <el-col :span="19">
                        <el-row v-for="(item2,index) in item1.children"
                        @close='deleteRights(scope.row, item2.id)'
                        closable
                        :key="item2.id"
                        :class="[index ===0?'':'bdtop','vcenter']"
                        >
                          <el-col :span="6">
                            <el-tag type="success"
                             @close='deleteRights(scope.row, item2.id)'
                             closable
                            >
                              {{item2.authName}}
                            </el-tag>
                            <i class="el-icon-caret-right"></i>
                          </el-col>
                          <el-col :span="18">
                            <el-tag v-for="(item3) in item2.children"
                            :key="item3.id"
                            type="warning"
                            @close='deleteRights(scope.row, item3.id)'
                            closable >
                              {{item3.authName}}
                            </el-tag>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"  align="center"></el-table-column>
                <el-table-column
                  prop="roleName"
                  label="角色名称"
                  align="center"
                  width="400">
                </el-table-column>
                <el-table-column
                  prop="roleDesc"
                  label="角色描述"
                  align="center"
                  width="400">
                </el-table-column>
                <el-table-column
                  prop="children"
                  align="center"
                  label="操作">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark"  content="编辑" placement="top" :enterable="false">
                        <el-button type="primary" size="mini" icon="el-icon-edit"  @click="showEditDialog(scope.row.id)">编辑</el-button>
                      </el-tooltip>
                      <el-tooltip class="item"   effect="dark" content="删除" placement="top"  :enterable="false">
                        <el-button type="danger" size="mini" icon="el-icon-delete"   @click="deleteIdRole(scope.row.id)">删除</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="角色分配" placement="top" :enterable="false">
                        <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSet(scope.row)">分配权限</el-button>
                      </el-tooltip>
                    </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
        <!-- 添加角色对话框 -->
        <el-dialog
        title="添加角色"
        :visible.sync="addDialogFormVisible"
        @close="addDialogClose"
        >
          <el-form :model="addRoleForm" label-width="100px"   :rules="formRoleRules" ref="dialogRef">
             <el-form-item label="角色名称：" prop="roleName">
                <el-input v-model="addRoleForm.roleName" class="input" ></el-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="roleDesc">
                <el-input v-model="addRoleForm.roleDesc" class="input" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRole">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑对话框 -->
        <el-dialog
        title="编辑角色"
        :visible.sync="editDialogFormVisible"
        @close="editDialogClose"
        >
          <el-form :model="editRoleForm" label-width="100px"   :rules="editRoleRules" ref="dialogRef">
             <el-form-item label="角色名称：" prop="roleName">
                <el-input v-model="editRoleForm.roleName"   ></el-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="roleDesc">
                <el-input v-model="editRoleForm.roleDesc"  ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRole(editRoleForm.roleId)">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分配权限对话框 -->
        <el-dialog
        title="添加角色"
        :visible.sync="setRightsDialog"
        @close="setRightsDialogClose"
        >
          <el-tree :data="rightsList"
          :props="treetProps"
          node-key="id"
          show-checkbox
          ref="treeRef"
          :default-checked-keys='defKeys'
          default-expand-all >
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="setRightsDialog = false">取 消</el-button>
            <el-button type="primary" @click="setRightsRole()">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { request } from '@/api/axios.js'
var _self
export default {
  name: 'roles',
  created () {
    _self = this
    _self.getRoleList()
  },
  data () {
    return {
      roleList: [],
      // 权限列表
      rightsList: [],
      // 控制添加角色的表单
      addDialogFormVisible: false,
      // 控制编辑角色的表单
      editDialogFormVisible: false,
      // 控制权限的对话框
      setRightsDialog: false,
      // 树形控件
      treetProps: {
        label: 'authName',
        children: 'children'
      },
      // 勾选已有的权限节点
      defKeys: [],
      // 添加角色信息
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      roleID: '',
      // 编辑角色信息
      editRoleForm: {},
      // 角色规则
      formRoleRules: {
        roleName: [
          {
            required: true, message: '请输入角色名称', trigger: 'blur'
          },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      editRoleRules: {
        roleName: [
          {
            required: true, message: '请输入角色名称', trigger: 'blur'
          },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getRoleList () {
      const { data: res } = await request({
        url: '/roles'
      })
      if (res.meta.status !== 200) return
      _self.roleList = res.data
    },
    addDialogClose () {
      _self.$refs.dialogRef.resetFields()
    },
    editDialogClose () {
      _self.$refs.dialogRef.resetFields()
    },
    addRole () {
      _self.$refs.dialogRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await request({
          url: '/roles',
          method: 'post',
          data: {
            roleName: _self.addRoleForm.roleName,
            roleDesc: _self.addRoleForm.roleDesc
          }
        })
        if (res.meta.status !== 201) return
        _self.addDialogFormVisible = false
        this.getRoleList()
      })
    },
    editRole (id) {
      _self.$refs.dialogRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await request({
          url: `/roles/${id}`,
          method: 'put',
          data: {
            roleName: _self.editRoleForm.roleName,
            roleDesc: _self.editRoleForm.roleDesc
          }
        })
        if (res.meta.status !== 200) return _self.$message.error('编辑失败')
        _self.$message.success('编辑成功')
        _self.editDialogFormVisible = false
        _self.getRoleList()
      })
    },
    async deleteIdRole (id) {
      console.log(id)
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.success('已取消删除')
      }
      const { data: res } = await request({
        url: `roles/${id}`,
        method: 'delete'
      })
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getRoleList()
    },
    async showEditDialog (id) {
      console.log(id)
      _self.editDialogFormVisible = true
      const { data: res } = await request({
        url: `/roles/${id}`
      })
      if (res.meta.status !== 200) return
      this.editRoleForm = res.data
    },
    async showSet (role) {
      _self.roleID = role.id
      this.getLeftKeys(role, this.defKeys)
      _self.setRightsDialog = true
      const { data: res } = await request({
        url: '/rights/tree'
      })
      if (res.meta.status !== 200) return
      _self.rightsList = res.data
    },
    async setRightsRole () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const isStr = keys.join(',')
      const { data: res } = await request({
        url: `/roles/${this.roleID}/rights`,
        method: 'post',
        data: {
          rids: isStr
        }
      })
      if (res.meta.status !== 200) return this.$message.error('添加权限失败')
      this.getRoleList()
      this.setRightsDialog = false
    },
    setRightsDialogClose () {
      _self.defKeys = []
    },
    async deleteRights (role, rightID) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.error('已取消删除')
      }
      console.log('确认删除')
      const { data: res } = await request({
        url: `/roles/${role.id}/rights/${rightID}`,
        method: 'delete'
      })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      role.children = res.data
    },
    // 通过递归获取三级权限
    getLeftKeys (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeftKeys(item, arr)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-button{
  padding: 15px 23px;
}
.el-tag{
  margin:7px;
}
.bdtop{
  border-top: 1px solid #eee
}
.bdbottom{
  border-bottom: 1px solid #eee
}
.vcenter{
  display:flex;
  align-items: center
}
</style>
