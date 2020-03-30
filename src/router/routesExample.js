import ExampleList from "@/views/ExampleList";
import ExampleDetail from "@/views/ExampleDetail";

export default [
  {
    path: "example",
    name: "Example",
    component: { render: h => h("router-view") },
    meta: {
      title: "Toppro-example管理",
      nav: {
        icon: "el-icon-user",
        title: "example管理"
      },
      breadcrumb: {
        title: "example管理"
      }
    },
    children: [
      {
        path: "list",
        name: "ExampleList",
        redirect: { name: "ExampleListSelf" },
        component: { render: h => h("router-view") },
        meta: {
          breadcrumb: {
            title: "example列表",
            replace: true
          }
        },
        children: [
          {
            path: "",
            name: "ExampleListSelf",
            component: ExampleList,
            meta: {
              title: "Toppro-example管理-example列表",
              nav: {
                title: "example列表"
              }
            }
          },
          {
            path: ":id",
            name: "ExampleDetail",
            component: ExampleDetail,
            meta: {
              title: "Toppro-example管理-example详情",
              breadcrumb: {
                title: "example详情"
              }
            }
          }
        ]
      }
    ]
  }
];
