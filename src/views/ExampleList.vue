<template>
  <div class="page-container">
    <BreadCrumb></BreadCrumb>
    <div class="page-title">emample列表</div>
    <div class="search-box">
      <el-input
        class="search-input"
        placeholder="输入框模版"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        size="mini"
        maxlength="20"
        clearable
        @clear="search"
      >
      </el-input>
      <el-select
        class="search-input"
        placeholder="选择框模版"
        v-model="searchSelect"
        size="mini"
        clearable
        @clear="search"
      >
        <el-option
          v-for="item in allConsts.example"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="search">搜索</el-button>
    </div>
    <el-table
      border
      :data="exampleList"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        textAlign: 'center'
      }"
      v-loading="loading"
    >
      <el-table-column label="名字">
        <template slot-scope="scope">
          <div class="ellipsis center">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机">
        <template slot-scope="scope">
          <div class="ellipsis center">{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-link :underline="false" @click="detailPath(scope.row)"
            >详情</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="getData"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
// import exampleService from "@/global/service/example";

export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      loading: false,
      exampleList: [
        { id: 1, name: "例子1", phone: "13111111111" },
        { id: 2, name: "例子2", phone: "14111111111" }
      ],
      searchInput: "",
      searchSelect: "",
      allConsts: {
        example: [
          { lable: "选项一", value: 1 },
          { lable: "选项二", value: 2 },
          { lable: "选项三", value: 3 }
        ]
      },
      pagination: {
        currentPage: 1,
        pageSize: 20,
        total: 500
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // let params = {
      //   input: this.searchInput,
      //   selected: this.searchSelect,
      // };
      // this.loading = true;
      // exampleService
      //   .list(params)
      //   .then((res) => {
      //     this.exampleList = res.list;
      //     this.pagination.currentPage = Number(res.pagination.current_page);
      //     this.pagination.total = Number(res.pagination.total);
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    detailPath(row) {
      let id = row.id;
      this.$router.push({ name: "ExampleDetail", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.search-input {
  margin-right: 12px;
  margin-bottom: 12px;
  width: 180px;
}
.center {
  text-align: center;
}
</style>
