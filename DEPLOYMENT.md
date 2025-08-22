# 🚀 问道手游首饰打造系统 - 部署指南

## 📋 部署到 GitHub Pages

### 🔧 前提条件

1. **GitHub 账户**：确保你有一个 GitHub 账户
2. **Git 安装**：本地安装了 Git
3. **Node.js**：确保安装了 Node.js 和 npm

### 📝 快速部署步骤

#### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 仓库名设置为：`wendao-jewelry-craft`
4. 设置为 Public（免费账户必须）
5. 不要勾选任何初始化选项
6. 点击 "Create repository"

#### 2. 更新配置文件

编辑 `package.json` 中的 `homepage` 字段：

```json
{
  "homepage": "https://你的GitHub用户名.github.io/wendao-jewelry-craft"
}
```

**例如**：如果你的用户名是 `zhang123`，则设置为：
```json
{
  "homepage": "https://zhang123.github.io/wendao-jewelry-craft"
}
```

#### 3. 运行部署脚本

在项目根目录执行：

```bash
./deploy.sh
```

或者手动执行：

```bash
# 手动部署步骤
git init
git remote add origin https://github.com/你的用户名/wendao-jewelry-craft.git
git add .
git commit -m "🚀 初始提交"
git push -u origin main
npm run deploy
```

#### 4. 配置 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单找到 "Pages"
4. 在 "Source" 下拉菜单选择 "Deploy from a branch"
5. 选择 `gh-pages` 分支
6. 点击 "Save"

### 🌐 访问你的应用

部署成功后，你的应用将在以下地址可用：

```
https://你的GitHub用户名.github.io/wendao-jewelry-craft
```

**例如**：`https://zhang123.github.io/wendao-jewelry-craft`

### 🔄 更新部署

每次修改代码后，重新运行部署脚本：

```bash
./deploy.sh
```

或手动执行：

```bash
git add .
git commit -m "更新描述"
git push origin main
npm run deploy
```

### ⚡ 自动化部署（GitHub Actions）

如果你想要在每次推送代码时自动部署，可以创建 GitHub Actions 工作流：

<details>
<summary>点击查看 GitHub Actions 配置</summary>

创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

</details>

### 🛠️ 常见问题解决

#### ❌ 部署失败

**问题1：权限错误**
```bash
# 解决方案：设置Git用户信息
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

**问题2：远程仓库错误**
```bash
# 检查远程仓库
git remote -v
# 重新设置远程仓库
git remote set-url origin https://github.com/你的用户名/wendao-jewelry-craft.git
```

**问题3：Pages未启用**
- 确保仓库设置中启用了 GitHub Pages
- 选择正确的源分支（gh-pages）

#### 🌐 访问问题

**问题1：404错误**
- 等待5-10分钟，GitHub Pages需要时间生效
- 检查仓库是否为Public
- 确认 Pages 设置正确

**问题2：样式丢失**
- 检查 `package.json` 中的 `homepage` 字段是否正确
- 重新部署

### 📱 移动端访问

该应用已针对移动端优化，支持：
- 响应式设计
- 触摸操作
- 本地存储
- PWA 功能

### 🎮 应用功能

部署后的应用包含：

- ⚗️ **首饰合成系统**：20→35→50→60→70级合成链
- 🔄 **首饰重铸系统**：随机属性重新生成
- ⚔️ **装备系统**：8部位装备，5种品质
- 👹 **妖王挑战**：不同等级Boss，丰富奖励
- 💾 **实时存档**：自动保存游戏进度
- 📱 **移动适配**：完美的手机游戏体验

### 🆘 获取帮助

如果遇到问题，可以：

1. 查看 [GitHub Pages 官方文档](https://docs.github.com/pages)
2. 检查浏览器控制台错误信息
3. 确认所有步骤都正确执行

---

## 🎯 成功部署后

恭喜！你现在拥有了一个运行在免费GitHub Pages上的问道手游首饰打造系统！

**分享链接**：`https://你的用户名.github.io/wendao-jewelry-craft`

享受游戏吧！🎮✨