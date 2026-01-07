Nectar Travel - 项目设置指南
📋 前置要求
在开始之前，请确保你的电脑已安装：

Node.js (版本 14.0 或更高) - 下载地址
npm (通常随 Node.js 一起安装) 或 yarn
Git - 下载地址
代码编辑器（推荐 VS Code）
🚀 项目初始化步骤
步骤 1: 创建 React 项目
bash
# 使用 Create React App 创建项目
npx create-react-app nectar-travel

# 进入项目目录
cd nectar-travel
步骤 2: 安装依赖
bash
# 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 安装图标库
npm install lucide-react

# 或者使用 yarn
yarn add lucide-react
yarn add -D tailwindcss postcss autoprefixer
步骤 3: 配置 Tailwind CSS
将提供的 tailwind.config.js 内容替换项目根目录的文件
将提供的 src/index.css 内容替换原有文件
步骤 4: 创建文件结构
bash
# 在 src 目录下创建子目录
mkdir -p src/components/layout
mkdir -p src/components/common
mkdir -p src/components/views
mkdir -p src/config
mkdir -p src/data
mkdir -p src/styles

# 在 public 目录下创建图片目录
mkdir -p public/images/hero
mkdir -p public/images/tours
mkdir -p public/images/categories
mkdir -p public/images/cruise
mkdir -p public/images/ticket
mkdir -p public/images/about
步骤 5: 复制文件
将所有提供的文件按照以下结构放置：

nectar-travel/
├── public/
│   └── images/          # 创建图片子目录（后续添加图片）
├── src/
│   ├── App.jsx          # 主应用文件
│   ├── index.js         # React 入口
│   ├── index.css        # Tailwind 引入
│   ├── styles/
│   │   └── GlobalStyles.jsx
│   ├── config/
│   │   ├── themes.js
│   │   └── siteConfig.js
│   ├── data/
│   │   ├── tours.json
│   │   ├── categories.json
│   │   └── content.json
│   └── components/
│       ├── layout/
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   └── ThemeSwitcher.jsx
│       ├── common/
│       │   ├── HoverImageCard.jsx
│       │   ├── NavButton.jsx
│       │   ├── SafetyModal.jsx
│       │   └── MembershipModal.jsx
│       └── views/
│           ├── HomeView.jsx
│           ├── ListView.jsx
│           ├── DetailView.jsx
│           ├── AboutView.jsx
│           ├── CategoryLandingView.jsx
│           └── ProductGridView.jsx
├── tailwind.config.js
├── package.json
└── README.md
步骤 6: 启动开发服务器
bash
npm start
# 或
yarn start
浏览器会自动打开 http://localhost:3000

📸 添加图片
临时图片方案（开发阶段）
在开发阶段，代码中使用了 Unsplash 和 Picsum 的在线图片占位符，可以直接运行查看效果。

添加真实图片步骤
准备图片
首页轮播图：1600x900px（16:9 比例）
旅游产品图：800x600px（4:3 比例）
分类图片：300x200px
其他图片：参考 README.md 中的建议尺寸
图片命名规范
   hero/
   ├── slide-1.jpg
   ├── slide-2.jpg
   └── slide-3.jpg
   
   tours/
   ├── canada-aurora.jpg
   ├── kyoto-capital.jpg
   ├── renaissance-art.jpg
   ├── california-highway.jpg
   └── nordic-fjords.jpg
更新路径
打开 src/data/content.json
将 image 字段中的 URL 替换为本地路径
例如："/images/hero/slide-1.jpg"
图片优化建议
bash
# 安装图片优化工具（可选）
npm install -g sharp-cli

# 批量压缩图片
sharp -i input-folder -o output-folder -q 80
🛠️ 开发提示
VS Code 推荐扩展
ES7+ React/Redux/React-Native snippets - React 代码片段
Tailwind CSS IntelliSense - Tailwind 自动补全
Prettier - 代码格式化
ESLint - 代码检查
常用命令
bash
# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 运行测试
npm test

# 格式化代码（如果安装了 Prettier）
npm run format
🌐 部署到 GitHub Pages
步骤 1: 初始化 Git
bash
git init
git add .
git commit -m "Initial commit"
步骤 2: 创建 GitHub 仓库
在 GitHub 上创建新仓库 nectar-travel
不要添加 README、.gitignore 或 license
步骤 3: 推送代码
bash
git remote add origin https://github.com/your-username/nectar-travel.git
git branch -M main
git push -u origin main
步骤 4: 配置部署
安装 gh-pages
bash
npm install --save-dev gh-pages
在 package.json 中添加：
json
{
  "homepage": "https://your-username.github.io/nectar-travel",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
部署
bash
npm run deploy
🐛 常见问题排查
问题 1: 模块找不到
bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json
# 重新安装
npm install
问题 2: 端口被占用
bash
# 杀死占用端口的进程（Mac/Linux）
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID号> /F
问题 3: Tailwind 样式不生效
检查 tailwind.config.js 中的 content 路径
确保 index.css 包含了 Tailwind 指令
重启开发服务器
📝 Git 工作流建议
bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交更改
git add .
git commit -m "Add: 新功能描述"

# 推送到远程
git push origin feature/new-feature

# 合并到主分支
git checkout main
git merge feature/new-feature
🎯 下一步
✅ 完成项目设置
✅ 准备和添加图片素材
✅ 修改 src/data/ 中的产品和价格信息
✅ 自定义主题颜色和样式
✅ 测试响应式设计
✅ 部署到生产环境
💡 获取帮助
遇到问题？

查看 React 官方文档
查看 Tailwind CSS 文档
在项目 GitHub Issues 中提问
祝开发顺利！🚀

