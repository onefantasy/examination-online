<template>
  <div class="register-big-box">
    <div class="box-title">
      注册
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="15%">
      <el-form-item label="账号" prop="account" class="form-item">
        <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="form-item">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword" class="form-item">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-box">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { register } from 'network/login'

  export default {
    data() {
      const validateAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        } else if (value.length < 8 || value.length > 10){
          return callback(new Error('账号必须是8至10位数字或者字母'))
        }
        return callback()
      }
      const validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        } else if(value.length < 10 || value.length > 12) {
          return callback(new Error('密码必须是10至12位的数字或者字母'))
        }
        return callback()
      }
      const validateCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('确认密码不能为空'))
        } else {
          if( value !== this.ruleForm.password){
            return callback(new Error('两次输入的密码不一致'))
          }
          return callback();
        }
      }
      return {
        ruleForm: {
          account: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validateCheck, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            register(this.ruleForm).then(res => {
              if(res.data.isRegister === 0){
                this.$toast.showToast(res.data.description)
              } else {
                this.$toast.showToast('注册成功，赶快去登陆吧!')
                this.resetForm('ruleForm')
                this.$emit('complete')
              }
            })
          } else {
            this.$toast.showToast('请检查输入的账号与密码是否符合要求!')
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
  .register-big-box .form-item{
    margin: 10px 0;
  }
  .register-big-box .form-item label{
    text-align: left;
    color: var(--color-white) !important;
    font-size: 15px;
    width: 80px !important;
  }
  .register-big-box .button-box{
    padding-top: 30px;
  }
</style>

<style scoped>
  .register-big-box{
    padding: 40px 30px 0;
  }
  .box-title{
    color: var(--color-white);
    font-weight: 700;
    font-size: 30px;
    line-height: 70px;
  }
</style>
