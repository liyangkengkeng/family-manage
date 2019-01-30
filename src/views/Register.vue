<template>
  <div class="login">
    <div class="cell-wrapper">
      <article class="login">
        <h2>注册</h2>
        <div>
          <div class="form-group">
            <label>账号</label><input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label>密码</label><input type="password"  class="form-control" v-model="password">
          </div>
          <div class="form-group">
            <label>描述</label><input type="text"  class="form-control" v-model="description">
          </div>
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
  description: string = '';

  get userInfo():User {
    return {
      name: this.name,
      password: this.password,
      description: this.description,
    }
  }

  register() {
    if (!this.name || !this.password) {
      alert('必须输入密码或者账号信息');
      return;
    }
    this.$store.dispatch('userManage/REGISTER_USER', this.userInfo)
    .then(({data}) => {
      if(data.code !== 0) {
        alert(data.message || '注册失败');
        return;
      }
      this.$router.push('/login');
    });    
  }
}
</script>
