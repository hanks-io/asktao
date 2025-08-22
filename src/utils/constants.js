// 五行相克相生关系
export const ELEMENT_RELATIONS = {
  generate: { // 相生 - 原版配置
    金: '水', 木: '火', 水: '木', 火: '土', 土: '金'
  },
  overcome: { // 相克
    金: '木', 木: '土', 水: '火', 火: '金', 土: '水'
  },
  colors: {
    金: '#FFD700', 木: '#90EE90', 水: '#87CEEB', 火: '#FF6347', 土: '#DEB887'
  }
};

// 首饰类型
export const JEWELRY_TYPES = {
  necklace: '项链',
  pendant: '玉佩', 
  bracelet: '手镯'
};

// 装备部位
export const EQUIPMENT_SLOTS = {
  weapon: '武器',
  hat: '帽子',
  clothes: '衣服',
  shoes: '鞋子'
};

// 首饰名称配置 - 原版配置
export const JEWELRY_NAMES = {
  necklace: {
    20: "青珑挂珠", 35: "紫晶坠子", 50: "三才项圈", 60: "幻彩项链", 70: "雪魂丝链",
    80: "天机锁链", 90: "秘魔灵珠", 100: "金碧莲花", 110: "流光绝影", 120: "五蕴悯光",
    130: "九天玄音", 140: "太极混元链", 150: "鸿蒙天珠", 160: "无极星宿链"
  },
  pendant: {
    20: "纹龙佩", 35: "温玉玦", 50: "血心石", 60: "八角晶牌", 70: "蟠螭结",
    80: "七龙珠", 90: "金蝉宝囊", 100: "通灵宝玉", 110: "寒玉龙钩", 120: "八宝如意",
    130: "九转玄玉", 140: "乾坤造化佩", 150: "混沌神符", 160: "太虚至尊印"
  },
  bracelet: {
    20: "金刚手镯", 35: "七星手链", 50: "凤舞环", 60: "龙鳞手镯", 70: "法文手轮",
    80: "闭月双环", 90: "三清手镯", 100: "天星奇光", 110: "碎梦涵光", 120: "九天霜华",
    130: "轮回圣镯", 140: "万法归一环", 150: "洪荒神镯", 160: "永恒时空轮"
  }
};

// 首饰图标
export const JEWELRY_ICONS = {
  necklace: {
    20: "📿", 35: "💚", 50: "✨", 60: "🐲", 70: "🦅", 80: "⭐", 90: "🌟", 100: "💫",
    110: "👑", 120: "💎", 130: "🏆", 140: "🎖️", 150: "🔮", 160: "🌌"
  },
  pendant: {
    20: "🟢", 35: "🔷", 50: "💠", 60: "🔶", 70: "🔸", 80: "💫", 90: "⭐", 100: "🌟",
    110: "💎", 120: "👑", 130: "🏆", 140: "🎖️", 150: "🔮", 160: "🌌"
  },
  bracelet: {
    20: "⚪", 35: "🟡", 50: "🔵", 60: "🟠", 70: "🔴", 80: "💜", 90: "🖤", 100: "🤍",
    110: "💛", 120: "💚", 130: "💙", 140: "🤎", 150: "🔮", 160: "🌌"
  }
};

// 妖王配置 - 原版配置
export const BOSS_CONFIG = [
  { name: "雷震子", level: 20, hp: "1.2万", power: "800", drops: { normalStone: 0.8, jewelry: 0.9 } },
  { name: "黑山老妖", level: 35, hp: "3.5万", power: "1500", drops: { normalStone: 0.75, jewelry: 0.9 } },
  { name: "白骨精", level: 50, hp: "8.2万", power: "2800", drops: { normalStone: 0.7, jewelry: 0.9 } },
  { name: "牛魔王", level: 60, hp: "15万", power: "4200", drops: { normalStone: 0.65, jewelry: 0.9 } },
  { name: "赤炎魔君", level: 70, hp: "28万", power: "6500", drops: { normalStone: 0.6, jewelry: 0.9 } },
  { name: "九尾妖狐", level: 80, hp: "45万", power: "9800", drops: { superStone: 0.7, jewelry: 0.9 } },
  { name: "千年树妖", level: 90, hp: "72万", power: "15000", drops: { superStone: 0.75, jewelry: 0.9 } },
  { name: "上古妖王", level: 100, hp: "120万", power: "25000", drops: { superStone: 0.8, jewelry: 0.9 } },
  { name: "混沌妖尊", level: 110, hp: "200万", power: "42000", drops: { superStone: 0.85, jewelry: 0.9 } }
];

