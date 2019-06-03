<template>
  <div class="home">
    欢迎{{ name }}来到familyManage!
    <div>
      <button class="btn btn-lg light-blue mr-10 " @click="logout">注销</button>
      <button class="btn btn-lg light-blue" @click="gotoActivity">活动管理</button>
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
export default class Home extends Vue {
  get name(): string {
    return '';
  }

  gotoActivity() {
    this.$router.push('/activity');
  }

  logout() {
    this.$store.dispatch('userManage/LOGOUT_USER')
    .then(({data}) => {
      if (data.code === 0) {
        this.$router.push('/login')
      }
    }) 
  }
}
</script>
