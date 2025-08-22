import { ELEMENT_RELATIONS, JEWELRY_NAMES, JEWELRY_ICONS, SYNTHESIS_RULES } from './constants';

// 生成随机首饰
export function generateJewelry(level) {
  const types = ['necklace', 'pendant', 'bracelet'];
  const type = types[Math.floor(Math.random() * types.length)];
  const name = JEWELRY_NAMES[type][level] || `${level}级首饰`;
  
  const jewelry = {
    id: Date.now() + Math.random(),
    type: type,
    name: name,
    level: level,
    baseStats: getBaseStats(type, level),
    additionalStats: []
  };

  // 80级及以上添加附加属性
  if (level >= 80) {
    const attrCount = Math.floor((level - 70) / 10);
    for (let i = 0; i < attrCount; i++) {
      const newAttr = generateRandomAttribute(level, jewelry.additionalStats, type);
      if (newAttr) {
        jewelry.additionalStats.push(newAttr);
      }
    }
  }

  return jewelry;
}

// 获取基础属性
export function getBaseStats(type, level) {
  const baseValues = {
    20: { necklace: 400, pendant: 600, bracelet: 300 },
    35: { necklace: 700, pendant: 1050, bracelet: 525 },
    50: { necklace: 1000, pendant: 1500, bracelet: 750 },
    60: { necklace: 1200, pendant: 1800, bracelet: 900 },
    70: { necklace: 1400, pendant: 2100, bracelet: 1050 },
    80: { necklace: 1600, pendant: 2400, bracelet: 1200 },
    90: { necklace: 1800, pendant: 2700, bracelet: 1350 },
    100: { necklace: 2000, pendant: 3000, bracelet: 1500 },
    110: { necklace: 2300, pendant: 3450, bracelet: 1725 },
    120: { necklace: 2600, pendant: 3900, bracelet: 1950 },
    130: { necklace: 2900, pendant: 4350, bracelet: 2175 },
    140: { necklace: 3200, pendant: 4800, bracelet: 2400 },
    150: { necklace: 3500, pendant: 5250, bracelet: 2625 },
    160: { necklace: 3800, pendant: 5700, bracelet: 2850 }
  };
  
  const values = baseValues[level] || baseValues[20];
  
  switch(type) {
    case 'necklace':
      return { name: '法力', value: values.necklace };
    case 'pendant':
      return { name: '气血', value: values.pendant };
    case 'bracelet':
      return { name: '伤害', value: values.bracelet };
    default:
      return { name: '属性', value: 100 };
  }
}

// 生成随机属性
export function generateRandomAttribute(level = 20, existingAttributes = [], jewelryType = 'necklace') {
  const attributeRange = getAttributeRangeByLevel(level, jewelryType);
  
  const existingNames = existingAttributes.map(attr => attr.name);
  
  const availableAttributes = Object.entries(attributeRange)
    .filter(([name, config]) => {
      if (config.quality === "special" && existingNames.includes(name)) {
        return false;
      }
      return true;
    });

  if (availableAttributes.length === 0) return null;

  const weightedAttributes = [];
  availableAttributes.forEach(([name, config]) => {
    for (let i = 0; i < config.weight; i++) {
      weightedAttributes.push([name, config]);
    }
  });

  const [selectedName, selectedConfig] = weightedAttributes[Math.floor(Math.random() * weightedAttributes.length)];
  const value = Math.floor(Math.random() * (selectedConfig.max - selectedConfig.min + 1)) + selectedConfig.min;

  return {
    name: selectedName,
    value: value,
    unit: selectedConfig.unit || '',
    quality: selectedConfig.quality || 'normal'
  };
}

