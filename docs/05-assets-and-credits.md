# 05. 视觉素材和来源

这一版升级的目标是：让项目不只是“能学 GSAP”，还更像一个有创意方向的食品品牌网站。

Motion and interaction inspiration: https://www.cravburgers.shop/. This project uses that site as animation reference only; the Melt & Sip sandwich cafe concept, copy, generated cutouts, and visual composition are separate learning-project assets.

## 主视觉

文件：

```text
assets/images/hero-cutout-source.png
assets/images/hero-cutout.png
assets/images/sandwich-layers/
assets/images/throw-objects/
assets/images/tracker-objects/
```

`hero-cutout-source.png` 是原创生成的三明治和咖啡产品图。生成时使用纯绿色背景，方便抠图。

`hero-cutout.png` 是去掉绿色背景后的透明 PNG。网页实际使用的是这个文件。

`sandwich-layers/` 保存真实三明治分层 cutout，用于 loader 里的拼接动画。

`throw-objects/` 保存真实咖啡杯、番茄、芝士、吐司 cutout，用于页脚从页面外抛掷的循环动画。

`tracker-objects/` 保存 avocado、fried egg、aioli cutout，只用于 lesson 02 的 pointer tracking 视觉区。这样做的原因是避免同一批图片在多个区块反复出现，让每个 section 都有自己的视觉任务。

为什么这样做：

- 食品网站的主视觉非常重要，透明产品图比矩形照片更容易做出漂浮、贴纸、食材环绕等动效。
- 用原创生成图可以避免直接使用别人的品牌素材。
- 保留 source 文件方便以后重新抠图或对比质量。

## OpenMoji 图标

文件夹：

```text
assets/icons/openmoji/
```

这些 SVG 食材图案来自 OpenMoji：

- sandwich
- coffee
- tomato
- lettuce
- cheese
- pickle
- bread
- bacon

来源：

```text
https://openmoji.org/
https://github.com/hfg-gmuend/openmoji
```

OpenMoji 官网说明其表情图标可在 CC BY-SA 4.0 许可下使用。这个项目把它们用于学习用途，并保留来源说明。

## 为什么不直接随便找图片

初学者很容易犯一个错误：看到网上漂亮图片就下载放进项目。专业项目不能这样做。

更好的做法：

- 使用自己生成或自己拍摄的主视觉。
- 使用明确授权的图标库。
- 在文档里记录素材来源。
- 不复制别人的品牌、菜单文案、摄影风格和独特图案组合。

## 这次视觉升级学到什么

1. 产品图最好是透明 PNG，这样动画空间更大。
2. 小图标可以作为图案系统，而不只是装饰。
3. 背景纹理、贴纸、食材标签、路线图标要服务同一个品牌语气。
4. 每次增强视觉后，都要用截图检查文字是否压住图片。
