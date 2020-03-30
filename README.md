### toppro-admin

### 环境搭建

## 配置本地hosts
```
sudo vim /etc/hosts
127.0.0.1	locahost
127.0.0.1 test.weilaigongzuo.com
```
> 添加一条host，i进入编辑模式，esc退出编辑模式，:wq保存修改

## 根目录添加 .env.local

**测试环境**

```
NODE_ENV=development

VUE_APP_DOMAIN = .weilaigongzuo.com
VUE_APP_API = https://test-api.weilaigongzuo.com

VUE_APP_PLATFORM=vip_default
VUE_APP_SCENE=vip_public
```

**生产环境**

```
NODE_ENV=production

VUE_APP_DOMAIN = .weilaigongzuo.com
VUE_APP_API = https://api.weilaigongzuo.com

VUE_APP_PLATFORM=vip_default
VUE_APP_SCENE=vip_public
```

## 安装依赖
```
yarn
```
## 启动项目
``` 
yarn serve
```