// 根据等级和首饰类型获取属性范围
export function getAttributeRangeByLevel(level, jewelryType) {
  // 等级成长系数计算
  const growth = {
    min: Math.floor(level * 0.4) + 10,
    max: Math.floor(level * 0.8) + 20
  };
  
  const baseAttributes = {
    "力量": { min: growth.min, max: growth.max, weight: 20 },
    "体质": { min: growth.min, max: growth.max, weight: 20 },
    "灵力": { min: growth.min, max: growth.max, weight: 20 },
    "敏捷": { min: growth.min, max: growth.max, weight: 20 },
    "所有相性": { min: 1, max: 5, weight: 10, quality: "special" },
    "忽视所有抗异常": { min: 5, max: 20, weight: 8, quality: "special", unit: "%" },
    "所有技能提升": { min: 1, max: 10, weight: 5, quality: "special" }
  };

  // 根据首饰类型添加特定属性
  if (jewelryType === 'necklace' || jewelryType === 'pendant') {
    return {
      ...baseAttributes,
      "金抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "木抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "水抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "火抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "土抗性": { min: 5, max: 15, weight: 15, unit: "%" }
    };
  } else if (jewelryType === 'bracelet') {
    return {
      ...baseAttributes,
      "忽视目标金抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "忽视目标木抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "忽视目标水抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "忽视目标火抗性": { min: 5, max: 15, weight: 15, unit: "%" },
      "忽视目标土抗性": { min: 5, max: 15, weight: 15, unit: "%" }
    };
  }

  return baseAttributes;
}

// 计算角色对首饰的加成
export function calculateCharacterBonus(character, jewelry) {
  if (!character || !character.element) {
    return 1.0;
  }
  
  let bonus = 1.0;
  
  // 基础属性加成
  const totalAttributes = character.attributes.strength + character.attributes.constitution + 
                        character.attributes.spirit + character.attributes.agility;
  bonus += totalAttributes * 0.001;
  
  // 五行精通加成
  if (character.element) {
    const elementBonus = character.elementAttributes[character.element] * 0.02;
    bonus += elementBonus;
    
    // 相生相克加成
    const generate = ELEMENT_RELATIONS.generate[character.element];
    const overcome = ELEMENT_RELATIONS.overcome[character.element];
    
    const generateBonus = character.elementAttributes[generate] * 0.01;
    const overcomeBonus = character.elementAttributes[overcome] * 0.015;
    
    bonus += generateBonus + overcomeBonus;
  }
  
  // 等级加成
  bonus += (character.level - 1) * 0.005;
  
  return Math.min(bonus, 2.0);
}

// 升级首饰
export function upgradeJewelry(originalJewelry, newLevel) {
  const upgradedJewelry = {
    ...originalJewelry,
    id: Date.now() + Math.random(),
    name: JEWELRY_NAMES[originalJewelry.type][newLevel] || `${newLevel}级首饰`,
    level: newLevel,
    baseStats: getBaseStats(originalJewelry.type, newLevel),
    additionalStats: [...originalJewelry.additionalStats]
  };

  // 如果新等级应该有更多属性，添加一条新属性
  const shouldHaveAttrCount = Math.floor((newLevel - 70) / 10);
  const currentAttrCount = upgradedJewelry.additionalStats.length;
  
  if (shouldHaveAttrCount > currentAttrCount) {
    const newAttr = generateRandomAttribute(newLevel, upgradedJewelry.additionalStats, originalJewelry.type);
    if (newAttr) {
      upgradedJewelry.additionalStats.push(newAttr);
    }
  }

  return upgradedJewelry;
}

