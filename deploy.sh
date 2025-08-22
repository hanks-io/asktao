#!/bin/bash

# 问道手游首饰打造系统 - GitHub Pages 部署脚本
# 作者：Claude Code
# 说明：自动化部署到 GitHub Pages

echo "🚀 开始部署问道手游首饰打造系统到 GitHub Pages..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误：请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查是否是git仓库
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  未检测到git仓库，正在初始化...${NC}"
    git init
    echo -e "${GREEN}✅ Git仓库初始化完成${NC}"
fi

# 检查是否有远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null)
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  未检测到远程仓库${NC}"
    echo -e "${BLUE}请先添加GitHub远程仓库：${NC}"
    echo "git remote add origin https://github.com/[你的用户名]/wendao-jewelry-craft.git"
    echo ""
    read -p "请输入你的GitHub仓库URL: " REPO_URL
    if [ ! -z "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo -e "${GREEN}✅ 远程仓库添加成功${NC}"
    else
        echo -e "${RED}❌ 错误：必须提供仓库URL${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ 检测到远程仓库：$REMOTE_URL${NC}"
fi

# 检查工作区是否干净
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  检测到未提交的更改，正在提交...${NC}"
    git add .
    git commit -m "🚀 准备部署到GitHub Pages

✨ 功能特性：
- 问道手游首饰打造系统
- 装备系统完整实现
- 妖王挑战系统
- 实时存档功能
- 响应式移动端设计

🛠️ 技术栈：
- React 19 + Redux Toolkit
- 本地存储持久化
- CSS-in-JS样式

🎮 Generated with Claude Code"
    echo -e "${GREEN}✅ 代码提交完成${NC}"
fi

# 推送到main分支
echo -e "${BLUE}📤 正在推送代码到main分支...${NC}"
git push -u origin main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 代码推送成功${NC}"
else
    echo -e "${YELLOW}⚠️  推送可能失败，继续部署...${NC}"
fi

# 构建和部署
echo -e "${BLUE}🔨 正在构建项目...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败，请检查代码${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 项目构建成功${NC}"

echo -e "${BLUE}🌐 正在部署到GitHub Pages...${NC}"
npm run deploy
if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 部署成功！${NC}"
    echo ""
    echo -e "${BLUE}📱 你的应用已部署到：${NC}"
    echo -e "${GREEN}https://$(git remote get-url origin | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')${NC}"
    echo ""
    echo -e "${YELLOW}📝 注意事项：${NC}"
    echo "1. 首次部署可能需要几分钟生效"
    echo "2. 确保GitHub仓库设置中启用了Pages功能"
    echo "3. Pages设置选择 'gh-pages' 分支作为源"
    echo ""
    echo -e "${BLUE}🔧 如需自定义域名，请在GitHub仓库设置中配置${NC}"
else
    echo -e "${RED}❌ 部署失败${NC}"
    echo -e "${YELLOW}💡 常见解决方案：${NC}"
    echo "1. 检查GitHub仓库权限"
    echo "2. 确保package.json中的homepage字段正确"
    echo "3. 检查网络连接"
    exit 1
fi

echo -e "${GREEN}🎮 问道手游首饰打造系统部署完成！${NC}"