<template>
  <div class="admin-layout">
    <div
      class="admin-menu-container"
      :style="[{ width: siderWidth, backgroundColor: backgroundColor }]"
    >
      <div class="admin-menu-sider">
        <div class="admin-menu-header">
          <img
            class="logo-img"
            :style="collapse ? 'margin-left: 18px' : 'margin-left: 20px'"
            src="@/assets/images/logo.png"
          />
        </div>
        <div class="admin-menu-body">
          <el-scrollbar class="scrollbar-section">
            <el-menu
              :background-color="backgroundColor"
              :text-color="textColor"
              :active-text-color="activeTextColor"
              :default-active="defaultActive"
              :router="true"
              :collapse="collapse"
            >
              <template v-for="route in menuRoutes">
                <el-menu-item
                  v-if="!haveChildren(route)"
                  :key="route.name"
                  :index="route.name"
                  :route="{ name: route.name }"
                >
                  <i
                    v-if="route.meta.nav.icon"
                    :class="route.meta.nav.icon"
                  ></i>
                  <span slot="title">{{ route.meta.nav.title }}</span>
                </el-menu-item>
                <el-submenu
                  class="el-submenu-level_1"
                  v-else
                  :key="route.name"
                  :index="route.name"
                >
                  <template slot="title">
                    <i
                      v-if="route.meta.nav.icon"
                      :class="route.meta.nav.icon"
                    ></i>
                    <span>{{ route.meta.nav.title }}</span>
                  </template>

                  <template v-for="item in route.children">
                    <el-menu-item
                      v-if="!haveChildren(item)"
                      :key="item.name"
                      :index="item.name"
                      :route="{ name: item.name }"
                    >
                      <!-- <i
                        v-if="item.meta.nav.icon"
                        :class="item.meta.nav.icon"
                      ></i> -->
                      <span class="fa-dot"></span>
                      <span>{{ item.meta.nav.title }}</span>
                    </el-menu-item>
                    <el-submenu
                      class="el-submenu-level_2"
                      v-else
                      :key="item.name"
                      :index="item.name"
                    >
                      <template slot="title">
                        <!-- <i
                          v-if="item.meta.nav.icon"
                          :class="item.meta.nav.icon"
                        ></i> -->
                        <span class="fa-diamond"></span>
                        <span>{{ item.meta.nav.title }}</span>
                      </template>
                      <el-menu-item
                        v-for="data in item.children"
                        :key="data.name"
                        :index="data.name"
                        :route="{ name: data.name }"
                      >
                        <!-- <i
                          v-if="data.meta.nav.icon"
                          :class="data.meta.nav.icon"
                        ></i> -->
                        <span class="fa-dot"></span>
                        <span>{{ data.meta.nav.title }}</span>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                </el-submenu>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="admin-content-container">
      <div class="admin-content-header">
        <div class="admin-content-header-left">
          <div class="collapse-icon" @click="handleCollapse">
            <i :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
          </div>
        </div>
        <el-dropdown style="height: 100%" @command="handleCommand">
          <div class="admin-content-header-right">
            <img
              class="user-avatar"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span class="nick_name">{{ nickName }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-video-pause" command="handleLogout"
              >登出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="admin-content-body">
        <el-scrollbar class="scrollbar-section">
          <router-view />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "@/router/routes";

export default {
  data() {
    return {
      backgroundColor: "#141f29",
      textColor: "#EEE",
      activeTextColor: "#428BF6",
      defaultActive: this.$route.name,
      menuRoutes: [],
      collapse: false,
      nickName: ""
    };
  },
  computed: {
    siderWidth() {
      return this.collapse ? "64px" : "227px";
    }
  },
  created() {
    this.nickName = this.$store.getters.name;
    this.getRoutes();
  },
  methods: {
    getRoutes() {
      this.menuRoutes = this.filterRoutes(routes);
    },
    filterRoutes(routes) {
      let result = [];
      routes.forEach(data => {
        if (data.meta && data.meta.nav) {
          let item = {
            name: data.name,
            meta: data.meta
          };
          if (data.children) {
            item.children = this.filterRoutes(data.children);
          }
          result.push(item);
        } else if (data.children) {
          this.filterRoutes(data.children).forEach(item => {
            result.push(item);
          });
        }
      });
      return result;
    },
    haveChildren(route) {
      let children = route.children || [];
      return children.length;
    },
    handleCollapse() {
      this.collapse = !this.collapse;
    },
    handleCommand(command) {
      this[command]();
    },
    handleLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="less" scoped>
.admin-layout {
  height: 100vh;
  display: flex;
  .scrollbar-section {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: auto;
      min-height: 100%;
    }
    .el-scrollbar__view {
      width: 227px;
      min-height: 100%;
    }
  }
  .el-menu {
    border-right: 0;
  }
  .el-submenu,
  .el-menu-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .admin-menu-container {
    z-index: 101;
    flex: none;
    display: flex;
    flex-direction: column;
    width: 246px;
    transition: all 0.2s linear;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    // box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);  //圣洁主题阴影
    .admin-menu-sider {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .admin-menu-header {
        display: flex;
        align-items: center;
        height: 48px;
        .logo-img {
          margin: 12px 20px 8px;
          height: 28px;
          transition: all 0.2s linear;
        }
      }
      .admin-menu-body {
        flex: 1;
        height: 0;
        overflow: auto;
        padding-top: 20px;
      }
    }
  }
  .admin-content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 1000px;
    overflow: hidden;
    .admin-content-header {
      position: relative;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 48px;
      font-size: 12px;
      line-height: 48px;
      font-weight: 400;
      color: #606266;
      background: #fff;
      box-shadow: 0 1px 2px 0 rgba(9, 18, 26, 0.06),
        0 4px 8px 0 rgba(39, 56, 73, 0.08);
      .collapse-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        font-size: 22px;
        cursor: pointer;
      }
      .admin-content-header-right {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 100%;
        transition: all 0.2s ease;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
        .user-avatar {
          margin: 0 8px;
          width: 30px;
          border-radius: 50%;
        }
        .nick_name {
          margin-right: 8px;
          font-size: 12px;
          vertical-align: middle;
        }
      }
    }
    .admin-content-body {
      position: relative;
      flex: 1;
      overflow-y: auto;
      background: #f0f2f5;
      // background: #f5f7fa;  //青云 背景色
    }
  }
}
.el-menu-item {
  padding: 0 20px !important;
  height: 48px !important;
  line-height: 48px !important;
  .fa-dot {
    display: inline-block;
    margin-right: 6px;
    width: 24px;
    font-size: 30px;
    text-align: center;
    vertical-align: top;
    color: rgba(255, 255, 255, 0.3);
    &:before {
      content: "\00b7";
    }
  }
  &:hover .fa-dot {
    color: #eee;
  }
}
.el-menu-item.is-active .fa-dot {
  color: #428bf6;
}
.el-submenu-level_1.is-active > .el-submenu__title {
  i {
    color: #428bf6 !important;
  }
  span {
    color: #428bf6 !important;
  }
}
.fa-diamond {
  display: inline-block;
  margin-right: 6px;
  width: 24px;
  font-size: 16px;
  text-align: center;
  vertical-align: top;
  color: rgba(255, 255, 255, 0.3);
  transform-origin: center 53%;
  transform: rotateZ(135deg);
  transition: all 0.4s linear;
  &:before {
    content: "\2724";
  }
}
.el-submenu-level_2:hover .fa-diamond {
  color: #eee;
  transform: rotate(0deg);
}
.el-submenu-level_2.is-active .el-submenu__title {
  span {
    color: #428bf6 !important;
  }
  .fa-diamond {
    transform: rotate(0deg);
  }
}
</style>
