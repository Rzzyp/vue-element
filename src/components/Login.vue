<template>
  <div class="login_container"> 
    <div class="login_box">
        <div class="avatar_box">
            <img src="../assets/logo.png">
        </div>
        
        <!--登录表单-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">

            <!---用户名--->
            <el-form-item prop="username" >
                <el-input v-model="loginForm.username"  placeholder="用户名" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <!---密码--->
            <el-form-item prop="password" >
                <el-input v-model="loginForm.password"  placeholder="请输入密码" show-password prefix-icon="el-icon-lock"></el-input>
            </el-form-item>

            <el-form-item  class="btns">
                <el-button type="primary" @click="login" >登录</el-button>
                <el-button type="info" @click="reset" >重置</el-button>
            </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules: {
                //验证规则
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur' }
                ]
            }
        }
    }
    ,methods:{
        reset(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){

            var vm=this;

            this.$refs.loginFormRef.validate(valid=>{
                if(!valid) return;
                this.$http.post("token",{
                    name:this.loginForm.username,
                    password:this.loginForm.password
                }).then(function (response){
                    console.log(response);

                    window.sessionStorage.setItem("token",response.data.token);
                    window.sessionStorage.setItem("name",response.data.name);
                    vm.$message({
                            showClose: true,
                            message: '登录成功',
                            type: 'success'
                        });
                    vm.$router.push('/home');
                    return;
                    
                }).catch(function (error) {
                    //console.log(error.response.status);
                    if(error.response.status==401){
                        return vm.$message({
                            showClose: true,
                            message: '账户或密码错误',
                            type: 'error'
                        });
                        
                    }else if(error.response.status==500){
                        return vm.$message({
                            showClose: true,
                            message: '服务器错误，请稍后重试',
                            type: 'error'
                        });
                    }
                });
                
            });
        }
    }
}
</script>

<style lang="css" scoped>
    .login_container
    {
        background-color:#2b4b6b;
        height:100%;
        
    }
    .login_box{
        width: 450px;
        height:300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .login_box .avatar_box{
        height:130px;
        width:130px;
        border:1px solid #eee;
        border-radius: 50%;
        padding:10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }
    .avatar_box img{
        width: 100%;
        height:100%;
        border-radius: 50%;
        background-color: #eee;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>