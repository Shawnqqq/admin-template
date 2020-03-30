<template>
  <div class="page-container">
    <div class="welcome-page">Toppro管理中心</div>
    <div class="tip">
      <div>Hi，{{ adminName }}！欢迎使用 Toppro后台管理系统</div>
      <p>申请权限请联系：- ，并邮件抄送部门负责人。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminName: ""
    };
  },
  created() {
    this.adminName = this.$store.getters.name;
  }
};
</script>

<style lang="less" scoped>
.welcome-page {
  margin: 20px;
  font-size: 36px;
  color: #141f29;
}
.tip {
  margin: 20px;
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-left: 5px solid #50bfff;
  border-radius: 4px;
  div {
    margin: 12px 0;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5em;
    color: #5e6d82;
  }
  p {
    margin: 12px 0;
    font-size: 14px;
    line-height: 1.5em;
    color: #141f29;
  }
}
</style>
