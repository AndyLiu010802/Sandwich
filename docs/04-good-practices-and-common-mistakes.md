# 04. 专业实践和常见错误

这一课是“像专业开发者一样做动效网站”。

## 好实践 1：HTML 负责内容，不负责动画

好的写法：

```html
<h1 class="display-title js-pop-text">THE SANDWICH</h1>
```

HTML 只说：这是一个大标题，并且它需要 pop 动画。

不好的写法：

```html
<h1>
  <span style="transform: translateY(20px)">T</span>
  <span style="transform: translateY(30px)">H</span>
</h1>
```

问题：

- 内容被动画细节污染。
- 改文案很麻烦。
- 对可访问性不友好。

## 好实践 2：CSS 负责视觉系统

本项目把颜色写在 `:root`：

```css
:root {
  --cream: #f7ead8;
  --tomato: #e84b38;
  --cheese: #f6bf32;
}
```

好处：

- 换品牌风格时不用全项目搜索颜色。
- 动画 JS 不需要关心具体色值。
- 设计系统更统一。

## 好实践 3：JS 负责行为

动画函数应该按效果拆：

```js
setupHero();
setupTextAnimations();
setupRouteMap();
```

不要写成：

```js
// 这里几百行什么都有
```

好处：

- 出问题时知道去哪找。
- 某个效果不需要了可以直接删掉对应函数。
- 迁移到 React/Next.js 时更容易拆成组件。

## 好实践 4：使用 data attribute 表达行为

例如：

```html
<article data-tilt-card></article>
<div data-parallax="-0.08"></div>
```

好处：

- class 可以留给样式。
- data attribute 清楚表达“这个元素有 JS 行为”。
- 批量初始化更容易。

## 好实践 5：优先动画 transform 和 opacity

性能更好的属性：

- `x`
- `y`
- `scale`
- `rotation`
- `opacity`

要谨慎的属性：

- `top`
- `left`
- `width`
- `height`
- `margin`

原因：`transform` 和 `opacity` 通常不会频繁触发布局重算，更适合动画。

## 好实践 6：考虑 reduced motion

有些用户不适合看大量动画，所以项目里有：

```js
prefersReducedMotion()
```

专业网站应该尊重系统设置，减少或关闭循环动画。

## 好实践 7：不要一开始就上最复杂的插件

你可以先用免费 GSAP 学会核心：

- ScrollTrigger
- MotionPathPlugin
- timeline
- ticker
- quickSetter

等你理解动效本质后，再考虑：

- InertiaPlugin
- MorphSVGPlugin
- SplitText

这样学习更稳。

## 常见错误清单

1. 所有动画都写在 `window.onload` 里，后期完全不可维护。
2. 每个元素单独写一段重复动画，不使用函数和循环。
3. 忘记注册插件，比如 `gsap.registerPlugin(ScrollTrigger)`。
4. ScrollTrigger 的 `trigger` 选错，导致动画提前或延后。
5. 一边使用平滑滚动库，一边没有同步 ScrollTrigger。
6. hover 动画没有恢复状态，鼠标离开后元素停在奇怪位置。
7. 鼠标移动时反复创建复杂 tween，导致卡顿。
8. 文字拆成 span 后没有处理可访问性。
9. 手机端也开大量鼠标特效。
10. 只追求炫技，忘记页面内容和品牌调性。

## 专业项目检查表

交付前问自己：

- 页面没加载动画时，内容是否仍然能读？
- 关闭 JS 后，页面是否至少不崩？
- 动画是否有节奏，而不是所有东西一起动？
- 移动端有没有元素重叠？
- 图片有没有 alt？
- 复杂动画有没有文档解释？
- 是否避免复制别人的品牌、图片和文案？

## 下一阶段怎么升级

当你理解这个静态版后，可以升级成：

```text
Vite + React
```

建议拆成：

```text
src/
  components/
    Hero.jsx
    Loader.jsx
    RouteMap.jsx
    Sticker.jsx
  hooks/
    useGsapContext.js
    useReducedMotion.js
  styles/
    globals.css
```

但是不要急。先把这个静态版本吃透，你会更容易理解框架里的动画组织。
