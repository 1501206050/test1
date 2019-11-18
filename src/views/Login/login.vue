<template>
    <div class="login">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../../assets/images/avatar.jpg" alt="">
            </div>
            <form action="" class="form_box">
                <label for="username"></label>
                <input type="text" name="username" placeholder="请输入用户名" class="input">
                 <label for="username"></label>
                <input type="password" name="password" placeholder="请输入密码" class="input">
                <div class="btn">
                    <el-button type="primary" round class="button">登录</el-button>
                    <el-button type="success" round class="button">注册</el-button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Button, Form, FormItem, Input } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
export default {
  name: 'login',
  components: {

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
                    height: 42px;
                    width: 100%;
                    padding: 0 10px;
                    box-sizing: border-box;
                    border-radius: 10px;
                    margin-bottom: 30px;
                    border: 1px #D9D9D9 solid;
                    outline: none;
                }
            }
            .btn{
                margin-top: 20px;
                .button{
                    padding: 10px 50px;
                    margin:0 20px;
                }
            }
        }
    }
</style>
