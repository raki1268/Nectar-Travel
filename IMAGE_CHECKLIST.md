图片资源清单 📸
必需图片列表
按照此清单准备图片，确保网站完整显示所有内容。

📍 首页轮播图 (Hero Slides)
位置: public/images/hero/
尺寸建议: 1600x900px (16:9)
格式: JPG (优化后 < 300KB)

 slide-1.jpg - 主题：现代奢华旅行
 slide-2.jpg - 主题：瑞士阿尔卑斯山
 slide-3.jpg - 主题：非洲野生动物
内容建议:

高质量风景或旅行场景
避免过多文字或水印
主体居中，考虑文字叠加区域
🎫 旅游产品图片 (Tours)
位置: public/images/tours/
尺寸建议: 800x600px (4:3)
格式: JPG (优化后 < 200KB)

 canada-aurora.jpg - 加拿大极光（北极光场景）
 kyoto-capital.jpg - 京都古都（寺庙或传统街道）
 renaissance-art.jpg - 文艺复兴艺术（欧洲博物馆或艺术品）
 california-highway.jpg - 加州1号公路（海岸公路）
 nordic-fjords.jpg - 北欧峡湾（挪威峡湾风光）
内容建议:

体现目的地特色
色彩鲜明，吸引眼球
避免人物特写（除非是文化体验）
🌸 分类图片 - 季节 (Categories - Season)
位置: public/images/categories/
尺寸建议: 600x400px
格式: JPG (优化后 < 150KB)

 spring.jpg - 春季（樱花、郁金香等）
 summer.jpg - 夏季（海滩、阳光）
 autumn.jpg - 秋季（红叶、丰收）
 winter.jpg - 冬季（雪景、滑雪）
🗺️ 分类图片 - 目的地 (Categories - Destination)
位置: public/images/categories/
尺寸建议: 600x400px
格式: JPG (优化后 < 150KB)

 japan.jpg - 日本（富士山、神社、街景）
 europe.jpg - 欧洲（历史建筑、城市风光）
 canada.jpg - 加拿大（自然风光、落基山脉）
 usa.jpg - 美国（城市天际线或自然公园）
🚢 游轮相关图片 (Cruise)
位置: public/images/cruise/
尺寸建议: 800x600px
格式: JPG (优化后 < 200KB)

 hero.jpg - 游轮首图（豪华游轮全景）
 royal-suite.jpg - 皇家套房（豪华客舱）
 danube.jpg - 多瑙河游轮（河流风光）
 family.jpg - 家庭海洋冒险（甲板活动或家庭场景）
内容建议:

展现奢华和舒适
强调服务和设施
包含水域和船只元素
🎟️ 门票相关图片 (Ticket)
位置: public/images/ticket/
尺寸建议: 800x600px
格式: JPG (优化后 < 200KB)

 hero.jpg - 门票首图（主题公园或景点入口）
 theme-park.jpg - 主题公园（游乐设施）
 japan-rail.jpg - 日本铁路（新干线或站台）
 flowers.jpg - 季节性花卉节（花田或花展）
内容建议:

展现独特体验
人群场景显示热门程度
色彩丰富，充满活力
💼 关于页面图片 (About)
位置: public/images/about/
尺寸建议: 800x1000px (4:5 竖图)
格式: JPG (优化后 < 250KB)

 philosophy.jpg - 企业理念（旅行场景或专业团队）
内容建议:

专业但温馨
可以是办公场景或旅行策划场景
体现品牌价值观
📊 图片规格总结
类型	数量	总大小估计
首页轮播	3张	< 900KB
旅游产品	5张	< 1MB
季节分类	4张	< 600KB
目的地分类	4张	< 600KB
游轮相关	4张	< 800KB
门票相关	4张	< 800KB
关于页面	1张	< 250KB
总计	25张	< 5MB
🎨 图片优化建议
在线工具
TinyPNG - PNG/JPG 压缩
Squoosh - Google 图片优化工具
Remove.bg - 去除背景
批量处理
bash
# 使用 ImageMagick 批量调整尺寸
mogrify -resize 800x600 -quality 85 *.jpg

# 使用 Sharp (Node.js)
npm install -g sharp-cli
sharp -i input-folder -o output-folder -q 85
命名规范
✅ 小写字母
✅ 使用连字符 - 而非空格
✅ 描述性名称
❌ 避免中文文件名
❌ 避免特殊字符
好的例子:

canada-aurora.jpg
kyoto-temple.jpg
summer-beach.jpg
不好的例子:

IMG_1234.jpg
我的照片.jpg
photo (1).jpg
🔍 图片来源建议
免费高质量图库
Unsplash - 免费高分辨率图片
Pexels - 免费商用图片
Pixabay - 免费图片和视频
Freepik - 免费向量图和照片（部分需注明出处）
付费优质图库
Adobe Stock
Shutterstock
Getty Images
⚠️ 版权注意事项
确保拥有图片使用权
商业使用需检查许可协议
需要时注明图片来源
避免使用有明显版权标识的图片
✅ 图片添加检查清单
完成后在方框中打勾：

准备阶段
 收集所有25张必需图片
 检查图片版权和使用许可
 按照命名规范重命名所有图片
优化阶段
 调整图片尺寸到推荐大小
 压缩图片文件大小
 转换为 JPG 或 WebP 格式
部署阶段
 按照目录结构放置图片
 检查所有图片路径是否正确
 在本地测试图片加载
 提交到 Git 仓库
验证阶段
 首页轮播图正常显示
 所有旅游产品图片加载
 分类筛选图片显示正确
 移动端图片适配良好
 图片加载速度满意
📝 额外资源
WebP 转换（现代格式，更小体积）
bash
# 安装 cwebp
# Mac: brew install webp
# Ubuntu: sudo apt-get install webp

# 转换单个文件
cwebp -q 85 input.jpg -o output.webp

# 批量转换
for file in *.jpg; do cwebp -q 85 "$file" -o "${file%.jpg}.webp"; done
响应式图片（可选高级功能）
为不同设备准备不同尺寸：

原图: 1600x900px (桌面)
平板: 1024x576px
手机: 640x360px
完成此清单后，您的网站将拥有完整的视觉内容！🎉

