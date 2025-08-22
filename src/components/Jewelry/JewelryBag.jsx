import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JewelryItem from './JewelryItem';
import { addToSynthesis, addStoneToSynthesis, addToRecast } from '../../store/jewelrySlice';
import { openModal, showToast } from '../../store/uiSlice';
// import { useLongPress } from '../../hooks/useMobile'; // 在JewelryItem中使用

function JewelryBag({ mode = 'synthesis' }) {
  const dispatch = useDispatch();
  const jewelry = useSelector(state => state.jewelry.items);
  const synthesisSlots = useSelector(state => state.jewelry.synthesisSlots);
  const recastSlots = useSelector(state => state.jewelry.recastSlots);
  const superStone = useSelector(state => state.jewelry.superStone);

  const handleJewelryClick = (jewelryItem, index) => {
    if (mode === 'synthesis') {
      // 对于70级及以下的首饰，需要找到实际的首饰索引
      let actualJewelryIndex = index;
      let actualJewelryItem = jewelryItem;
      
      // 如果是分组显示的首饰（有count属性），需要找到具体的首饰实例
      if (jewelryItem.count && jewelryItem.level <= 70) {
        // 找到该类型和等级的首饰列表
        const sameTypeAndLevel = jewelry.filter((item, idx) => 
          item.type === jewelryItem.type && 
          item.level === jewelryItem.level &&
          !synthesisSlots.some(slot => slot && slot.type === 'jewelry' && slot.index === idx)
        );
        
        if (sameTypeAndLevel.length === 0) {
          dispatch(showToast({ message: '该类型首饰已全部在合成槽中', type: 'warning' }));
          return;
        }
        
        // 使用第一个可用的首饰
        actualJewelryItem = sameTypeAndLevel[0];
        actualJewelryIndex = jewelry.findIndex(item => item.id === actualJewelryItem.id);
      } else {
        // 检查是否是同一个首饰实例（使用唯一ID）
        const alreadyInSlot = synthesisSlots.some(slot => 
          slot && slot.type === 'jewelry' && slot.data && slot.data.id === jewelryItem.id
        );
        
        if (alreadyInSlot) {
          dispatch(showToast({ message: '该首饰已在合成槽中', type: 'warning' }));
          return;
        }
      }

      const emptySlotIndex = synthesisSlots.findIndex(slot => slot === null);
      if (emptySlotIndex === -1) {
        dispatch(showToast({ message: '合成槽已满', type: 'warning' }));
        return;
      }

      dispatch(addToSynthesis({
        slotIndex: emptySlotIndex,
        jewelry: actualJewelryItem,
        jewelryIndex: actualJewelryIndex
      }));
    } else if (mode === 'recast') {
      // 重铸模式逻辑
      if (jewelryItem.level < 80 || jewelryItem.level > 100) {
        dispatch(showToast({ message: '只能重铸80-100级的首饰', type: 'warning' }));
        return;
      }

      const alreadyInSlot = recastSlots.includes(index);
      if (alreadyInSlot) {
        dispatch(showToast({ message: '该首饰已在重铸槽中', type: 'warning' }));
        return;
      }

      const emptySlotIndex = recastSlots.findIndex(slot => slot === null);
      if (emptySlotIndex === -1) {
        dispatch(showToast({ message: '重铸槽已满', type: 'warning' }));
        return;
      }

      // 检查类型和等级是否匹配（如果已有首饰）
      const filledSlots = recastSlots.filter(slot => slot !== null);
      if (filledSlots.length > 0) {
        const firstJewelry = jewelry[filledSlots[0]];
        if (firstJewelry.type !== jewelryItem.type || firstJewelry.level !== jewelryItem.level) {
          dispatch(showToast({ message: '需要相同类型和等级的首饰', type: 'warning' }));
          return;
        }
      }

      dispatch(addToRecast({
        slotIndex: emptySlotIndex,
        jewelryIndex: index
      }));
    }
  };

  const handleJewelryLongPress = (jewelryItem, index) => {
    dispatch(openModal({
      modalName: 'jewelryDetail',
      data: { jewelry: jewelryItem, index: index }
    }));
  };

  const handleStoneClick = () => {
    if (superStone < 2) {
      dispatch(showToast({ message: '女娲石不足', type: 'warning' }));
      return;
    }

    // 找到空槽位
    const emptySlotIndex = synthesisSlots.findIndex(slot => slot === null);
    if (emptySlotIndex === -1) {
      dispatch(showToast({ message: '合成槽已满', type: 'warning' }));
      return;
    }

    // 添加女娲石到合成槽
    dispatch(addStoneToSynthesis({ slotIndex: emptySlotIndex }));
  };

  // 按等级分组显示首饰
  const groupedJewelry = jewelry.reduce((groups, item, index) => {
    const level = item.level;
    if (!groups[level]) {
      groups[level] = [];
    }
    groups[level].push({ ...item, originalIndex: index });
    return groups;
  }, {});

  return (
    <div className="jewelry-bag">
      <style jsx>{`
        .bag-grid::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div 
        className="bag-grid" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(60px, 1fr))',
          gap: '8px',
          maxHeight: '300px',
          overflowY: 'auto',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
          padding: '8px',
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid #444',
          borderRadius: '6px'
        }}
      >
        {/* 女娲石 */}
        {superStone > 0 && (
          <div
            className="bag-item stone-item"
            onClick={handleStoneClick}
            style={{
              background: 'linear-gradient(135deg, #6a5acd 0%, #483d8b 100%)',
              border: '2px solid #9370db',
              borderRadius: '6px',
              padding: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: '10px',
              color: '#fff',
              transition: 'all 0.3s ease',
              aspectRatio: '1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ fontSize: '16px' }}>💠</div>
            <div style={{ fontSize: '9px' }}>女娲石</div>
            <div style={{ fontSize: '9px' }}>x{superStone}</div>
          </div>
        )}

        {/* 首饰按等级排序显示 */}
        {Object.keys(groupedJewelry)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(level => {
            const items = groupedJewelry[level];
            // 70级及以下首饰按类型分组显示数量
            if (parseInt(level) <= 70) {
              const typeGroups = items.reduce((groups, item) => {
                const key = `${item.type}`;  // 只按类型分组，不管名称
                if (!groups[key]) {
                  groups[key] = [];
                }
                groups[key].push(item);
                return groups;
              }, {});
              
              return Object.entries(typeGroups).map(([typeKey, typeItems]) => {
                const count = typeItems.length;
                if (count === 0) return null;
                
                // 使用正确的名称（从JEWELRY_NAMES获取）
                const firstItem = typeItems[0];
                const correctName = require('../../utils/constants').JEWELRY_NAMES[firstItem.type][firstItem.level];
                const displayItem = {
                  ...firstItem,
                  name: correctName || firstItem.name,  // 使用正确名称
                  count
                };
                
                return (
                  <JewelryItem
                    key={`${level}-${typeKey}`}
                    jewelry={displayItem}
                    index={firstItem.originalIndex}
                    onClick={handleJewelryClick}
                    onLongPress={handleJewelryLongPress}
                    showCount={true}
                  />
                );
              });
            } else {
              // 80级以上首饰单独显示
              return items.map((item, idx) => (
                <JewelryItem
                  key={`${item.originalIndex}-${idx}`}
                  jewelry={item}
                  index={item.originalIndex}
                  onClick={handleJewelryClick}
                  onLongPress={handleJewelryLongPress}
                />
              ));
            }
          })}
      </div>
      
      {jewelry.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#666',
          padding: '40px 20px',
          fontSize: '14px'
        }}>
          背包为空，去挑战妖王获取首饰吧！
        </div>
      )}
    </div>
  );
}

export default JewelryBag;