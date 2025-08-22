import { 
  EQUIPMENT_SLOTS, 
  EQUIPMENT_QUALITY, 
  EQUIPMENT_QUALITY_NAMES,
  EQUIPMENT_QUALITY_COLORS,
  EQUIPMENT_LEVELS, 
  EQUIPMENT_ICONS,
  EQUIPMENT_BASE_STATS,
  ELEMENT_TYPES,
  ELEMENT_NAMES
} from './equipmentConstants';

// 生成唯一ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 生成随机装备
export function generateEquipment(slot, level, quality = EQUIPMENT_QUALITY.WHITE, element = null) {
  if (!EQUIPMENT_LEVELS.includes(level)) {
    level = EQUIPMENT_LEVELS[0]; // 默认30级
  }

  const baseStats = EQUIPMENT_BASE_STATS[slot];
  const icon = EQUIPMENT_ICONS[slot][level];
  
  // 随机选择五行属性
  if (!element) {
    const elements = Object.values(ELEMENT_TYPES);
    element = elements[Math.floor(Math.random() * elements.length)];
  }

  // 根据等级和品质计算属性值
  const baseValue = calculateBaseValue(level, quality);
  const primaryValue = Math.floor(baseValue * (0.8 + Math.random() * 0.4));
  const secondaryValue = Math.floor(baseValue * 0.6 * (0.8 + Math.random() * 0.4));

  const equipment = {
    id: generateId(),
    slot: slot,
    level: level,
    quality: quality,
    element: element,
    name: generateEquipmentName(slot, level, quality, element),
    icon: icon,
    baseStats: {
      primary: {
        name: baseStats.primary,
        value: primaryValue
      },
      secondary: {
        name: baseStats.secondary,
        value: secondaryValue
      }
    },
    additionalStats: generateAdditionalStats(quality),
    createdAt: Date.now()
  };

  return equipment;
}

// 生成装备名称
function generateEquipmentName(slot, level, quality, element) {
  const slotNames = {
    [EQUIPMENT_SLOTS.WEAPON]: ['剑', '刀', '枪', '斧', '锤'],
    [EQUIPMENT_SLOTS.HELMET]: ['冠', '盔', '帽', '巾'],
    [EQUIPMENT_SLOTS.ARMOR]: ['甲', '袍', '衣', '服'],
    [EQUIPMENT_SLOTS.SHOES]: ['靴', '履', '鞋'],
    [EQUIPMENT_SLOTS.NECKLACE]: ['项链', '护符', '项珠'],
    [EQUIPMENT_SLOTS.BRACELET]: ['手镯', '护腕', '臂环'],
    [EQUIPMENT_SLOTS.JADE]: ['玉佩', '玉符', '玉牌'],
    [EQUIPMENT_SLOTS.TREASURE]: ['丹炉', '法器', '宝鼎']
  };

  const qualityPrefixes = {
    [EQUIPMENT_QUALITY.WHITE]: '',
    [EQUIPMENT_QUALITY.BLUE]: '精良',
    [EQUIPMENT_QUALITY.PINK]: '稀有',
    [EQUIPMENT_QUALITY.GOLD]: '史诗',
    [EQUIPMENT_QUALITY.GREEN]: '传说'
  };

  const elementName = ELEMENT_NAMES[element];
  const qualityPrefix = qualityPrefixes[quality];
  const slotName = slotNames[slot][Math.floor(Math.random() * slotNames[slot].length)];
  
  let name = '';
  if (qualityPrefix) {
    name += qualityPrefix;
  }
  name += elementName + slotName;
  
  return name;
}

// 计算基础属性值
function calculateBaseValue(level, quality) {
  const qualityMultipliers = {
    [EQUIPMENT_QUALITY.WHITE]: 1.0,
    [EQUIPMENT_QUALITY.BLUE]: 1.2,
    [EQUIPMENT_QUALITY.PINK]: 1.5,
    [EQUIPMENT_QUALITY.GOLD]: 2.0,
    [EQUIPMENT_QUALITY.GREEN]: 2.5
  };

  const baseValue = level * 10;
  const qualityMultiplier = qualityMultipliers[quality];
  
  return Math.floor(baseValue * qualityMultiplier);
}

// 生成附加属性
function generateAdditionalStats(quality) {
  const statNames = [
    '气血', '法力', '物理攻击', '法术攻击', '物理防御', '法术防御', 
    '速度', '暴击', '命中', '闪避', '抗性'
  ];

  const qualityStatCounts = {
    [EQUIPMENT_QUALITY.WHITE]: 0,
    [EQUIPMENT_QUALITY.BLUE]: Math.random() < 0.3 ? 1 : 0,
    [EQUIPMENT_QUALITY.PINK]: Math.random() < 0.6 ? (Math.random() < 0.5 ? 1 : 2) : 0,
    [EQUIPMENT_QUALITY.GOLD]: 1 + (Math.random() < 0.7 ? 1 : 0) + (Math.random() < 0.3 ? 1 : 0),
    [EQUIPMENT_QUALITY.GREEN]: 2 + (Math.random() < 0.8 ? 1 : 0) + (Math.random() < 0.5 ? 1 : 0)
  };

  const statCount = qualityStatCounts[quality];
  const stats = [];

  for (let i = 0; i < statCount; i++) {
    const statName = statNames[Math.floor(Math.random() * statNames.length)];
    const isSpecial = Math.random() < (quality === EQUIPMENT_QUALITY.GREEN ? 0.3 : 0.1);
    
    stats.push({
      name: statName,
      value: Math.floor(50 + Math.random() * 100),
      quality: isSpecial ? 'special' : 'normal'
    });
  }

  return stats;
}

