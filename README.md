# vue2-image-label

Vue2 图片内容标记组件，用于圈出图片四边形内容并获取标记点坐标。**React**版本请参考组件[image-label](https://github.com/nhdeng/image-label)

## 预览

![示例 demo](https://github.com/nhdeng/image-label/blob/main/images/demo.gif)

## 安装

```bash
yarn add vue2-image-label

or

npm i vue2-image-label --save
```

## 使用

```typescript
import Vue2ImageLabel from "vue2-image-label";

<Vue2ImageLabel url="https://p1.ssl.qhimg.com/t01d5bfa57d9ec88727.jpg" />;
```

## 属性说明

| 属性名         | 说明                                   | 类型             | 是否必填 | 默认值 |
| -------------- | -------------------------------------- | ---------------- | -------- | ------ |
| url            | 图片地址                               | string           | 是       | -      |
| containerProps | 组件容器属性，可以设置容器的宽度、高度 | Container        | 否       | -      |
| pointProps     | 标记点属性                             | Point            | 否       | -      |
| lineProps      | 线属性                                 | Line             | 否       | -      |
| getPoints      | 获取图片上的点坐标                     | (points) => void | 否       | -      |

## Container

| 属性名 | 说明 | 类型   | 是否必填 | 默认值 |
| ------ | ---- | ------ | -------- | ------ |
| width  | 宽度 | number | 是       | 1000   |
| height | 高度 | number | 否       | 800    |

## Point

| 属性名 | 说明 | 类型   | 是否必填 | 默认值 |
| ------ | ---- | ------ | -------- | ------ |
| size   | 大小 | number | 否       | 10     |
| color  | 颜色 | string | 否       | red    |

## Line

| 属性名 | 说明 | 类型   | 是否必填 | 默认值 |
| ------ | ---- | ------ | -------- | ------ |
| width  | 宽度 | number | 否       | 2      |
| color  | 颜色 | string | 否       | red    |
