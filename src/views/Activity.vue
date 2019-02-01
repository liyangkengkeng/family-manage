<template>
  <div class="activity">
    活动管理!
    <div>
      <div>
        <div class="form-group">
          <label>活动名称</label><input type="text" class="form-control" v-model="activityName">
        </div>
        <div class="form-group">
          <label>活动描述</label>
          <textarea class="form-control" v-model="activityDesc" />
        </div>
      </div>
      <button class="btn btn-lg light-blue" @click="addActivity">添加活动</button>
    </div>
    <div>
      活动列表
      <ul>
        <li v-for="(activity, index) in activityList" :key="index">
          {{ activity.activityName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Activity } from 'activity';

@Component({
  components: {
  },
})
export default class ActivityPage extends Vue {
  activityName: string = '';
  activityDesc: string = '';
  activityList: Array<Activity> = [];

  get activityObj(): Activity {
    return {
      activityName: this.activityName,
      activityDesc: this.activityDesc,
    }
  }
  mounted() {
    //查询所有的活动列表
    this.getActivityList();
  }

  initData() {
    this.activityDesc = '';
    this.activityName = '';
  }

  getActivityList() {
    this.$store.dispatch('activityManage/GET_LIST')
      .then(({ data }) => {
        if (data.code !== 0) {
          alert(data.message || '查询失败');
          return;
        }
        this.activityList = data.activityList || [];
      });
  }
  addActivity() {
    if (!this.activityName) {
      alert('必须输入活动名称');
      return;
    }
    this.$store.dispatch('activityManage/ADD', this.activityObj)
      .then(({ data }) => {
        if (data.code !== 0) {
          alert(data.message || '添加失败');
          return;
        }
        this.initData();
        this.getActivityList();
      });
  }
}
</script>