// 检查合成规则
export function checkSynthesisRules(synthesisSlots, jewelryItems) {
  const filledSlots = synthesisSlots.filter(slot => slot !== null);
  const filledCount = filledSlots.length;
  
  if (filledCount === 0) return { valid: false, message: "请放入首饰或材料" };
  
  const jewelrySlots = filledSlots.filter(slot => slot && slot.type === 'jewelry');
  const stoneSlots = filledSlots.filter(slot => slot && slot.type === 'superStone');
  
  if (jewelrySlots.length === 0) return { valid: false, message: "至少需要一个首饰" };
  
  const firstJewelrySlot = jewelrySlots[0];
  const firstJewelry = jewelryItems[firstJewelrySlot.index];
  
  // 20-60级合成规则
  if (firstJewelry.level >= 20 && firstJewelry.level <= 60) {
    if (jewelrySlots.length !== 3) {
      return { valid: false, message: `${firstJewelry.level}级首饰需要3个同类型同等级首饰` };
    }
    
    // 检查是否同类型同等级
    const allSameTypeAndLevel = jewelrySlots.every(slot => {
      const jewelry = jewelryItems[slot.index];
      return jewelry.type === firstJewelry.type && jewelry.level === firstJewelry.level;
    });
    
    if (!allSameTypeAndLevel) {
      return { valid: false, message: "需要3个相同类型和等级的首饰" };
    }
    
    return { valid: true, rule: 'level20to60' };
  }
  
  // 70级合成规则
  if (firstJewelry.level === 70) {
    if (jewelrySlots.length !== 1 || stoneSlots.length !== 2) {
      return { valid: false, message: "70级首饰需要1个首饰 + 2个女娲石" };
    }
    return { valid: true, rule: 'level70' };
  }
  
  // 80-100级合成规则
  if (firstJewelry.level >= 80 && firstJewelry.level <= 100) {
    if (jewelrySlots.length !== 1 || stoneSlots.length !== 2) {
      return { valid: false, message: `${firstJewelry.level}级首饰需要1个首饰 + 2个女娲石` };
    }
    return { valid: true, rule: 'level80to100' };
  }
  
  // 110-140级合成规则
  if (firstJewelry.level >= 110 && firstJewelry.level <= 140) {
    if (jewelrySlots.length !== 3) {
      return { valid: false, message: `${firstJewelry.level}级首饰需要1个当前等级 + 2个70级同类型首饰` };
    }
    
    const supportJewelry = jewelrySlots.slice(1);
    const allSupport70 = supportJewelry.every(slot => {
      const jewelry = jewelryItems[slot.index];
      return jewelry.level === 70 && jewelry.type === firstJewelry.type;
    });
    
    if (!allSupport70) {
      return { valid: false, message: "需要2个70级同类型首饰作为材料" };
    }
    
    return { valid: true, rule: 'level110to140' };
  }
  
  if (firstJewelry.level >= 150) {
    return { valid: false, message: "150级已是最高等级，无法继续合成" };
  }
  
  return { valid: false, message: "未知的合成规则" };
}

// 执行合成
export function performSynthesis(synthesisSlots, jewelryItems, superStone, rule) {
  const jewelrySlots = synthesisSlots.filter(slot => slot && slot.type === 'jewelry');
  const firstJewelry = jewelryItems[jewelrySlots[0].index];
  
  let successRate = 1.0;
  let nextLevel;
  
  // 正确的合成等级规则：20→35→50→60→70
  const levelMap = {
    20: 35,
    35: 50, 
    50: 60,
    60: 70
  };
  
  switch (rule) {
    case 'level20to60':
      successRate = 1.0;
      nextLevel = levelMap[firstJewelry.level];
      break;
    case 'level70':
      successRate = 0.95;
      nextLevel = 80;
      break;
    case 'level80to100':
      const rates = { 80: 0.95, 90: 0.90, 100: 0.70 };
      successRate = rates[firstJewelry.level] || 0.70;
      nextLevel = firstJewelry.level + 10;
      break;
    case 'level110to140':
      successRate = 1.0;
      nextLevel = firstJewelry.level + 10;
      break;
  }
  
  const isSuccess = Math.random() < successRate;
  
  if (isSuccess) {
    const newJewelry = upgradeJewelry(firstJewelry, nextLevel);
    return { success: true, jewelry: newJewelry, consumed: jewelrySlots.map(slot => slot.index) };
  } else {
    return { success: false, consumed: jewelrySlots.slice(1).map(slot => slot.index) };
  }
}

// 重铸首饰
export function recastJewelry(jewelry) {
  const recastedJewelry = {
    ...jewelry,
    additionalStats: []
  };
  
  // 重新生成附加属性
  if (jewelry.level >= 80) {
    const attrCount = Math.floor((jewelry.level - 70) / 10);
    for (let i = 0; i < attrCount; i++) {
      const newAttr = generateRandomAttribute(jewelry.level, recastedJewelry.additionalStats, jewelry.type);
      if (newAttr) {
        recastedJewelry.additionalStats.push(newAttr);
      }
    }
  }
  
  return recastedJewelry;
}