// 妖王首饰掉落配置 - 原版配置
export const BOSS_JEWELRY_DROP_CONFIG = {
  20: {  // 雷震子 (简单) - 主要爆20级
    jewelryLevels: [
      { level: 20, weight: 100, amount: { min: 3, max: 6 } }
    ]
  },
  35: {  // 黑山老妖 (容易) - 主要爆20-35级
    jewelryLevels: [
      { level: 20, weight: 60, amount: { min: 2, max: 4 } },
      { level: 35, weight: 40, amount: { min: 2, max: 4 } }
    ]
  },
  50: {  // 白骨精 (一般) - 主要爆35-50级
    jewelryLevels: [
      { level: 20, weight: 20, amount: { min: 1, max: 2 } },
      { level: 35, weight: 50, amount: { min: 2, max: 3 } },
      { level: 50, weight: 30, amount: { min: 1, max: 3 } }
    ]
  },
  60: {  // 牛魔王 (困难) - 主要爆50-60级
    jewelryLevels: [
      { level: 35, weight: 20, amount: { min: 1, max: 2 } },
      { level: 50, weight: 50, amount: { min: 1, max: 3 } },
      { level: 60, weight: 30, amount: { min: 1, max: 2 } }
    ]
  },
  70: {  // 赤炎魔君 (很难) - 主要爆60-70级
    jewelryLevels: [
      { level: 50, weight: 20, amount: { min: 1, max: 2 } },
      { level: 60, weight: 50, amount: { min: 1, max: 2 } },
      { level: 70, weight: 30, amount: { min: 1, max: 2 } }
    ]
  },
  80: {  // 九尾妖狐 (极难) - 必爆70级
    jewelryLevels: [
      { level: 60, weight: 30, amount: { min: 1, max: 1 } },
      { level: 70, weight: 70, amount: { min: 1, max: 2 } }
    ]
  },
  90: {  // 千年树妖 (地狱) - 必爆70级
    jewelryLevels: [
      { level: 70, weight: 100, amount: { min: 1, max: 2 } }
    ]
  },
  100: { // 上古妖王 (噩梦) - 必爆70级
    jewelryLevels: [
      { level: 70, weight: 100, amount: { min: 1, max: 3 } }
    ]
  },
  110: { // 混沌妖尊 (终极) - 必爆70级，数量最多
    jewelryLevels: [
      { level: 70, weight: 100, amount: { min: 2, max: 3 } }
    ]
  }
};

// 合成规则
export const SYNTHESIS_RULES = {
  level20to60: {
    materials: 3,
    sameType: true,
    sameLevel: true,
    successRate: 1.0,
    description: "3个同类型同等级首饰 (100%成功)"
  },
  level70: {
    materials: { jewelry: 1, stones: 2 },
    successRate: 0.95,
    description: "1个70级首饰 + 2个女娲石 = 80级 (95%成功)"
  },
  level80to100: {
    materials: { jewelry: 1, stones: 2 },
    successRates: { 80: 0.95, 90: 0.90, 100: 0.70 },
    description: "1个当前等级首饰 + 2个女娲石"
  },
  level110to140: {
    materials: { mainJewelry: 1, supportJewelry: 2 },
    supportLevel: 70,
    successRate: 1.0,
    description: "1个当前等级首饰 + 2个70级首饰 (100%成功)"
  }
};

// 属性名称映射
export const ATTRIBUTE_NAMES = {
  strength: '力量',
  constitution: '体质',
  spirit: '灵力',
  agility: '敏捷'
};

// 游戏常量
export const GAME_CONSTANTS = {
  MAX_LEVEL: 150,
  POINTS_PER_LEVEL: 4,
  ELEMENT_POINTS_PER_LEVEL: 1,
  MAX_CHARACTER_BONUS: 2.0,
  MAX_JEWELRY_LEVEL: 160,
  SYNTHESIS_SLOTS: 3,
  RECAST_SLOTS: 3,
};