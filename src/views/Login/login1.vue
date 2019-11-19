<template>
    <div class="login">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../../assets/images/avatar.jpg" alt="">
            </div>
            <el-form ref="loginFormRef" :model="form" label-width="80px" class="form_box"  :rules="loginRules" >
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="form.username" class="input" prefix-icon="iconfont icon-yonghu"></el-input>
                </el-form-item>
                <el-form-item label="密 码：" prop="password">
                    <el-input v-model="form.password" class="input" prefix-icon="iconfont icon-mima" type="password"></el-input>
                </el-form-item>
                <div class="btn">
                    <el-button type="primary" round class="button" @click="Login">登录</el-button>
                    <el-button type="success" round class="button" @click="loginFormRef">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { request } from '@/api/axios.js'
var _self
export default {
  name: 'login1',
  components: {
  },
  created () {
    _self = this
  },
  data () {
    return {
      form: {
        password: '123456',
        username: 'admin'
      },
      flog: false,
      loginRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginFormRef () {
      _self.$refs.loginFormRef.resetFields()
    },
    Login () {
      _self.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          const { data: res } = await request({
            url: '/login',
            method: 'post',
            data: {
              username: _self.form.username,
              password: _self.form.password
            }
          })
          if (res.meta.status !== 200 && !_self.flog) {
            return this.$message.error('登录失败')
          } else {
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .login{
        background: #2b4b6b;
        height: 100%;
        .login_box{
            position: absolute;
            width: 450px;
            height: 350px;
            background: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .avatar_box{
                width: 100px;
                height: 100px;
                background:yellow;
                position: absolute;
                border-radius: 50%;
                left: 175px;
                top: -50px;
                img{
                    height: 100%;
                    width:  100%;
                     border-radius: 50%;
                }
            }
            .form_box{
                width: 350px;
                height: 250px;
                position: absolute;
                left: 50px;
                bottom: 0;
                .input{
                    height: 50px;
                }
            }
            .btn{
                margin-top: 50px;
                .button{
                    padding: 15px 50px;
                    margin:0 20px;
                }
            }
        }
    }
</style>
