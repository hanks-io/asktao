import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSynthesisSlots, removeJewelry, addJewelry, useSuperStone as consumeSuperStone } from '../../store/jewelrySlice';
import { showToast, addSystemLog, openModal } from '../../store/uiSlice';
import { checkSynthesisRules, performSynthesis } from '../../utils/gameLogic';

function SynthesisButton() {
  const dispatch = useDispatch();
  const synthesisSlots = useSelector(state => state.jewelry.synthesisSlots);
  const jewelry = useSelector(state => state.jewelry.items);
  const superStone = useSelector(state => state.jewelry.superStone);

  const handleSynthesis = () => {
    console.log(`[首饰合成] 开始合成，当前槽位：`, synthesisSlots);
    
    // 检查合成规则
    const ruleCheck = checkSynthesisRules(synthesisSlots, jewelry);
    console.log(`[合成检查] 规则验证结果：`, ruleCheck);
    
    if (!ruleCheck.valid) {
      console.log(`[合成失败] 规则不符：${ruleCheck.message}`);
      dispatch(showToast({ message: ruleCheck.message, type: 'warning' }));
      return;
    }

    // 检查材料
    const stoneSlots = synthesisSlots.filter(slot => slot && slot.type === 'superStone');
    const needsStone = stoneSlots.length > 0;
    
    if (needsStone && superStone < 2) {
      dispatch(showToast({ message: '女娲石不足', type: 'warning' }));
      return;
    }

    console.log(`[合成材料] 需要女娲石：${needsStone}，当前数量：${superStone}`);
    
    // 执行合成
    const result = performSynthesis(synthesisSlots, jewelry, superStone, ruleCheck.rule);
    console.log(`[合成结果] 成功：${result.success}，合成物品：`, result.jewelry);
    
    if (result.success) {
      // 成功合成
      console.log(`[合成成功] 生成首饰：${result.jewelry.name} (${result.jewelry.level}级)`);
      dispatch(addSystemLog({ 
        message: `🎉 成功合成 ${result.jewelry.name}！` 
      }));
      
      // 移除消耗的首饰（按索引从大到小排序，避免索引错乱）
      const sortedIndices = [...result.consumed].sort((a, b) => b - a);
      console.log(`[材料消耗] 移除首饰索引：`, sortedIndices);
      sortedIndices.forEach(index => {
        dispatch(removeJewelry({ index }));
      });
      
      // 添加新首饰
      dispatch(addJewelry(result.jewelry));
      
      // 消耗女娲石
      if (needsStone) {
        console.log(`[材料消耗] 消耗女娲石 x2`);
        dispatch(consumeSuperStone({ amount: 2 }));
      }
      
      // 根据首饰等级决定使用toast还是弹窗
      if (result.jewelry.level >= 80) {
        // 80级及以上显示详细弹窗展示属性
        console.log(`[合成完成] 显示成功弹窗 - 80级以上首饰`);
        dispatch(openModal({
          modalName: 'synthesisSuccess',
          data: { jewelry: result.jewelry }
        }));
      } else {
        // 35-70级只显示toast提示
        console.log(`[合成完成] 显示toast提示 - 35-70级首饰`);
        dispatch(showToast({ 
          message: `🎉 合成成功！获得 ${result.jewelry.name} (Lv.${result.jewelry.level})`, 
          type: 'success' 
        }));
      }
    } else {
      // 合成失败
      dispatch(addSystemLog({ 
        message: '💀 合成失败！部分材料已消耗' 
      }));
      
      // 移除消耗的材料（失败时通常只消耗辅助材料）
      if (result.consumed && result.consumed.length > 0) {
        const sortedIndices = [...result.consumed].sort((a, b) => b - a);
        sortedIndices.forEach(index => {
          dispatch(removeJewelry({ index }));
        });
      }
      
      // 消耗女娲石
      if (needsStone) {
        dispatch(consumeSuperStone({ amount: 2 }));
      }
      
      dispatch(showToast({ 
        message: '合成失败！再接再厉', 
        type: 'error' 
      }));
    }
    
    // 清空合成槽
    dispatch(clearSynthesisSlots());
  };

  // 检查是否可以合成
  const canSynthesize = synthesisSlots.some(slot => slot !== null);
  const ruleCheck = canSynthesize ? checkSynthesisRules(synthesisSlots, jewelry) : { valid: false };

  return (
    <div className="synthesis-button-section" style={{ marginBottom: '20px' }}>
      <button
        className={`btn ${canSynthesize && ruleCheck.valid ? 'btn-primary' : ''}`}
        onClick={handleSynthesis}
        disabled={!canSynthesize || !ruleCheck.valid}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: canSynthesize && ruleCheck.valid ? 'pointer' : 'not-allowed',
          background: canSynthesize && ruleCheck.valid ? 
            'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : 
            '#666',
          color: canSynthesize && ruleCheck.valid ? '#000' : '#999',
          transition: 'all 0.3s ease'
        }}
      >
        合成首饰
      </button>
      
      {/* 规则提示 */}
      {canSynthesize && !ruleCheck.valid && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          background: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid #FF6B6B',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#FF6B6B',
          textAlign: 'center'
        }}>
          {ruleCheck.message}
        </div>
      )}
    </div>
  );
}

export default SynthesisButton;