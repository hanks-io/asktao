import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecastSlots, removeJewelry, addJewelry } from '../../store/jewelrySlice';
import { showToast, addSystemLog } from '../../store/uiSlice';
import { recastJewelry } from '../../utils/gameLogic';

function RecastButton() {
  const dispatch = useDispatch();
  const recastSlots = useSelector(state => state.jewelry.recastSlots);
  const jewelry = useSelector(state => state.jewelry.items);

  const handleRecast = () => {
    const filledIndices = recastSlots.filter(index => index !== null);
    
    if (filledIndices.length !== 3) {
      dispatch(showToast({ message: '需要放入3个同类型同等级的首饰', type: 'warning' }));
      return;
    }

    // 验证首饰类型和等级
    const firstJewelry = jewelry[filledIndices[0]];
    const allSameTypeAndLevel = filledIndices.every(index => {
      const item = jewelry[index];
      return item.type === firstJewelry.type && 
             item.level === firstJewelry.level &&
             item.level >= 80 && item.level <= 100;
    });

    if (!allSameTypeAndLevel) {
      dispatch(showToast({ message: '需要3个相同类型和等级的80-100级首饰', type: 'warning' }));
      return;
    }

    // 执行重铸
    try {
      // 重铸第一个首饰，其他作为材料消耗
      const targetJewelry = jewelry[filledIndices[0]];
      const newJewelry = recastJewelry(targetJewelry);
      
      // 添加新首饰
      dispatch(addJewelry(newJewelry));
      
      // 移除消耗的首饰（按索引从大到小排序，避免索引错乱）
      const sortedIndices = [...filledIndices].sort((a, b) => b - a);
      sortedIndices.forEach(index => {
        dispatch(removeJewelry({ index }));
      });
      
      // 清空重铸槽
      dispatch(clearRecastSlots());
      
      // 显示成功消息
      dispatch(addSystemLog({ 
        message: `🔄 重铸成功！${newJewelry.name} 获得全新属性` 
      }));
      dispatch(showToast({ 
        message: `重铸成功！获得全新属性的${newJewelry.name}`, 
        type: 'success' 
      }));
      
    } catch (error) {
      console.error('重铸失败:', error);
      dispatch(showToast({ message: '重铸失败，请重试', type: 'error' }));
    }
  };

  // 检查是否可以重铸
  const filledCount = recastSlots.filter(index => index !== null).length;
  const canRecast = filledCount === 3;

  // 验证首饰是否符合要求
  let validationMessage = '';
  if (filledCount > 0) {
    const filledIndices = recastSlots.filter(index => index !== null);
    const firstJewelry = jewelry[filledIndices[0]];
    
    if (firstJewelry.level < 80 || firstJewelry.level > 100) {
      validationMessage = '只能重铸80-100级的首饰';
    } else if (filledCount > 1) {
      const allSameTypeAndLevel = filledIndices.every(index => {
        const item = jewelry[index];
        return item.type === firstJewelry.type && item.level === firstJewelry.level;
      });
      
      if (!allSameTypeAndLevel) {
        validationMessage = '需要相同类型和等级的首饰';
      }
    }
  }

  return (
    <div className="recast-button-section" style={{ marginBottom: '20px' }}>
      <button
        className={`btn ${canRecast && !validationMessage ? 'btn-primary' : ''}`}
        onClick={handleRecast}
        disabled={!canRecast || !!validationMessage}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: canRecast && !validationMessage ? 'pointer' : 'not-allowed',
          background: canRecast && !validationMessage ? 
            'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : 
            '#666',
          color: canRecast && !validationMessage ? '#000' : '#999',
          transition: 'all 0.3s ease'
        }}
      >
        {canRecast && !validationMessage 
          ? '重铸首饰（100%成功，重随属性）' 
          : `重铸首饰 (${filledCount}/3)`
        }
      </button>
      
      {/* 验证错误提示 */}
      {validationMessage && (
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
          {validationMessage}
        </div>
      )}
    </div>
  );
}

export default RecastButton;