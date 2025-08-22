import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  level: 1,
  element: null, // '金', '木', '水', '火', '土'
  attributes: {
    strength: 0,      // 力量
    constitution: 0,  // 体质
    spirit: 0,        // 灵力
    agility: 0,       // 敏捷
  },
  availablePoints: 4,
  elementPoints: 1,
  elementAttributes: {
    金: 0,
    木: 0,
    水: 0,
    火: 0,
    土: 0,
  },
  powerRating: 100,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    selectElement: (state, action) => {
      state.element = action.payload;
    },
    increaseAttribute: (state, action) => {
      const { attribute } = action.payload;
      if (state.availablePoints > 0) {
        state.attributes[attribute]++;
        state.availablePoints--;
      }
    },
    decreaseAttribute: (state, action) => {
      const { attribute } = action.payload;
      if (state.attributes[attribute] > 0) {
        state.attributes[attribute]--;
        state.availablePoints++;
      }
    },
    increaseElementAttribute: (state, action) => {
      const { element } = action.payload;
      if (state.elementPoints > 0) {
        state.elementAttributes[element]++;
        state.elementPoints--;
      }
    },
    decreaseElementAttribute: (state, action) => {
      const { element } = action.payload;
      if (state.elementAttributes[element] > 0) {
        state.elementAttributes[element]--;
        state.elementPoints++;
      }
    },
    levelUp: (state) => {
      if (state.level < 150) {
        state.level++;
        state.availablePoints += 4;
        state.elementPoints += 1;
      }
    },
    resetCharacter: (state) => {
      return initialState;
    },
    updatePowerRating: (state) => {
      let power = 0;
      // 基础属性战力
      power += state.attributes.strength * 10;
      power += state.attributes.constitution * 8;
      power += state.attributes.spirit * 12;
      power += state.attributes.agility * 6;
      
      // 五行战力
      if (state.element) {
        const elementRelations = {
          generate: { 金: '水', 木: '火', 水: '木', 火: '土', 土: '金' },
          overcome: { 金: '木', 木: '土', 水: '火', 火: '金', 土: '水' }
        };
        
        power += state.elementAttributes[state.element] * 50;
        const generate = elementRelations.generate[state.element];
        const overcome = elementRelations.overcome[state.element];
        power += state.elementAttributes[generate] * 30;
        power += state.elementAttributes[overcome] * 40;
      }
      
      // 等级战力
      power += state.level * 100;
      
      state.powerRating = Math.floor(power);
    },
    // 加载存档数据
    loadCharacterData: (state, action) => {
      const { character } = action.payload;
      if (character) {
        state.level = character.level || 1;
        state.element = character.element || null;
        state.attributes = character.attributes || { strength: 0, constitution: 0, spirit: 0, agility: 0 };
        state.availablePoints = character.availablePoints || 4;
        state.elementPoints = character.elementPoints || 1;
        state.elementAttributes = character.elementAttributes || { 金: 0, 木: 0, 水: 0, 火: 0, 土: 0 };
        state.powerRating = character.powerRating || 0;
        console.log(`[实时存档] 角色数据已恢复：${state.level}级，五行：${state.element}`);
      }
    },
  },
});

export const {
  selectElement,
  increaseAttribute,
  decreaseAttribute,
  increaseElementAttribute,
  decreaseElementAttribute,
  levelUp,
  resetCharacter,
  updatePowerRating,
  loadCharacterData,
} = characterSlice.actions;

export default characterSlice.reducer;