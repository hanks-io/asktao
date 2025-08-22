// 问道手游装备系统常量定义

// 装备部位
export const EQUIPMENT_SLOTS = {
  WEAPON: 'weapon',        // 武器
  HELMET: 'helmet',        // 帽子/头盔
  ARMOR: 'armor',          // 衣服
  SHOES: 'shoes',          // 鞋子
  NECKLACE: 'necklace',    // 项链
  BRACELET: 'bracelet',    // 手镯
  JADE: 'jade',            // 玉佩
  TREASURE: 'treasure'     // 丹炉/法宝
};

// 装备槽位名称
export const EQUIPMENT_SLOT_NAMES = {
  [EQUIPMENT_SLOTS.WEAPON]: '武器',
  [EQUIPMENT_SLOTS.HELMET]: '帽子',
  [EQUIPMENT_SLOTS.ARMOR]: '衣服',
  [EQUIPMENT_SLOTS.SHOES]: '鞋子',
  [EQUIPMENT_SLOTS.NECKLACE]: '项链',
  [EQUIPMENT_SLOTS.BRACELET]: '手镯',
  [EQUIPMENT_SLOTS.JADE]: '玉佩',
  [EQUIPMENT_SLOTS.TREASURE]: '丹炉'
};

// 装备槽位默认图标（空槽位时显示）
export const EQUIPMENT_SLOT_ICONS = {
  [EQUIPMENT_SLOTS.WEAPON]: '⚔️',
  [EQUIPMENT_SLOTS.HELMET]: '🪖',
  [EQUIPMENT_SLOTS.ARMOR]: '🥼',
  [EQUIPMENT_SLOTS.SHOES]: '👟',
  [EQUIPMENT_SLOTS.NECKLACE]: '📿',
  [EQUIPMENT_SLOTS.BRACELET]: '💍',
  [EQUIPMENT_SLOTS.JADE]: '🔮',
  [EQUIPMENT_SLOTS.TREASURE]: '🏺'
};

// 装备品质等级（按升级顺序）
export const EQUIPMENT_QUALITY = {
  WHITE: 'white',    // 白色装备
  BLUE: 'blue',      // 蓝色装备
  PINK: 'pink',      // 粉色装备
  GOLD: 'gold',      // 黄金装备
  GREEN: 'green'     // 绿色装备（最高级）
};

// 装备品质名称
export const EQUIPMENT_QUALITY_NAMES = {
  [EQUIPMENT_QUALITY.WHITE]: '白色',
  [EQUIPMENT_QUALITY.BLUE]: '蓝色',
  [EQUIPMENT_QUALITY.PINK]: '粉色',
  [EQUIPMENT_QUALITY.GOLD]: '黄金',
  [EQUIPMENT_QUALITY.GREEN]: '绿色'
};

// 装备品质颜色
export const EQUIPMENT_QUALITY_COLORS = {
  [EQUIPMENT_QUALITY.WHITE]: '#CCCCCC',
  [EQUIPMENT_QUALITY.BLUE]: '#4A90E2',
  [EQUIPMENT_QUALITY.PINK]: '#FF69B4',
  [EQUIPMENT_QUALITY.GOLD]: '#FFD700',
  [EQUIPMENT_QUALITY.GREEN]: '#32CD32'
};

// 装备等级范围
export const EQUIPMENT_LEVELS = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];

// 装备图标
export const EQUIPMENT_ICONS = {
  [EQUIPMENT_SLOTS.WEAPON]: {
    30: '⚔️', 40: '🗡️', 50: '⚔️', 60: '🗡️', 70: '⚔️', 
    80: '🗡️', 90: '⚔️', 100: '🗡️', 110: '⚔️', 120: '🗡️',
    130: '⚔️', 140: '🗡️', 150: '⚔️'
  },
  [EQUIPMENT_SLOTS.HELMET]: {
    30: '🪖', 40: '⛑️', 50: '🪖', 60: '⛑️', 70: '🪖',
    80: '⛑️', 90: '🪖', 100: '⛑️', 110: '🪖', 120: '⛑️',
    130: '🪖', 140: '⛑️', 150: '🪖'
  },
  [EQUIPMENT_SLOTS.ARMOR]: {
    30: '🥼', 40: '👔', 50: '🥼', 60: '👔', 70: '🥼',
    80: '👔', 90: '🥼', 100: '👔', 110: '🥼', 120: '👔',
    130: '🥼', 140: '👔', 150: '🥼'
  },
  [EQUIPMENT_SLOTS.SHOES]: {
    30: '👟', 40: '🥾', 50: '👟', 60: '🥾', 70: '👟',
    80: '🥾', 90: '👟', 100: '🥾', 110: '👟', 120: '🥾',
    130: '👟', 140: '🥾', 150: '👟'
  },
  [EQUIPMENT_SLOTS.NECKLACE]: {
    30: '📿', 40: '💎', 50: '📿', 60: '💎', 70: '📿',
    80: '💎', 90: '📿', 100: '💎', 110: '📿', 120: '💎',
    130: '📿', 140: '💎', 150: '📿'
  },
  [EQUIPMENT_SLOTS.BRACELET]: {
    30: '💍', 40: '⌚', 50: '💍', 60: '⌚', 70: '💍',
    80: '⌚', 90: '💍', 100: '⌚', 110: '💍', 120: '⌚',
    130: '💍', 140: '⌚', 150: '💍'
  },
  [EQUIPMENT_SLOTS.JADE]: {
    30: '🔮', 40: '💠', 50: '🔮', 60: '💠', 70: '🔮',
    80: '💠', 90: '🔮', 100: '💠', 110: '🔮', 120: '💠',
    130: '🔮', 140: '💠', 150: '🔮'
  },
  [EQUIPMENT_SLOTS.TREASURE]: {
    30: '🏺', 40: '⚱️', 50: '🏺', 60: '⚱️', 70: '🏺',
    80: '⚱️', 90: '🏺', 100: '⚱️', 110: '🏺', 120: '⚱️',
    130: '🏺', 140: '⚱️', 150: '🏺'
  }
};

