import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromRecast } from '../../store/jewelrySlice';
import { JEWELRY_ICONS } from '../../utils/constants';

function RecastSlots() {
  const dispatch = useDispatch();
  const recastSlots = useSelector(state => state.jewelry.recastSlots);
  const jewelry = useSelector(state => state.jewelry.items);

  const handleRemoveFromSlot = (slotIndex) => {
    dispatch(removeFromRecast({ slotIndex }));
  };

  return (
    <div className="recast-slots" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      marginBottom: '20px',
      padding: '15px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid #D4AF37',
      borderRadius: '8px'
    }}>
      {recastSlots.map((jewelryIndex, index) => (
        <div
          key={index}
          className="recast-slot"
          onClick={() => jewelryIndex !== null && handleRemoveFromSlot(index)}
          style={{
            minHeight: '80px',
            background: jewelryIndex !== null ? 
              'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)' : 
              'linear-gradient(135deg, #333 0%, #222 100%)',
            border: jewelryIndex !== null ? '2px solid #D4AF37' : '2px dashed #666',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: jewelryIndex !== null ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
            padding: '8px',
            textAlign: 'center'
          }}
        >
          {jewelryIndex !== null ? (
            <RecastSlotContent jewelryIndex={jewelryIndex} jewelry={jewelry} />
          ) : (
            <div style={{ color: '#999', fontSize: '9px' }}>
              {index === 0 ? '80-100级首饰' : '同类型同等级'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RecastSlotContent({ jewelryIndex, jewelry }) {
  const jewelryItem = jewelry[jewelryIndex];
  if (!jewelryItem) return <div style={{ color: '#ff0000' }}>错误</div>;
  
  const icon = JEWELRY_ICONS[jewelryItem.type]?.[jewelryItem.level] || '💍';
  
  return (
    <>
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ color: '#FFD700', fontSize: '10px', fontWeight: 'bold' }}>
        {jewelryItem.name}
      </div>
      <div style={{ color: '#87CEEB', fontSize: '9px' }}>
        Lv.{jewelryItem.level}
      </div>
      <div style={{ color: '#999', fontSize: '8px', marginTop: '4px' }}>
        点击移除
      </div>
    </>
  );
}

export default RecastSlots;