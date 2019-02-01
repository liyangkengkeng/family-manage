<template>
  <div class="login">
    <div class="cell-wrapper">
      <article class="login">
        <h2>Login</h2>
        <div>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name">
          </div>
          <div>
            <input type="password"  class="form-control" v-model="password">
          </div>
          <div>
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

@Component({
  components: {
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

  mounted() {
  }

  login() {
    if(!this.name.trim() || !this.password.trim()) {
      return
    }
    this.$store.dispatch('userManage/GET_USERS_LIST', this.userInfo)
    .then(({data}) => {
      if(data.code !== 0) {
        alert('密码或账户错误')
        return;
      }
      this.$router.push('/home')
    });  
  }

  register() {
   this.$router.push('/register')
  }
}
</script>
