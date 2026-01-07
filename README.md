nectar-travel/
├── public/
│   └── images/              # 所有图片资源
│       ├── hero/           # 首页轮播图
│       │   ├── slide-1.jpg
│       │   ├── slide-2.jpg
│       │   └── slide-3.jpg
│       ├── tours/          # 旅游产品图片
│       │   ├── canada-aurora.jpg
│       │   ├── kyoto-capital.jpg
│       │   ├── renaissance-art.jpg
│       │   ├── california-highway.jpg
│       │   └── nordic-fjords.jpg
│       ├── categories/     # 分类图片
│       │   ├── spring.jpg
│       │   ├── summer.jpg
│       │   ├── autumn.jpg
│       │   ├── winter.jpg
│       │   ├── japan.jpg
│       │   ├── europe.jpg
│       │   ├── canada.jpg
│       │   └── usa.jpg
│       ├── cruise/         # 游轮相关图片
│       │   ├── hero.jpg
│       │   ├── royal-suite.jpg
│       │   ├── danube.jpg
│       │   └── family.jpg
│       ├── ticket/         # 门票相关图片
│       │   ├── hero.jpg
│       │   ├── theme-park.jpg
│       │   ├── japan-rail.jpg
│       │   └── flowers.jpg
│       └── about/          # 关于页图片
│           └── philosophy.jpg
│
├── src/
│   ├── App.jsx             # 主应用组件
│   ├── styles/
│   │   └── GlobalStyles.jsx
│   ├── config/
│   │   ├── themes.js       # 主题配置
│   │   └── siteConfig.js   # 网站基础配置
│   ├── data/               # 数据文件（可编辑价格和文案）
│   │   ├── tours.json
│   │   ├── categories.json
│   │   └── content.json
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ThemeSwitcher.jsx
│   │   ├── common/
│   │   │   ├── HoverImageCard.jsx
│   │   │   ├── NavButton.jsx
│   │   │   ├── SafetyModal.jsx
│   │   │   └── MembershipModal.jsx
│   │   └── views/
│   │       ├── HomeView.jsx
│   │       ├── ListView.jsx
│   │       ├── DetailView.jsx
│   │       ├── AboutView.jsx
│   │       ├── CategoryLandingView.jsx
│   │       └── ProductGridView.jsx
│   └── index.js
│
├── package.json
└── README.md


✨ 核心功能

📱 完全响应式设计 - 支持手机、平板、电脑所有尺寸
🎨 三种主题切换 - Classic Art / Nature Retreat / Midnight Gold
🌍 多视图系统 - 首页、列表、详情、关于、分类落地页
🔄 动态数据管理 - 所有产品和价格可通过 JSON 文件修改
💫 流畅动画效果 - 页面切换、悬停效果、轮播图

📄 页面结构

首页 (HomeView) - 轮播图、快速分类、精选推荐
列表页 (ListView) - 按季节/目的地筛选、侧边栏导航
详情页 (DetailView) - 行程安排、价格、预订卡片
关于页 (AboutView) - 公司介绍、理念、价值观
分类落地页 (CategoryLandingView) - 游轮/门票专题页
产品网格页 (ProductGridView) - 电商风格产品展示


快速开始
安装依赖
bashnpm install
# 或
yarn install
运行开发服务器
bashnpm start
# 或
yarn start
构建生产版本
bashnpm run build
# 或
yarn build
如何修改内容
1. 修改产品价格和信息
编辑 src/data/tours.json:
json{
  "id": 1,
  "title": "产品标题",
  "price": 6999,        // 修改这里的价格
  "currency": "CNY",
  "description": "产品描述", // 修改描述
  "status": "active"    // 控制上下架：active/inactive
}
2. 修改页面文案
编辑 src/data/content.json:
json{
  "homepage": {
    "heroSlides": [
      {
        "title": "修改首页标题",
        "subtitle": "修改副标题"
      }
    ]
  }
}
3. 添加新产品
在 src/data/tours.json 的 tours 数组中添加新对象：
json{
  "id": 6,
  "title": "新产品名称",
  "price": 9999,
  "image": "/images/tours/new-product.jpg",
  "days": 7,
  "category": "Japan",
  "season": "Spring",
  "description": "产品描述",
  "status": "active",
  "featured": true,
  "itinerary": [...],
  "highlights": [...]
}
4. 修改公司信息
编辑 src/config/siteConfig.js:
javascriptexport const siteConfig = {
  siteName: 'N TRAVEL',
  contact: {
    email: 'info@nectartravel.com',  // 修改联系邮箱
    phone: '+1-234-567-8900'         // 修改电话
  }
}
图片管理
图片路径规范
所有图片放在 public/images/ 目录下，按分类组织：
public/images/
├── hero/          # 首页轮播图 (建议尺寸: 1600x900px)
├── tours/         # 旅游产品图 (建议尺寸: 800x600px)
├── categories/    # 分类图片 (建议尺寸: 300x200px)
├── cruise/        # 游轮图片 (建议尺寸: 800x600px)
├── ticket/        # 门票图片 (建议尺寸: 800x600px)
└── about/         # 关于页图片 (建议尺寸: 800x1000px)
添加新图片步骤

将图片放入对应文件夹
在 JSON 文件中引用："/images/tours/your-image.jpg"
确保文件名与 JSON 中的路径完全匹配

响应式断点
css/* 手机 */
< 640px (sm)

/* 平板 */
640px - 768px (md)

/* 笔记本 */
768px - 1024px (lg)

/* 桌面 */
> 1024px (xl)
技术栈

React 18 - UI 框架
Tailwind CSS - 样式系统
Lucide React - 图标库
JSON - 数据管理

浏览器支持

✅ Chrome (最新版)
✅ Firefox (最新版)
✅ Safari (最新版)
✅ Edge (最新版)
✅ 移动端浏览器

部署建议
Vercel (推荐)
bashnpm install -g vercel
vercel
Netlify
直接连接 GitHub 仓库，自动部署
GitHub Pages
bashnpm run build
# 将 build 文件夹内容推送到 gh-pages 分支
维护提示
定期更新

✅ 每月检查产品价格
✅ 每季度更新首页轮播图
✅ 及时下架过期产品（修改 status 为 inactive）

性能优化

✅ 使用 WebP 格式图片（更小体积）
✅ 压缩图片到合理尺寸
✅ 定期清理未使用的图片

常见问题
Q: 如何更改主题颜色？
A: 编辑 src/config/themes.js 文件中的颜色值
Q: 如何添加新的页面？
A: 在 src/components/views/ 创建新组件，然后在 App.jsx 中添加路由
Q: 图片不显示怎么办？
A: 检查图片路径是否正确，确保图片存在于 public/images/ 目录
联系支持
如有问题，请通过以下方式联系：

📧 Email: dev@nectartravel.com
💬 GitHub Issues: [项目地址]

许可证
MIT License - 可自由使用和修改