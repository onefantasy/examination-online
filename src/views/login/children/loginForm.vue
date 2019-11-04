<template>
  <div class="login-big-box">
    <div class="box-title">
      登录
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="15%">
      <el-form-item label="账号" prop="account" class="form-item">
        <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="form-item">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { provingId } from "network/login"

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
        ruleForm: {
          account: '',
          password: ''
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
    methods: {
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            provingId({account: this.ruleForm.account,password:this.ruleForm.password}).then(res => {
              console.log('验证成功返回结果：',res)
              this.$toast.showToast('提交验证成功！')
            }).catch( err => {
              console.log('验证失败返回结果：',err)
              this.$toast.showToast('验证失败！')
            })
          } else {
            this.$toast.showToast('输入不完整或者输入有误！')
            console.log('error submit!!')
            return false
          }
        })
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
</style>
