# Melt & Sip GSAP Learning Project

这是一个从零开始学习 GSAP 的教学项目。目标不是复制任何现有品牌，而是学习一个高动效食品网站常用的动画方法，并把它改造成原创的三明治咖啡店网站。

Motion and interaction inspiration: https://www.cravburgers.shop/. This is an independent learning project with an original sandwich cafe concept, original generated food cutouts, and separate copy/design decisions.

## 如何打开

推荐使用本地服务器预览。原因是这个项目使用了 ES module，直接双击 `index.html` 时，部分浏览器会因为 `file://` 安全限制拦截模块脚本。

在项目文件夹运行：

```bash
python -m http.server 5500
```

然后打开：

```text
http://localhost:5500
```

这也是专业前端开发的常规习惯：即使是静态网页，也尽量通过本地服务器检查资源路径、模块加载和浏览器行为。

## 文件结构

```text
sandwich-cafe-gsap-starter/
  index.html
  css/
    base.css
    layout.css
    animations.css
  js/
    main.js
    animations.js
    utils.js
  assets/
    images/
      hero-cutout.png
      hero-cutout-source.png
      sandwich-layers/
      throw-objects/
      tracker-objects/
      sandwich-coffee-hero.png
    icons/
      openmoji/
  vendor/
    gsap/
      gsap.min.js
      ScrollTrigger.min.js
      MotionPathPlugin.min.js
    lenis/
      lenis.min.js
  docs/
    01-project-setup.md
    02-gsap-core-concepts.md
    03-animation-breakdown.md
    04-good-practices-and-common-mistakes.md
    05-assets-and-credits.md
    06-real-cutouts-and-throw-motion.md
```

## 为什么这样分文件

`index.html` 只负责页面结构和语义。它回答的是：页面里有什么内容？

`css/base.css` 放全局变量、字体、颜色、reset 和基础排版。它回答的是：这个项目的视觉系统是什么？

`css/layout.css` 放组件和页面布局。它回答的是：每个区块长什么样、怎么排列？

`css/animations.css` 放动画相关的初始状态、loader、cursor trail、wave overlay 等。它回答的是：哪些元素需要为动画准备特殊样式？

`js/main.js` 是入口文件，只负责启动。它回答的是：页面加载后要初始化哪些功能？

`js/animations.js` 放每一种动效的实现函数。它回答的是：每个效果具体怎么动？

`js/utils.js` 放小工具函数。它回答的是：哪些通用逻辑可以复用？

`docs/` 放学习文档。专业项目里，复杂动效一定要有说明，否则过两周连自己都会忘记为什么这样写。

`vendor/` 放第三方库的本地副本。这个教学项目把 GSAP 和 Lenis 下载到本地，是为了避免 CDN 或网络限制影响学习。真实商业项目通常会用 npm 管理依赖。

本项目也没有依赖远程字体。字体使用系统字体组合，这样离线预览时不会因为 Google Fonts 或其他外部服务加载失败而报错。

视觉素材说明：

- `hero-cutout.png` 是本项目原创生成的三明治咖啡主视觉，使用绿色背景抠图后保存为透明 PNG。
- `assets/images/tracker-objects/` 保存这次新增的 avocado、fried egg、aioli cutout，只用于 pointer tracking 这一屏，避免和页脚抛掷素材重复。
- `assets/icons/openmoji/` 里的 SVG 来自 OpenMoji，用作学习项目里的开放食材图案。
- 详细来源和使用理由见 `docs/05-assets-and-credits.md`。

## 学习顺序

1. 先读 `docs/01-project-setup.md`，理解项目从空文件夹开始怎么建。
2. 再读 `docs/02-gsap-core-concepts.md`，学 GSAP 最核心的概念。
3. 打开 `js/animations.js`，对照 `docs/03-animation-breakdown.md` 看每个效果。
4. 最后读 `docs/04-good-practices-and-common-mistakes.md`，学习专业开发习惯。

## 本项目包含的 GSAP 技术

- `gsap.to()`
- `gsap.fromTo()`
- `gsap.timeline()`
- `stagger`
- `ease`
- `ScrollTrigger`
- `MotionPathPlugin`
- `quickSetter`
- `gsap.ticker`
- CSS variable animation
- pointer movement animation
- reduced motion 兼容思路

参考文档：

- GSAP: https://gsap.com/docs/v3/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- MotionPathPlugin: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- Lenis: https://github.com/darkroomengineering/lenis
