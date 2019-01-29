<template>
  <div class="home">
    欢迎来到familyManage
    <button class="btn btn-lg light-blue" @click="logout">注销</button>
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