// 检查装备是否可以升级
export function canUpgradeEquipment(equipment, materials) {
  const currentQuality = equipment.quality;
  const upgradePath = {
    [EQUIPMENT_QUALITY.WHITE]: EQUIPMENT_QUALITY.BLUE,
    [EQUIPMENT_QUALITY.BLUE]: EQUIPMENT_QUALITY.PINK,
    [EQUIPMENT_QUALITY.PINK]: EQUIPMENT_QUALITY.GOLD,
    [EQUIPMENT_QUALITY.GOLD]: EQUIPMENT_QUALITY.GREEN
  };

  if (!upgradePath[currentQuality]) {
    return { canUpgrade: false, reason: '已是最高品质装备' };
  }

  // 检查等级要求
  if (currentQuality === EQUIPMENT_QUALITY.BLUE && equipment.level < 60) {
    return { canUpgrade: false, reason: '需要60级以上装备才能升级到粉色' };
  }

  return { canUpgrade: true, nextQuality: upgradePath[currentQuality] };
}

// 升级装备
export function upgradeEquipment(equipment) {
  const upgradeResult = canUpgradeEquipment(equipment);
  if (!upgradeResult.canUpgrade) {
    return { success: false, message: upgradeResult.reason };
  }

  const successRates = {
    [EQUIPMENT_QUALITY.WHITE]: 1.0,  // 100%
    [EQUIPMENT_QUALITY.BLUE]: 0.6,   // 60%
    [EQUIPMENT_QUALITY.PINK]: 0.5,   // 50%
    [EQUIPMENT_QUALITY.GOLD]: 0.3    // 30%
  };

  const successRate = successRates[equipment.quality];
  const isSuccess = Math.random() < successRate;

  if (isSuccess) {
    const upgradedEquipment = {
      ...equipment,
      quality: upgradeResult.nextQuality,
      name: generateEquipmentName(equipment.slot, equipment.level, upgradeResult.nextQuality, equipment.element),
      baseStats: {
        primary: {
          ...equipment.baseStats.primary,
          value: Math.floor(equipment.baseStats.primary.value * 1.3)
        },
        secondary: {
          ...equipment.baseStats.secondary,
          value: Math.floor(equipment.baseStats.secondary.value * 1.3)
        }
      },
      additionalStats: generateAdditionalStats(upgradeResult.nextQuality)
    };

    return { 
      success: true, 
      equipment: upgradedEquipment,
      message: `装备升级成功！获得${EQUIPMENT_QUALITY_NAMES[upgradeResult.nextQuality]}装备`
    };
  } else {
    return { 
      success: false, 
      message: '装备升级失败，材料已消耗' 
    };
  }
}

// 计算装备战斗力
export function calculateEquipmentPower(equipment) {
  if (!equipment) return 0;

  let power = 0;
  
  // 基础属性贡献
  power += equipment.baseStats.primary.value * 2;
  power += equipment.baseStats.secondary.value * 1.5;
  
  // 附加属性贡献
  if (equipment.additionalStats) {
    equipment.additionalStats.forEach(stat => {
      const multiplier = stat.quality === 'special' ? 3 : 1.5;
      power += stat.value * multiplier;
    });
  }
  
  // 品质加成
  const qualityBonuses = {
    [EQUIPMENT_QUALITY.WHITE]: 1.0,
    [EQUIPMENT_QUALITY.BLUE]: 1.2,
    [EQUIPMENT_QUALITY.PINK]: 1.5,
    [EQUIPMENT_QUALITY.GOLD]: 2.0,
    [EQUIPMENT_QUALITY.GREEN]: 2.5
  };
  
  power *= qualityBonuses[equipment.quality];
  
  return Math.floor(power);
}

// 检查是否为套装（同等级同五行的绿色装备）
export function checkEquipmentSet(equippedItems) {
  const greenEquipment = Object.values(equippedItems).filter(item => 
    item && item.quality === EQUIPMENT_QUALITY.GREEN
  );

  if (greenEquipment.length < 4) return null; // 至少4件才算套装

  // 检查是否同等级同五行
  const firstItem = greenEquipment[0];
  const sameLevel = greenEquipment.every(item => item.level === firstItem.level);
  const sameElement = greenEquipment.every(item => item.element === firstItem.element);

  if (sameLevel && sameElement && greenEquipment.length >= 4) {
    return {
      level: firstItem.level,
      element: firstItem.element,
      pieces: greenEquipment.length,
      setBonus: calculateSetBonus(greenEquipment.length)
    };
  }

  return null;
}

// 计算套装加成
function calculateSetBonus(pieceCount) {
  const bonuses = {
    4: { name: '四件套效果', bonus: 0.2, description: '全属性+20%' },
    6: { name: '六件套效果', bonus: 0.35, description: '全属性+35%' },
    8: { name: '八件套效果', bonus: 0.5, description: '全属性+50%' }
  };

  for (let count = 8; count >= 4; count--) {
    if (pieceCount >= count && bonuses[count]) {
      return bonuses[count];
    }
  }

  return null;
}