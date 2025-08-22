import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  synthesisSlots: [null, null, null],
  recastSlots: [null, null, null],
  superStone: 0,
  totalBossKills: 0,
};

const jewelrySlice = createSlice({
  name: 'jewelry',
  initialState,
  reducers: {
    addJewelry: (state, action) => {
      state.items.push(action.payload);
    },
    removeJewelry: (state, action) => {
      const { index } = action.payload;
      state.items.splice(index, 1);
    },
    updateJewelry: (state, action) => {
      const { index, jewelry } = action.payload;
      state.items[index] = jewelry;
    },
    addToSynthesis: (state, action) => {
      const { slotIndex, jewelry, jewelryIndex } = action.payload;
      state.synthesisSlots[slotIndex] = {
        type: 'jewelry',
        index: jewelryIndex,
        data: jewelry
      };
    },
    addStoneToSynthesis: (state, action) => {
      const { slotIndex, count = 1 } = action.payload;
      state.synthesisSlots[slotIndex] = {
        type: 'superStone',
        count: count
      };
    },
    removeFromSynthesis: (state, action) => {
      const { slotIndex } = action.payload;
      state.synthesisSlots[slotIndex] = null;
    },
    clearSynthesisSlots: (state) => {
      state.synthesisSlots = [null, null, null];
    },
    addToRecast: (state, action) => {
      const { slotIndex, jewelryIndex } = action.payload;
      state.recastSlots[slotIndex] = jewelryIndex;
    },
    removeFromRecast: (state, action) => {
      const { slotIndex } = action.payload;
      state.recastSlots[slotIndex] = null;
    },
    clearRecastSlots: (state) => {
      state.recastSlots = [null, null, null];
    },
    addSuperStone: (state, action) => {
      const amount = action.payload;
      state.superStone += amount;
      console.log(`[女娲石] 获得 ${amount} 个，总数：${state.superStone}`);
    },
    useSuperStone: (state, action) => {
      const { amount } = action.payload;
      if (state.superStone >= amount) {
        state.superStone -= amount;
      }
    },
    incrementBossKills: (state) => {
      state.totalBossKills++;
    },
    initializeItems: (state) => {
      // 清理历史垃圾数据 - 强制重新初始化
      const shouldReinitialize = true; // 临时强制重置
      if (shouldReinitialize || (state.items.length === 0 && state.superStone === 0)) {
        // 初始化材料
        state.superStone = 10;
        
        // 添加一些20级首饰用于练习合成
        const initialJewelry = [];
        
        // 生成6个20级首饰
        for (let i = 0; i < 6; i++) {
          initialJewelry.push({
            id: Date.now() + i,
            type: ['necklace', 'pendant', 'bracelet'][i % 3],
            name: ['青珑挂珠', '纹龙佩', '金刚手镯'][i % 3],
            level: 20,
            baseStats: { 
              name: ['法力', '气血', '伤害'][i % 3], 
              value: [400, 600, 300][i % 3] 
            },
            additionalStats: []
          });
        }
        
        // 生成4个35级首饰
        for (let i = 0; i < 4; i++) {
          initialJewelry.push({
            id: Date.now() + 1000 + i,
            type: ['necklace', 'pendant', 'bracelet'][i % 3],
            name: ['紫晶坠子', '温玉玦', '七星手链'][i % 3],
            level: 35,
            baseStats: { 
              name: ['法力', '气血', '伤害'][i % 3], 
              value: [700, 1050, 525][i % 3] 
            },
            additionalStats: []
          });
        }
        
        // 生成3个50级首饰 (每种类型一个)
        for (let i = 0; i < 3; i++) {
          initialJewelry.push({
            id: Date.now() + 2000 + i,
            type: ['necklace', 'pendant', 'bracelet'][i],
            name: ['三才项圈', '血心石', '凤舞环'][i],
            level: 50,
            baseStats: { 
              name: ['法力', '气血', '伤害'][i], 
              value: [1000, 1500, 750][i] 
            },
            additionalStats: []
          });
        }
        
        // 生成6个70级首饰 (每种类型两个)
        for (let i = 0; i < 6; i++) {
          initialJewelry.push({
            id: Date.now() + 3000 + i,
            type: ['necklace', 'pendant', 'bracelet'][i % 3],
            name: ['雪魂丝链', '蟠螭结', '法文手轮'][i % 3],
            level: 70,
            baseStats: { 
              name: ['法力', '气血', '伤害'][i % 3], 
              value: [1400, 2100, 1050][i % 3] 
            },
            additionalStats: []
          });
        }
        
        state.items = initialJewelry;
      }
    },
    // 加载存档数据
    loadGameData: (state, action) => {
      const { jewelry } = action.payload;
      if (jewelry) {
        state.items = jewelry.items || [];
        // 兼容旧存档：如果有normalStone和superStone，合并成superStone
        if (jewelry.normalStone && jewelry.superStone) {
          state.superStone = (jewelry.normalStone || 0) + (jewelry.superStone || 0);
          console.log(`[存档兼容] 合并女娲石：普通${jewelry.normalStone} + 超级${jewelry.superStone} = 总计${state.superStone}`);
        } else {
          state.superStone = jewelry.superStone || 0;
        }
        state.totalBossKills = jewelry.totalBossKills || 0;
        state.synthesisSlots = jewelry.synthesisSlots || [null, null, null];
        state.recastSlots = jewelry.recastSlots || [null, null, null];
        console.log(`[实时存档] 首饰数据已恢复：${state.items.length}个首饰，女娲石${state.superStone}`);
      }
    },
  },
});

export const {
  addJewelry,
  removeJewelry,
  updateJewelry,
  addToSynthesis,
  addStoneToSynthesis,
  removeFromSynthesis,
  clearSynthesisSlots,
  addToRecast,
  removeFromRecast,
  clearRecastSlots,
  addSuperStone,
  useSuperStone,
  incrementBossKills,
  initializeItems,
  loadGameData,
} = jewelrySlice.actions;

export default jewelrySlice.reducer;