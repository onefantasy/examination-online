<template>
  <div class="login-big-box">
    <div class="box-title">
      登录
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="15%" @keyup.enter.native="submitForm('ruleForm')">
      <el-form-item label="账号" prop="account" class="form-item">
        <el-input v-model="ruleForm.account" autocomplete="off" placeholder="请输入账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="form-item">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item class="keep-password">
        <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { provingId} from "network/user"
  import db from 'common/db'

  export default {
    data() {
      const validateAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        }
        callback()
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      return {
        // 记住密码
        isKeep: false,
        ruleForm: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      // 检测本地是否保存账号与密码
      if(db.getLocalStorage('account') && db.getLocalStorage('password')){
        // 将本地保存的账号与密码自动输入
        this.ruleForm = {
          account: db.getLocalStorage('account'),
          password: db.getLocalStorage('password')
        }
        // 设置保存密码
        this.isKeep = true
      }
    },
    methods: {
      // 记住密码的操作
      keepPassword(){
        // 记住密码
        if(this.isKeep){
          db.setLocalStorage('account',this.ruleForm.account)
          db.setLocalStorage('password',this.ruleForm.password)
          db.setLocalStorage('status',this.ruleForm.status)
        }else{
          // 如果不记住密码，则对已经缓存的账号信息进行删除
          db.delLocalStorage('account')
          db.delLocalStorage('password')
          db.delLocalStorage('status')
        }
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 登录提示
            const loading = this.$loading({
              lock: true,
              text: '登录中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            // 登录验证
            this.$store.dispatch('user/login',this.ruleForm).then(res => {
              loading.close()
              if(res.data.isLogin){
                this.$toast.showToast('登录成功')
                this.keepPassword()
                this.resetForm('ruleForm')
                this.$router.push('/home')
              }
            }).catch(err => {
              loading.close()
              console.log('验证失败返回结果:',err)
              this.$toast.showToast('登录失败')
            })
          } else {
            this.$toast.showToast('输入有误')
            return false
          }
        });
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
  .login-big-box .form-item{
    margin: 50px 0;
  }
  .login-big-box .form-item label{
    color: var(--color-white) !important;
    font-size: 15px;
    width: 50px !important;
  }
  .login-big-box .el-checkbox__label{
    color: var(--color-white) !important;
  }
</style>

<style scoped>
  .login-big-box{
    padding: 40px 30px 0;
  }
  .box-title{
    color: var(--color-white);
    font-weight: 700;
    font-size: 30px;
    line-height: 70px;
  }
  .keep-password{
    transform: translateY(-90%) !important;
  }
  .buttons{
    margin: -25px 0 !important;
  }
</style>