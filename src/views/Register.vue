<template>
  <div class="register">
    <family-header></family-header>
    <div class="cell-wrapper">
      <article class="register">
        <h2>注册</h2>
        <div>
          <div class="form-group">
            <label class="mr-10">账号</label><input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label class="mr-10">密码</label><input type="password"  class="form-control" v-model="password">
          </div>
          <div class="form-group">
            <label class="mr-10">描述</label><input type="text"  class="form-control" v-model="description">
          </div>
          <button class="btn btn-lg light-blue mr-10" @click="login">login</button>
          <button class="btn btn-lg light-blue" @click="register">register</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import { User } from 'user';
import FamilyHeader from '@/views/components/common/header.vue';
import { encrypt } from '@/util/encrypt';

@Component({
  components: {
    FamilyHeader,
  },
})
export default class Login extends Vue {
  name:string = '';
  password:string = '';
  description: string = '';

  get userInfo():User {
    return {
      name: this.name,
      password: this.password,
      description: this.description,
    }
  }

  get publicKey() {
    return this.$store.state.userManage.publicKey || '';
  }

  login() {
    this.$router.push('/login');
  }

  async register() {
    if (!this.name || !this.password) {
      alert('必须输入密码或者账号信息');
      return;
    }
    !this.publicKey && await this.$store.dispatch('userManage/GET_PUBLIC_KEY');
    this.$store.dispatch('userManage/REGISTER_USER', 
      Object.assign(this.userInfo, {password: encrypt(this.userInfo.password, this.publicKey)})
    )
    .then(({data}) => {
      this.$router.push('/login');
    })
    .catch(({data}) => {
      alert(data.message || '注册失败');
    })   
  }
}
</script>

<style lang="stylus" scoped>
.cell-wrapper 
  padding 60px 0px
  .register
    width 540px
    margin 0 auto
    padding 60px 20px
    border 1px solid #dadada
</style>
