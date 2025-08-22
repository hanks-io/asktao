import { createSlice } from '@reduxjs/toolkit';
import {
  EQUIPMENT_SLOTS,
  EQUIPMENT_QUALITY,
  EQUIPMENT_UPGRADE_MATERIALS,
  ELEMENT_NAMES
} from '../utils/equipmentConstants';
import {
  generateEquipment,
  canUpgradeEquipment,
  upgradeEquipment as upgradeEquipmentLogic,
  calculateEquipmentPower,
  checkEquipmentSet
} from '../utils/equipmentLogic';

// 初始状态
const initialState = {
  // 装备槽位
  slots: {
    [EQUIPMENT_SLOTS.WEAPON]: null,
    [EQUIPMENT_SLOTS.HELMET]: null,
    [EQUIPMENT_SLOTS.ARMOR]: null,
    [EQUIPMENT_SLOTS.SHOES]: null,
    [EQUIPMENT_SLOTS.NECKLACE]: null,
    [EQUIPMENT_SLOTS.BRACELET]: null,
    [EQUIPMENT_SLOTS.JADE]: null,
    [EQUIPMENT_SLOTS.TREASURE]: null
  },
  // 装备背包
  inventory: [],
  // 套装信息
  setInfo: null,
  // 总战斗力
  totalPower: 0,
  // 升级材料库存
  materials: {
    '黑水': 0,
    '粉水晶': 0,
    '黄水晶': 0,
    '绿水晶': 0,
    '金色材料': 0,
    '强化石': 0,
    '强化卷轴': 0
  },
  // 最近获得的装备（用于显示通知）
  recentDrop: null
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    // 装备物品
    equipItem: (state, action) => {
      const { slot, equipment } = action.payload;
      
      if (!Object.values(EQUIPMENT_SLOTS).includes(slot)) {
        console.error('Invalid equipment slot:', slot);
        return;
      }

      // 如果当前槽位有装备，将其移回背包
      if (state.slots[slot]) {
        state.inventory.push(state.slots[slot]);
      }

      // 装备新物品
      state.slots[slot] = equipment;

      // 从背包中移除装备的物品
      const inventoryIndex = state.inventory.findIndex(item => item.id === equipment.id);
      if (inventoryIndex !== -1) {
        state.inventory.splice(inventoryIndex, 1);
      }

      // 重新计算套装和战斗力
      equipmentSlice.caseReducers.updateSetInfo(state);
      equipmentSlice.caseReducers.updateTotalPower(state);
    },

    // 卸下装备
    unequipItem: (state, action) => {
      const { slot } = action.payload;
      
      if (!state.slots[slot]) {
        return;
      }

      // 将装备放回背包
      state.inventory.push(state.slots[slot]);
      state.slots[slot] = null;

      // 重新计算套装和战斗力
      equipmentSlice.caseReducers.updateSetInfo(state);
      equipmentSlice.caseReducers.updateTotalPower(state);
    },

    // 添加装备到背包
    addToInventory: (state, action) => {
      const equipment = action.payload;
      state.inventory.push(equipment);
      
      // 设置为最近获得的装备
      state.recentDrop = equipment;
    },

    // 从背包移除装备
    removeFromInventory: (state, action) => {
      const { index, id } = action.payload;
      
      if (index !== undefined) {
        state.inventory.splice(index, 1);
      } else if (id) {
        const itemIndex = state.inventory.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
          state.inventory.splice(itemIndex, 1);
        }
      }
    },

    // 生成随机装备（Boss掉落等）
    generateRandomEquipment: (state, action) => {
      const { slot, level, quality, element } = action.payload;
      const equipment = generateEquipment(slot, level, quality, element);
      state.inventory.push(equipment);
      state.recentDrop = equipment;
    },

    // 批量生成装备（Boss掉落多个装备）
    generateMultipleEquipment: (state, action) => {
      const { equipmentList } = action.payload;
      const generatedEquipment = [];
      
      equipmentList.forEach(config => {
        const equipment = generateEquipment(
          config.slot, 
          config.level, 
          config.quality, 
          config.element
        );
        state.inventory.push(equipment);
        generatedEquipment.push(equipment);
      });
      
      // 设置最后一个为最近获得
      if (generatedEquipment.length > 0) {
        state.recentDrop = generatedEquipment[generatedEquipment.length - 1];
      }
    },

    // 升级装备
    upgradeEquipment: (state, action) => {
      const { equipmentId, fromInventory } = action.payload;
      let equipment = null;
      let equipmentLocation = null;

      // 查找装备位置
      if (fromInventory) {
        const inventoryIndex = state.inventory.findIndex(item => item.id === equipmentId);
        if (inventoryIndex !== -1) {
          equipment = state.inventory[inventoryIndex];
          equipmentLocation = { type: 'inventory', index: inventoryIndex };
        }
      } else {
        // 在装备槽中查找
        for (const [slot, equippedItem] of Object.entries(state.slots)) {
          if (equippedItem && equippedItem.id === equipmentId) {
            equipment = equippedItem;
            equipmentLocation = { type: 'slot', slot };
            break;
          }
        }
      }

      if (!equipment) {
        return;
      }

      // 检查是否可以升级
      const canUpgrade = canUpgradeEquipment(equipment, state.materials);
      if (!canUpgrade.canUpgrade) {
        return;
      }

      // 检查材料是否足够
      const requiredMaterials = EQUIPMENT_UPGRADE_MATERIALS[equipment.quality];
      if (requiredMaterials) {
        for (const material of requiredMaterials.materials) {
          if (state.materials[material.name] < material.count) {
            return;
          }
        }
      }

      // 执行升级
      const upgradeResult = upgradeEquipmentLogic(equipment);
      
      if (upgradeResult.success) {
        // 消耗材料
        if (requiredMaterials) {
          requiredMaterials.materials.forEach(material => {
            state.materials[material.name] -= material.count;
          });
        }

        // 更新装备
        if (equipmentLocation.type === 'inventory') {
          state.inventory[equipmentLocation.index] = upgradeResult.equipment;
        } else {
          state.slots[equipmentLocation.slot] = upgradeResult.equipment;
          // 重新计算套装和战斗力
          equipmentSlice.caseReducers.updateSetInfo(state);
          equipmentSlice.caseReducers.updateTotalPower(state);
        }
      } else {
        // 升级失败仍然消耗材料
        if (requiredMaterials) {
          requiredMaterials.materials.forEach(material => {
            state.materials[material.name] -= material.count;
          });
        }
      }
    },

    // 添加材料
    addMaterials: (state, action) => {
      const { materials } = action.payload;
      
      Object.entries(materials).forEach(([materialName, count]) => {
        if (state.materials.hasOwnProperty(materialName)) {
          state.materials[materialName] += count;
        } else {
          state.materials[materialName] = count;
        }
      });
    },

    // 使用材料
    useMaterials: (state, action) => {
      const { materials } = action.payload;
      
      Object.entries(materials).forEach(([materialName, count]) => {
        if (state.materials[materialName] >= count) {
          state.materials[materialName] -= count;
        }
      });
    },

    // 更新套装信息
    updateSetInfo: (state) => {
      const setInfo = checkEquipmentSet(state.slots);
      state.setInfo = setInfo;
    },

    // 更新总战斗力
    updateTotalPower: (state) => {
      let totalPower = 0;
      
      Object.values(state.slots).forEach(equipment => {
        if (equipment) {
          totalPower += calculateEquipmentPower(equipment);
        }
      });

      // 套装加成
      if (state.setInfo) {
        totalPower = Math.floor(totalPower * (1 + state.setInfo.setBonus.bonus));
      }

      state.totalPower = totalPower;
    },

    // 清除最近掉落提示
    clearRecentDrop: (state) => {
      state.recentDrop = null;
    },

    // 整理背包（按品质和等级排序）
    sortInventory: (state) => {
      const qualityOrder = {
        [EQUIPMENT_QUALITY.GREEN]: 5,
        [EQUIPMENT_QUALITY.GOLD]: 4,
        [EQUIPMENT_QUALITY.PINK]: 3,
        [EQUIPMENT_QUALITY.BLUE]: 2,
        [EQUIPMENT_QUALITY.WHITE]: 1
      };

      state.inventory.sort((a, b) => {
        // 先按品质排序
        const qualityDiff = qualityOrder[b.quality] - qualityOrder[a.quality];
        if (qualityDiff !== 0) return qualityDiff;
        
        // 再按等级排序
        const levelDiff = b.level - a.level;
        if (levelDiff !== 0) return levelDiff;
        
        // 最后按部位排序
        const slotOrder = Object.values(EQUIPMENT_SLOTS);
        return slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot);
      });
    },

    // 批量分解装备
    decomposeEquipment: (state, action) => {
      const { equipmentIds } = action.payload;
      let materialsGained = {
        '黑水': 0,
        '粉水晶': 0,
        '黄水晶': 0,
        '绿水晶': 0,
        '金色材料': 0
      };

      equipmentIds.forEach(id => {
        const inventoryIndex = state.inventory.findIndex(item => item.id === id);
        if (inventoryIndex !== -1) {
          const equipment = state.inventory[inventoryIndex];
          
          // 根据装备品质获得材料
          switch (equipment.quality) {
            case EQUIPMENT_QUALITY.BLUE:
              materialsGained['黑水'] += 1;
              break;
            case EQUIPMENT_QUALITY.PINK:
              materialsGained['黑水'] += 2;
              materialsGained['金色材料'] += 1;
              break;
            case EQUIPMENT_QUALITY.GOLD:
              materialsGained['粉水晶'] += 1;
              materialsGained['金色材料'] += 2;
              break;
            case EQUIPMENT_QUALITY.GREEN:
              materialsGained['黄水晶'] += 1;
              materialsGained['金色材料'] += 3;
              break;
            default:
              materialsGained['金色材料'] += 1;
          }
          
          // 从背包移除装备
          state.inventory.splice(inventoryIndex, 1);
        }
      });

      // 添加获得的材料
      Object.entries(materialsGained).forEach(([material, count]) => {
        if (count > 0) {
          state.materials[material] += count;
        }
      });
      
      return materialsGained;
    },

    // 加载装备数据
    loadEquipmentData: (state, action) => {
      const { equipment } = action.payload;
      if (equipment) {
        state.slots = equipment.slots || state.slots;
        state.inventory = equipment.inventory || state.inventory;
        state.setInfo = equipment.setInfo || state.setInfo;
        state.totalPower = equipment.totalPower || state.totalPower;
        state.materials = equipment.materials || state.materials;
        state.recentDrop = equipment.recentDrop || state.recentDrop;
      }
    },

    // 重置装备系统
    resetEquipment: (state) => {
      state.slots = {
        [EQUIPMENT_SLOTS.WEAPON]: null,
        [EQUIPMENT_SLOTS.HELMET]: null,
        [EQUIPMENT_SLOTS.ARMOR]: null,
        [EQUIPMENT_SLOTS.SHOES]: null,
        [EQUIPMENT_SLOTS.NECKLACE]: null,
        [EQUIPMENT_SLOTS.BRACELET]: null,
        [EQUIPMENT_SLOTS.JADE]: null,
        [EQUIPMENT_SLOTS.TREASURE]: null
      };
      state.inventory = [];
      state.setInfo = null;
      state.totalPower = 0;
      state.recentDrop = null;
    }
  }
});

