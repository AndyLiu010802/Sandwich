# 03. 本项目动画拆解

这一课把页面里的每个效果拆开讲。你应该一边打开网站，一边看 `js/animations.js`。

## 1. Loader 三明治堆叠

文件位置：

```text
index.html
css/animations.css
js/animations.js -> runLoader()
```

思路：

- HTML 创建 6 个 `.sandwich-layer`。
- CSS 负责每一层的颜色、位置、形状。
- GSAP 负责让每一层从上方掉下来。

为什么这是好实践：

- 图层结构清楚。
- 换成汉堡、蛋糕、咖啡杯时只改 HTML/CSS，不需要重写动画逻辑。
- loader 用 timeline 管理顺序，后期容易加音效、粒子、文字切换。

容易犯的错误：

- 把每一层都写成独立动画，时间很难控制。
- 只用一张完整图片，失去“层层组装”的动效空间。

## 2. Hero 产品图进场和漂浮

文件位置：

```text
js/animations.js -> setupHero()
```

思路：

- 首次进入：`fromTo()` 从小、透明、向下的位置动到正常状态。
- 之后循环：`gsap.to()` 用 `repeat: -1` 和 `yoyo: true` 做上下漂浮。

为什么这是好实践：

- 入场动画和循环动画分开写，方便维护。
- 循环动画很轻，只动 `transform`，性能好。

容易犯的错误：

- 同时改 `top/left`，会触发布局计算。
- 循环幅度太大，产品像在乱飞。

## 3. 大字弹跳 PopText

文件位置：

```text
js/utils.js -> splitIntoAnimatedSpans()
js/animations.js -> setupTextAnimations()
```

思路：

- JS 把文字拆成一个个 `span`。
- 每个 `span` 从 `opacity: 0`、`scale: 0`、随机旋转开始。
- 用 `stagger` 让它们依次弹出。

为什么这是好实践：

- HTML 仍然保留可读文本。
- `aria-label` 保留可访问性。
- 动画逻辑复用，任何标题加 `.js-pop-text` 都能获得效果。

容易犯的错误：

- 直接在 HTML 里手写几十个 span，维护很痛苦。
- 拆字后不处理空格，英文单词会挤在一起。

## 4. 滚动文字揭示

文件位置：

```text
js/utils.js -> wrapForLineReveal()
js/animations.js -> setupTextAnimations()
```

思路：

- 外层 mask 设置 `overflow: hidden`。
- 内层文字从 `yPercent: 110` 动到 `0`。

为什么这是好实践：

- 视觉上像文字从裁切框里滑出来。
- 代码比复杂 SplitText 更适合初学阶段。

容易犯的错误：

- 没有 mask，只是文字从下方移动，会显得粗糙。
- 一开始就追求逐行拆分，反而学不清核心。

## 5. 卡片惯性

文件位置：

```text
js/animations.js -> setupTiltCards()
```

思路：

- `pointermove` 时根据鼠标在卡片中的位置计算倾斜。
- 记录鼠标速度。
- `pointerleave` 时先按速度甩一下，再弹回原位。

为什么这是好实践：

- 不依赖付费 InertiaPlugin，也能理解惯性的本质。
- 速度计算独立，后期可以换成真正的 InertiaPlugin。

容易犯的错误：

- 每次 `pointermove` 都创建很长的动画。
- 不限制速度，快速划过会甩得太夸张。

## 6. 放大镜跟随鼠标

文件位置：

```text
js/animations.js -> setupPointerMagnifier()
```

思路：

- 舞台外层放真实食材 cutout。
- 放大镜内部再放一份同样位置的食材和背景，形成一层“被放大的画面”。
- `pointermove` 时计算鼠标在 `.tracker-stage` 里的 x/y。
- 外层放大镜跟随鼠标移动。
- 内层画面用 `scale()` 放大，再反向平移，让鼠标下方的内容出现在镜头中心。

核心公式：

```js
sceneX = lensWidth / 2 - mouseX * magnify;
sceneY = lensHeight / 2 - mouseY * magnify;
```

为什么这是好实践：

- 高频交互避免创建大量 tween。
- GSAP 只负责高频设置 CSS 变量，视觉裁切和放大交给 CSS。
- 同一个思路可以复用到产品细节放大、地图局部查看、图片 hover zoom。

容易犯的错误：

- 每次鼠标移动都 `gsap.to()`，会堆积动画。
- 只移动放大镜，不移动内部放大画面，看起来就没有真正的放大效果。
- 忘记 `overflow: hidden`，内部放大的画面会溢出圆形镜头。

## 7. 食材视差

文件位置：

```text
js/animations.js -> setupParallaxIngredients()
```

思路：

- 每个食材有 `data-parallax`。
- ScrollTrigger 用 `scrub: true` 把滚动和 y 位移绑定。

为什么这是好实践：

- 速度写在 HTML 的 data attribute 上，调试很方便。
- JS 逻辑可以批量处理，不需要为每个食材写一段代码。

容易犯的错误：

- 所有层速度一样，看不出深度。
- 位移太大，元素跑出屏幕后造成空洞。

## 8. 贴纸撕开

文件位置：

```text
css/layout.css -> .peel-sticker
js/animations.js -> setupParallaxIngredients()
```

思路：

- CSS 里定义 `--peel`。
- ScrollTrigger 滚动时把 `--peel` 从 0 动到 1。
- `clip-path` 和宽高根据这个变量变化。

为什么这是好实践：

- 视觉计算放 CSS，滚动进度由 JS 控制。
- JS 不需要直接拼复杂 polygon。

容易犯的错误：

- 所有形变都写在 JS 里，代码很难读。
- 忘记 Safari 和低性能设备可能对 clip-path 更敏感。

## 9. SVG 波浪转场

文件位置：

```text
index.html -> .page-wipe
js/animations.js -> setupWaveTransition()
```

思路：

- SVG path 的形状由三个数决定：left、right、center。
- GSAP 动这三个数字。
- 每一帧重新生成 `d` 属性。

为什么这是好实践：

- 不需要付费 MorphSVGPlugin。
- 你能真正理解 path morph 的底层思想。

容易犯的错误：

- 一上来复制复杂 SVG path，看不懂也改不动。
- 转场层没有 `pointer-events: none`，会挡住页面点击。

## 10. 地图路径动画

文件位置：

```text
index.html -> #delivery-path
js/animations.js -> setupRouteMap()
```

思路：

- SVG 画路线。
- `.delivery-cup` 沿路线移动。
- ScrollTrigger 用 `scrub` 绑定滚动进度。

为什么这是好实践：

- 路线设计由 SVG 决定，动画逻辑不关心具体路线形状。
- 设计师以后换路线，JS 可以不用改。

容易犯的错误：

- 路径太复杂，元素转向抖动。
- 忘记 `alignOrigin: [0.5, 0.5]`，元素中心对不准路线。

## 11. 鼠标拖尾

文件位置：

```text
js/animations.js -> setupCursorTrail()
```

思路：

- 创建几个圆点。
- 第一个追鼠标，后面的追前一个。
- 用 `lerp()` 做柔和跟随。

为什么这是好实践：

- 使用 `gsap.ticker`，和 GSAP 的刷新节奏一致。
- pointer-fine 才启用，手机上不浪费性能。

容易犯的错误：

- 手机也开鼠标特效。
- 创建太多 DOM 点，导致页面卡。