// 装备基础属性
export const EQUIPMENT_BASE_STATS = {
  [EQUIPMENT_SLOTS.WEAPON]: {
    primary: '物理攻击',
    secondary: '法术攻击'
  },
  [EQUIPMENT_SLOTS.HELMET]: {
    primary: '物理防御',
    secondary: '法术防御'
  },
  [EQUIPMENT_SLOTS.ARMOR]: {
    primary: '物理防御',
    secondary: '法术防御'
  },
  [EQUIPMENT_SLOTS.SHOES]: {
    primary: '速度',
    secondary: '物理防御'
  },
  [EQUIPMENT_SLOTS.NECKLACE]: {
    primary: '气血',
    secondary: '法力'
  },
  [EQUIPMENT_SLOTS.BRACELET]: {
    primary: '物理攻击',
    secondary: '法术攻击'
  },
  [EQUIPMENT_SLOTS.JADE]: {
    primary: '气血',
    secondary: '法力'
  },
  [EQUIPMENT_SLOTS.TREASURE]: {
    primary: '法术攻击',
    secondary: '法力'
  }
};

// 装备升级材料
export const EQUIPMENT_UPGRADE_MATERIALS = {
  [EQUIPMENT_QUALITY.WHITE]: {
    next: EQUIPMENT_QUALITY.BLUE,
    materials: [{ name: '黑水', count: 1 }],
    successRate: 1.0,
    description: '白色装备+黑水=蓝色装备（100%成功）'
  },
  [EQUIPMENT_QUALITY.BLUE]: {
    next: EQUIPMENT_QUALITY.PINK,
    materials: [
      { name: '粉水晶', count: 1 },
      { name: '金色材料', count: 3 }
    ],
    successRate: 0.6,
    levelRequirement: 60,
    description: '蓝色装备+粉水晶+3个金色材料=粉色装备（60级以上才能升级）'
  },
  [EQUIPMENT_QUALITY.PINK]: {
    next: EQUIPMENT_QUALITY.GOLD,
    materials: [{ name: '黄水晶', count: 2 }],
    successRate: 0.5,
    description: '粉色装备+2个黄水晶=金色装备'
  },
  [EQUIPMENT_QUALITY.GOLD]: {
    next: EQUIPMENT_QUALITY.GREEN,
    materials: [
      { name: '绿水晶', count: 1 },
      { name: '金色材料', count: 5 }
    ],
    successRate: 0.3,
    description: '金色装备+1个绿水晶+5个金色材料=绿色装备'
  }
};

// 五行属性
export const ELEMENT_TYPES = {
  GOLD: 'gold',    // 金
  WOOD: 'wood',    // 木
  WATER: 'water',  // 水
  FIRE: 'fire',    // 火
  EARTH: 'earth'   // 土
};

export const ELEMENT_NAMES = {
  [ELEMENT_TYPES.GOLD]: '金',
  [ELEMENT_TYPES.WOOD]: '木',
  [ELEMENT_TYPES.WATER]: '水',
  [ELEMENT_TYPES.FIRE]: '火',
  [ELEMENT_TYPES.EARTH]: '土'
};

export const ELEMENT_COLORS = {
  [ELEMENT_TYPES.GOLD]: '#FFD700',
  [ELEMENT_TYPES.WOOD]: '#32CD32',
  [ELEMENT_TYPES.WATER]: '#1E90FF',
  [ELEMENT_TYPES.FIRE]: '#FF4500',
  [ELEMENT_TYPES.EARTH]: '#D2B48C'
};