# v2component
个人组件库，包含常用js、常用css、常用element-ui的组件二次封装、axios封装、router封装、自定义组件等等。
主要技术：vue2全家桶+element-ui+axios+eslint。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




## 常用css
有移动端的1px方案、超出一行换行、超出多行换行、禁止选中文本、自定义光标颜色、自定义滚动条等，详见[styles/common](./src/styles/common.css).  
## 常用js
### 页面元素转图片
使用html2canvas库将页面元素转换为图片。该方法接收两个参数，一个dom元素，一个配置对象。详见[domToImage](./src/utils/domToImg.js)方法.  
### 数字相关方法
获取两个数字之间的所有整数，判断是否为素数等方法。详见[number](./src/utils/number.js)。  
### 判断平台、系统相关方法
是否为iOS平台、是否为手机平台等方法。详见[system](./src/utils/system.js)。  
### 微信自动播放音视频
在微信里打开网页，自动开始播放音视频方法封装。详见[autoPlay](./src/utils/wx.js)。  
### 常用js方法封装
防抖节流、获取参数数据类型、复制内容到剪贴板、文件切片、函数柯里化、函数式编程实现、时间日期格式化、时区转换、深拷贝、排序、预加载图片等等。详见[common](./src/utils/common.js)。  