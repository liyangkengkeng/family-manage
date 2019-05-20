<template>
  <div>
    <family-header></family-header>
    <div class="cell-wrapper">
      <article class="login">
        <h2>Login</h2>
        <div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <input type="password"  class="form-control" v-model="password">
          </div>
          <div class="form-group">
            <input type="checkbox"> 记住密码
          </div>
          <button class="btn btn-lg light-blue mr-10" @click="login">Login</button>
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

  get userInfo():User {
    return {
      name: this.name,
      password: this.password,
    }
  }

  get publicKey() {
    return this.$store.state.userManage.publicKey || '';
  }

  async login() {
    if(!this.name.trim() || !this.password.trim()) return;
    !this.publicKey && await this.$store.dispatch('userManage/GET_PUBLIC_KEY');
    this.$store.dispatch('userManage/GET_USERS_LIST', Object.assign(this.userInfo, {password: encrypt(this.userInfo.password, this.publicKey)}))
    .then(({data}) => {
      this.$router.push('/home')
    })
    .catch(({data}) => {
      alert(data.message);
    })  
  }

  register() {
   this.$router.push('/register')
  }
}
</script>

<style lang="stylus" scoped>
.cell-wrapper 
  padding 60px 0px
  .login
    width 540px
    margin 0 auto
    padding 60px 20px
    border 1px solid #dadada
</style>

