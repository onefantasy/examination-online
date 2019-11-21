<template>
  <div class="register-big-box ignore">
    <div class="box-title">
      注册
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="15%" @keyup.enter.native="submitForm('ruleForm')">
      <el-form-item label="账号" prop="account" class="form-item">
        <el-input v-model="ruleForm.account" autocomplete="off" placeholder="8至10位数字和字母" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="form-item">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="8至12位数字和字母" clearable></el-input>
      </el-form-item>
      <el-form-item label="我是" prop="status" class="form-item">
        <el-select v-model="ruleForm.status" placeholder="请选择" class="status-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="button-box">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { register } from 'network/user'

  export default {
    data() {
      const validateAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        } else if (value.length < 8 || value.length > 10){
          return callback(new Error('账号必须是8至10位数字和字母组成'))
        } else if (!this.reg.test(value)){
          return callback(new Error('账号必须包含数字和字母'))
        }
        return callback()
      }
      const validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'))
        } else if (value.length < 8 || value.length > 12) {
          return callback(new Error('密码必须是8至12位的数字和字母组成'))
        } else if (!this.reg.test(value)){
          return callback(new Error('密码必须同时包含数字和字母'))
        }
        return callback()
      }
      const validateStatus = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('必须选择身份'))
        } else {
          return callback();
        }
      }
      return {
        // 验证输入的账号和密码是否同时包含数字和字母
        reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+$/,
        options:[{value: '教师',key: 'T'},{value: '学生',key: 'S'}],
        ruleForm: {
          account: '',
          password: '',
          status: ''
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          status: [
            { validator: validateStatus, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 注册提示
            const loading = this.$loading({
              lock: true,
              text: '注册中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            // 验证成功
            /* register(this.ruleForm).then(res => {
              loading.close()
              if(res.data.isRegister === 0){
                // 注册失败
                this.$toast.showToast(res.data.description)
              } else {
                // 注册成功
                this.$toast.showToast('注册成功，赶快去登陆吧!',1500)
                this.resetForm('ruleForm')
                this.$emit('complete')
              }
            }) */
            this.$store.dispatch('user/createUser',this.ruleForm).then(res => {
              loading.close()
              if(res.data.isRegister === 0){
                // 注册失败
                this.$toast.showToast(res.data.description)
              } else {
                // 注册成功
                this.$toast.showToast('注册成功。赶快去登录吧',1500)
                this.resetForm('ruleForm')
                this.$emit('complete')
              }
            }).catch(err => {
              console.log('注册失败：',err)
              this.$toast.showToast('注册失败，请稍后重试')
            })
          } else {
            // 验证失败
            this.$toast.showToast('请检查信息是否填写完整!')
            return false
          }
        })
      },
      // 重置填写的内容
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
    width: 100% !important;
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
  .status-select{
    width: 285px !important;
  }
</style>
