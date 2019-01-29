<template>
  <div class="home">
    欢迎来到familyManage!
    <HelloWorld />
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
