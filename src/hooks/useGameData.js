import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updatePowerRating, loadCharacterData } from '../store/characterSlice';
import { updateSetInfo, loadEquipmentData } from '../store/equipmentSlice';
import { loadGameData } from '../store/jewelrySlice';

// 游戏数据管理Hook
export function useGameData() {
  const dispatch = useDispatch();

  const saveGameToStorage = useCallback(() => {
    try {
      const state = window.store?.getState();
      if (state) {
        const saveData = {
          character: state.character,
          jewelry: state.jewelry,
          equipment: state.equipment,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('wendaoJewelrySave', JSON.stringify(saveData));
        console.log(`[实时存档] 数据已保存到localStorage，时间：${saveData.timestamp}`);
        console.log(`[实时存档] 女娲石数量：${saveData.jewelry?.superStone || 0}，首饰数量：${saveData.jewelry?.items?.length || 0}`);
      }
    } catch (error) {
      console.error('保存游戏数据失败:', error);
    }
  }, []);

  const loadGameFromStorage = useCallback(() => {
    try {
      const saveData = localStorage.getItem('wendaoJewelrySave');
      if (saveData) {
        const parsedData = JSON.parse(saveData);
        console.log(`[实时存档] 从localStorage加载存档，时间：${parsedData.timestamp}`);
        
        // 恢复首饰数据
        if (parsedData.jewelry) {
          dispatch(loadGameData({ jewelry: parsedData.jewelry }));
        }
        
        // 恢复角色数据
        if (parsedData.character) {
          dispatch(loadCharacterData({ character: parsedData.character }));
        }
        
        // 恢复装备数据
        if (parsedData.equipment) {
          dispatch(loadEquipmentData({ equipment: parsedData.equipment }));
        }
        
        console.log(`[实时存档] 所有数据已恢复完成`);
        return parsedData;
      } else {
        console.log(`[实时存档] 未找到存档数据，将使用初始数据`);
      }
    } catch (error) {
      console.error('加载游戏数据失败:', error);
    }
    return null;
  }, [dispatch]);

  // 实时保存 - 监听Redux store变化
  useEffect(() => {
    if (window.store) {
      const unsubscribe = window.store.subscribe(() => {
        saveGameToStorage();
      });
      return unsubscribe;
    }
  }, [saveGameToStorage]);

  // 初始化时从localStorage加载数据
  useEffect(() => {
    loadGameFromStorage();
  }, [loadGameFromStorage]);

  // 更新计算依赖的数据
  const updateCalculatedData = useCallback(() => {
    dispatch(updatePowerRating());
    dispatch(updateSetInfo());
  }, [dispatch]);

  return {
    saveGameToStorage,
    loadGameFromStorage,
    updateCalculatedData
  };
}

// 角色数据Hook
export function useCharacterData() {
  const dispatch = useDispatch();

  // 当角色属性变化时自动更新战力
  useEffect(() => {
    dispatch(updatePowerRating());
  }, [dispatch]);

  return { dispatch };
}