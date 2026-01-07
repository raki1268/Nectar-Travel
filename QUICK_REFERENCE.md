Nectar Travel - 快速参考指南 ⚡
📁 完整文件清单
必需创建的所有文件
nectar-travel/
├── .gitignore
├── package.json
├── tailwind.config.js
├── README.md
├── SETUP.md
├── IMAGE_CHECKLIST.md
├── QUICK_REFERENCE.md (本文件)
│
├── public/
│   ├── index.html (自动创建)
│   └── images/
│       ├── hero/
│       ├── tours/
│       ├── categories/
│       ├── cruise/
│       ├── ticket/
│       └── about/
│
└── src/
    ├── index.js
    ├── index.css
    ├── App.jsx
    │
    ├── styles/
    │   └── GlobalStyles.jsx
    │
    ├── config/
    │   ├── themes.js
    │   └── siteConfig.js
    │
    ├── data/
    │   ├── tours.json
    │   ├── categories.json
    │   └── content.json
    │
    └── components/
        ├── layout/
        │   ├── Header.jsx
        │   ├── Footer.jsx
        │   └── ThemeSwitcher.jsx
        │
        ├── common/
        │   ├── HoverImageCard.jsx
        │   ├── NavButton.jsx
        │   ├── SafetyModal.jsx
        │   └── MembershipModal.jsx
        │
        └── views/
            ├── HomeView.jsx
            ├── ListView.jsx
            ├── DetailView.jsx
            ├── AboutView.jsx
            ├── CategoryLandingView.jsx
            └── ProductGridView.jsx
总计: 30+ 个文件

🚀 5分钟快速启动
bash
# 1. 创建项目
npx create-react-app nectar-travel && cd nectar-travel

# 2. 安装依赖
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. 创建目录结构
mkdir -p src/{components/{layout,common,views},config,data,styles}
mkdir -p public/images/{hero,tours,categories,cruise,ticket,about}

# 4. 复制所有提供的文件到对应位置

# 5. 启动开发服务器
npm start
📝 常用修改操作
更新产品价格
文件: src/data/tours.json

json
{
  "id": 1,
  "price": 8999,  // ← 修改这里
  "currency": "CNY"
}
修改首页文案
文件: src/data/content.json

json
{
  "homepage": {
    "heroSlides": [{
      "title": "你的新标题",  // ← 修改这里
      "subtitle": "副标题"
    }]
  }
}
更改公司联系方式
文件: src/config/siteConfig.js

javascript
contact: {
  email: 'info@yourcompany.com',  // ← 修改这里
  phone: '+86-xxx-xxxx'
}
调整主题颜色
文件: src/config/themes.js

javascript
classic: {
  bg: 'bg-[#fcfcfc]',    // ← 背景色
  text: 'text-gray-900',  // ← 文字色
  accent: 'bg-black'      // ← 强调色
}
🎨 响应式断点速查
设备	断点	Tailwind 前缀
手机	< 640px	(默认)
平板	≥ 640px	sm:
笔记本	≥ 768px	md:
桌面	≥ 1024px	lg:
大屏	≥ 1280px	xl:
示例:

jsx
<div className="text-sm md:text-base lg:text-lg">
  {/* 手机小字，平板中字，桌面大字 */}
</div>
🔧 开发命令速查
bash
# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 运行测试
npm test

# 部署到 GitHub Pages
npm run deploy

# 安装新包
npm install package-name

# 清理缓存
rm -rf node_modules package-lock.json && npm install
📊 数据文件结构速查
tours.json
json
{
  "tours": [
    {
      "id": number,
      "title": string,
      "price": number,
      "currency": "CNY" | "USD",
      "image": string,
      "days": number,
      "category": string,
      "season": string,
      "description": string,
      "status": "active" | "inactive",
      "featured": boolean,
      "itinerary": [...]
    }
  ]
}
content.json
json
{
  "homepage": {...},
  "cruise": {...},
  "ticket": {...},
  "about": {...},
  "footer": {...},
  "modals": {...}
}
categories.json
json
{
  "season": [...],
  "destination": [...]
}
🎯 组件导入路径速查
javascript
// 布局组件
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThemeSwitcher from './components/layout/ThemeSwitcher';

// 通用组件
import HoverImageCard from './components/common/HoverImageCard';
import NavButton from './components/common/NavButton';
import SafetyModal from './components/common/SafetyModal';
import MembershipModal from './components/common/MembershipModal';

// 视图组件
import HomeView from './components/views/HomeView';
import ListView from './components/views/ListView';
import DetailView from './components/views/DetailView';
import AboutView from './components/views/AboutView';
import CategoryLandingView from './components/views/CategoryLandingView';
import ProductGridView from './components/views/ProductGridView';

// 配置和数据
import { themes } from './config/themes';
import { siteConfig } from './config/siteConfig';
import toursData from './data/tours.json';
import categoriesData from './data/categories.json';
import contentData from './data/content.json';

// 样式
import GlobalStyles from './styles/GlobalStyles';
🐛 常见错误快速修复
错误: "Cannot find module"
bash
npm install  # 重新安装依赖
错误: "Port 3000 already in use"
bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
错误: Tailwind 样式不生效
bash
# 检查 tailwind.config.js content 路径
# 重启开发服务器
npm start
错误: 图片不显示
检查图片是否在 public/images/ 目录
检查路径是否以 / 开头："/images/..."
检查文件名大小写是否匹配
📱 测试检查清单
功能测试
 首页轮播图自动切换
 主题切换按钮工作正常
 导航菜单点击跳转正确
 产品列表筛选功能
 详情页显示完整
 弹窗打开和关闭
 表单提交（会员注册）
响应式测试
 手机端（< 640px）
 平板端（640-1024px）
 桌面端（> 1024px）
 横屏模式
 不同浏览器
性能测试
 首屏加载 < 3秒
 图片懒加载
 动画流畅不卡顿
 滚动性能良好
🔄 Git 工作流速查
bash
# 初始化
git init
git add .
git commit -m "Initial commit"

# 日常提交
git add .
git commit -m "Update: 描述更改内容"
git push

# 创建分支
git checkout -b feature/new-feature

# 合并分支
git checkout main
git merge feature/new-feature

# 查看状态
git status

# 查看历史
git log --oneline
📞 获取帮助
问题类型	资源
React 相关	React 官方文档
Tailwind 样式	Tailwind CSS 文档
图标使用	Lucide 图标库
部署问题	Vercel 文档
Git 问题	Git 官方文档
✅ 项目完成检查
部署前确认：

代码层面
 所有文件已创建并放置正确位置
 所有依赖已安装
 没有 console.log 或调试代码
 代码已格式化
内容层面
 产品价格已更新
 公司信息已修改
 联系方式已更新
 所有图片已添加
测试层面
 本地测试通过
 响应式测试通过
 浏览器兼容性测试
部署层面
 构建无错误
 已推送到 GitHub
 生产环境正常访问
🎉 完成！
恭喜！你已经完成了 Nectar Travel 项目的设置和开发。

下一步建议:

添加 Google Analytics 追踪
优化 SEO（meta 标签）
添加联系表单后端
集成支付系统
添加多语言支持
持续维护:

定期更新产品信息
监控网站性能
收集用户反馈
更新图片和内容
祝项目成功！🚀

