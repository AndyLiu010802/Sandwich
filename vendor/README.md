# Vendor Libraries

这个文件夹保存教学项目需要的第三方库本地副本。

## 当前文件

- `gsap/gsap.min.js`
- `gsap/ScrollTrigger.min.js`
- `gsap/MotionPathPlugin.min.js`
- `lenis/lenis.min.js`

## 为什么保存到本地

初学阶段最怕“代码没写错，但 CDN 没加载”。把库放到本地可以让学习重点回到 GSAP 本身。

## 专业项目里怎么做

真实团队项目通常不手动保存 vendor 文件，而是使用 npm：

```bash
npm install gsap lenis
```

然后通过构建工具引入依赖。这个教学项目先用本地 vendor，是为了降低入门门槛。

## 来源

- GSAP: https://gsap.com/
- Lenis: https://github.com/darkroomengineering/lenis