// 导出actions
export const {
  equipItem,
  unequipItem,
  addToInventory,
  removeFromInventory,
  generateRandomEquipment,
  generateMultipleEquipment,
  upgradeEquipment,
  addMaterials,
  useMaterials,
  updateSetInfo,
  updateTotalPower,
  clearRecentDrop,
  sortInventory,
  decomposeEquipment,
  loadEquipmentData,
  resetEquipment
} = equipmentSlice.actions;

// Selectors
export const selectEquippedItems = (state) => state.equipment.slots;
export const selectInventory = (state) => state.equipment.inventory;
export const selectTotalPower = (state) => state.equipment.totalPower;
export const selectSetInfo = (state) => state.equipment.setInfo;
export const selectMaterials = (state) => state.equipment.materials;
export const selectRecentDrop = (state) => state.equipment.recentDrop;

// 复合selectors
export const selectEquippedBySlot = (slot) => (state) => state.equipment.slots[slot];
export const selectCanUpgradeEquipment = (equipmentId) => (state) => {
  const equipment = state.equipment.inventory.find(item => item.id === equipmentId) ||
    Object.values(state.equipment.slots).find(item => item && item.id === equipmentId);
  
  if (!equipment) return { canUpgrade: false, reason: '装备不存在' };
  
  return canUpgradeEquipment(equipment, state.equipment.materials);
};

export const selectEquipmentByQuality = (quality) => (state) => {
  return state.equipment.inventory.filter(equipment => equipment.quality === quality);
};

export const selectSetBonus = (state) => {
  const setInfo = state.equipment.setInfo;
  if (!setInfo) return null;
  
  return {
    elementName: ELEMENT_NAMES[setInfo.element],
    pieces: setInfo.pieces,
    bonus: setInfo.setBonus
  };
};

// 导出reducer
export default equipmentSlice.reducer;