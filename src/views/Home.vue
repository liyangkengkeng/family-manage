<template>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { User } from 'user';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  userInfo:User = {
    name: 'HuRong',
    password: 'rong',
  }
  mounted() {
    this.$store.dispatch('userManage/GET_USERS_LIST', this.userInfo)
      .then(res => {
      });
  }
}
</script>
