# 06. 真实 Cutout 素材和抛掷循环动画

这一课讲两个高级一点、但非常实用的食品网站技巧：

```text
真实食物 cutout
抛物线循环动画
```

它们对应项目里的两个位置：

```text
loader: 真实三明治分层拼接
footer: 咖啡、番茄、芝士、吐司从页面外抛上来
```

## 1. 什么是 cutout

cutout 就是“透明背景的主体图片”。

例如：

```text
assets/images/throw-objects/coffee.png
assets/images/throw-objects/tomato.png
assets/images/throw-objects/cheese.png
assets/images/throw-objects/toast.png
```

这些图片没有背景，所以可以自然地放在任何颜色、图案、文字上方或下方。

为什么食品网站喜欢 cutout：

- 产品更像从页面里跳出来。
- 可以和大字、贴纸、路径动画穿插。
- 比矩形照片更容易做高级动效。

## 2. 为什么 loader 要拆成真实分层

loader 里没有再用 CSS 色块，而是用这些真实层：

```text
assets/images/sandwich-layers/top-bread.png
assets/images/sandwich-layers/lettuce.png
assets/images/sandwich-layers/tomato.png
assets/images/sandwich-layers/cheese.png
assets/images/sandwich-layers/turkey.png
assets/images/sandwich-layers/bottom-bread.png
```

HTML 仍然保持简单：

```html
<span class="sandwich-layer sandwich-layer--bottom"></span>
<span class="sandwich-layer sandwich-layer--turkey"></span>
<span class="sandwich-layer sandwich-layer--cheese"></span>
```

CSS 负责给每层绑定图片：

```css
.sandwich-layer--bottom {
  background-image: url("../assets/images/sandwich-layers/bottom-bread.png");
}
```

GSAP 只负责运动：

```js
gsap.set(layers, {
  y: () => gsap.utils.random(-220, -140),
  rotation: () => gsap.utils.random(-10, 10),
  scale: 0.9,
});
```

这是好实践：素材、视觉、动画职责分开。

## 3. 页脚抛掷动画的 HTML

每个物体都是一张透明 PNG：

```html
<img
  class="throw-object throw-object--tomato throw-object--front throw-object--lane-2"
  data-throw-object
  src="./assets/images/throw-objects/tomato.png"
  alt=""
/>
```

几个 class 的含义：

- `throw-object`：基础样式。
- `throw-object--tomato`：物体类型。
- `throw-object--front`：前景层，会压在大字上。
- `throw-object--back`：背景层，会从大字后方经过。
- `throw-object--lane-2`：运动起点和大小。
- `data-throw-object`：告诉 JS 这个元素需要抛掷动画。

## 4. 页脚抛掷动画的核心逻辑

它不是用真实物理引擎，而是用两段 tween 模拟抛物线：

```js
throwLoop
  .set(item, { y: 260, opacity: 0 })
  .to(item, {
    y: () => gsap.utils.random(-660, -460),
    ease: "power2.out",
  })
  .to(item, {
    y: 280,
    ease: "power2.in",
  });
```

理解方式：

- 第一段 `power2.out`：向上抛，速度越来越慢。
- 第二段 `power2.in`：掉下来，速度越来越快。
- `repeat: -1`：无限循环。
- `repeatRefresh: true`：每一轮重新计算随机值。

## 5. 为什么分 front 和 back

如果所有物体都在文字上方，画面会乱。

如果所有物体都在文字后方，又不够有活力。

所以项目用了两层：

```css
.throw-object--front {
  z-index: 5;
}

.throw-object--back {
  z-index: 1;
}

.footer-title {
  z-index: 3;
}
```

这样有些物体从字前飞过，有些从字后飞过，空间感更强。

## 6. 常见错误

1. 只用文字 label，不用真实素材，食品网站会缺少食欲和质感。
2. 物体都用同一个速度和高度，循环会很机械。
3. 不设置 `overflow: hidden`，物体会在页面外造成滚动条。
4. 不分前后层，所有物体都压住标题。
5. 真实素材没有透明背景，最后只能像贴了几张矩形照片。
6. 随机值只在第一次计算，后面每轮都一样，动画会失去生命感。

## 7. 练习建议

你可以试着改这些值观察效果：

```js
const apexMin = -660;
const apexMax = -460;
const drift = 125;
const delay = index * 0.34;
```

练习目标：

- 改 `apexMin / apexMax`：控制抛多高。
- 改 `drift`：控制横向飘多远。
- 改 `delay`：控制物体出现密度。
- 改 `z-index`：控制前后穿插关系。

这就是从“会写动画”走向“会导演动画”的开始。
