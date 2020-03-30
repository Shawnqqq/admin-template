<template>
  <router-view />
</template>

<style lang="less">
@import "./assets/styles/base.less";
@import "./assets/styles/el.less";

// 页面标题
.page-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 4px 0px 15px 4px;
}

// 不换行省略
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
