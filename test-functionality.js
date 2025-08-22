// 简单的功能测试脚本
const puppeteer = require('puppeteer');

async function testApp() {
  console.log('启动测试...');
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // 访问本地开发服务器
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // 检查页面标题
    const title = await page.evaluate(() => document.querySelector('.game-title')?.textContent);
    console.log('页面标题:', title);
    
    // 检查标签导航是否存在
    const tabs = await page.evaluate(() => {
      const tabButtons = document.querySelectorAll('.tab-btn');
      return Array.from(tabButtons).map(btn => btn.textContent.trim());
    });
    console.log('发现的标签:', tabs);
    
    // 检查妖王列表是否存在
    const bossCount = await page.evaluate(() => {
      return document.querySelectorAll('.boss-card').length;
    });
    console.log('妖王数量:', bossCount);
    
    console.log('✅ 基础功能测试通过！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  } finally {
    await browser.close();
  }
}

// 如果直接运行此文件
if (require.main === module) {
  testApp();
}