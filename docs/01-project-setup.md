# 01. 从空文件夹开始创建项目

这一课讲的是：一个专业前端项目应该先想清楚结构，而不是一开始就把所有代码塞进一个文件。

## 第一步：创建项目文件夹

```text
sandwich-cafe-gsap-starter/
```

为什么要单独建文件夹：

- 让项目边界清楚。
- 图片、代码、文档都属于同一个项目。
- 以后上传 GitHub、交作业、部署网站都更方便。

## 第二步：创建核心文件

```text
index.html
css/base.css
css/layout.css
css/animations.css
js/main.js
js/animations.js
js/utils.js
```

为什么不把 HTML、CSS、JS 都写在一个文件：

- 初学时看起来方便，但项目一复杂就很难维护。
- 动画网站通常元素多、状态多、交互多，必须分层。
- 分文件能让你快速定位问题：结构问题看 HTML，视觉问题看 CSS，动画问题看 JS。

## 第三步：创建资源文件夹

```text
assets/images/
assets/icons/
```

为什么要这样放：

- `images` 放照片、产品图、生成图。
- `icons` 放 SVG、小图标、装饰元素。
- 不要把图片散落在根目录，否则项目会越来越乱。

## 第四步：创建文档文件夹

```text
docs/
```

很多初学者会忽略文档，但专业动效项目很需要文档，因为动画逻辑通常不是一眼就能看懂的。

文档应该记录：

- 项目怎么运行。
- 文件为什么这样拆。
- 每个动画的目的是什么。
- 哪些地方以后可以扩展。
- 哪些坑要避免。

## 第五步：引入 GSAP

初学教程经常使用 CDN：

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js"></script>
```

为什么初学阶段用 CDN：

- 不需要配置 npm、Vite、React。
- 先把注意力放在动画概念上。
- 当你理解 GSAP 后，再迁移到框架会轻松很多。

不过这个项目最后采用了本地 vendor 文件：

```html
<script src="./vendor/gsap/gsap.min.js"></script>
<script src="./vendor/gsap/ScrollTrigger.min.js"></script>
<script src="./vendor/gsap/MotionPathPlugin.min.js"></script>
<script src="./vendor/lenis/lenis.min.js"></script>
```

为什么这样更适合这份学习项目：

- 不会因为网络或 CDN 被拦截导致动画无法运行。
- 你可以清楚看到项目依赖了哪些第三方库。
- 以后迁移到 npm 时，也知道每个库分别负责什么。

不过，因为本项目使用了 ES module，推荐用本地服务器打开，而不是直接双击 HTML：

```bash
python -m http.server 5500
```

专业项目后期可以改成：

```bash
npm install gsap
```

然后在 JS 里：

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

## 本阶段最重要的原则

先学清楚每个动画为什么动、怎么动，再追求框架和工程复杂度。

## 第六步：避免不必要的外部依赖

这个项目没有使用远程字体，而是使用系统字体：

```css
--display-font: "Cooper Black", Impact, "Arial Black", sans-serif;
--accent-font: "Arial Narrow", Impact, sans-serif;
--body-font: Arial, Helvetica, sans-serif;
```

原因：

- 初学时减少网络变量。
- 离线打开也能接近最终视觉。
- 控制台不会因为字体请求失败出现额外错误。
