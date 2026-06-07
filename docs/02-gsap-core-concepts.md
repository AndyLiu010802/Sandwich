# 02. GSAP 核心概念

GSAP 的学习不要从复杂网站开始。先记住四个问题：

```text
谁在动？
从哪里开始？
动到哪里？
什么时候动？
```

## 1. gsap.to()

`to()` 表示：从当前状态动到目标状态。

```js
gsap.to(".box", {
  x: 100,
  opacity: 0.5,
  duration: 1,
});
```

适合：

- hover 后变大。
- 元素滚动时移动。
- 按钮点击后弹一下。

## 2. gsap.from()

`from()` 表示：从你给的状态动回 CSS 当前状态。

```js
gsap.from(".title", {
  y: 60,
  opacity: 0,
  duration: 1,
});
```

适合：

- 页面加载标题进场。
- 卡片从下方出现。

## 3. gsap.fromTo()

`fromTo()` 表示：明确指定开始状态和结束状态。

```js
gsap.fromTo(
  ".hero-image",
  { scale: 0.5, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1 }
);
```

专业项目里经常用它，因为它最可控。

## 4. timeline

`timeline` 用来管理一组动画的顺序。

```js
const tl = gsap.timeline();

tl.from(".logo", { y: 40, opacity: 0 })
  .from(".nav a", { y: 20, opacity: 0, stagger: 0.08 })
  .from(".hero-image", { scale: 0.7, opacity: 0 });
```

适合：

- loader。
- 页面转场。
- 首屏进场。

## 5. stagger

`stagger` 表示多个元素不要同时动，而是一个接一个动。

```js
gsap.from(".letter", {
  y: 30,
  opacity: 0,
  stagger: 0.05,
});
```

这就是大标题“每个字弹出来”的核心。

## 6. ease

`ease` 决定动画的性格。

常用选择：

- `power2.out`：干净、通用。
- `power4.inOut`：适合大转场。
- `back.out(2)`：弹出感。
- `elastic.out(1, 0.5)`：橡皮筋感。
- `sine.inOut`：循环漂浮。

新手常见错误：所有动画都用默认 ease，结果页面没有层次。

## 7. ScrollTrigger

ScrollTrigger 让动画跟滚动发生关系。

```js
gsap.from(".section-title", {
  y: 80,
  opacity: 0,
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 80%",
  },
});
```

重点理解：

- `trigger`：看哪个元素。
- `start`：什么时候开始。
- `end`：什么时候结束。
- `scrub`：是否让动画进度跟滚动条绑定。
- `once`：是否只播放一次。

## 8. MotionPathPlugin

MotionPathPlugin 让元素沿 SVG 路径运动。

```js
gsap.to(".delivery-cup", {
  motionPath: {
    path: "#delivery-path",
    align: "#delivery-path",
    alignOrigin: [0.5, 0.5],
    autoRotate: true,
  },
  scrollTrigger: {
    trigger: ".route-map",
    scrub: 1,
  },
});
```

适合：

- 飞机路线。
- 外卖车路线。
- 咖啡杯沿地图移动。

## 9. quickSetter

`quickSetter` 适合高频更新，比如鼠标移动。

普通写法每次都创建动画，容易卡。`quickSetter` 是直接设置属性，性能更好。

```js
const setLensX = gsap.quickSetter(stage, "--lens-x-px");
setLensX("240px");
```

## 10. gsap.ticker

`ticker` 是 GSAP 的每帧更新机制。适合做：

- 鼠标拖尾。
- Lenis 平滑滚动同步。
- 自定义物理感动画。

本项目的 cursor trail 就用了 `gsap.ticker`。
