import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromSynthesis } from '../../store/jewelrySlice';
import { JEWELRY_ICONS } from '../../utils/constants';

function SynthesisSlots() {
  const dispatch = useDispatch();
  const synthesisSlots = useSelector(state => state.jewelry.synthesisSlots);
  const jewelry = useSelector(state => state.jewelry.items);

  const handleRemoveFromSlot = (slotIndex) => {
    dispatch(removeFromSynthesis({ slotIndex }));
  };

  return (
    <div className="synthesis-slots" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(90px, 1fr))',
      gap: '12px',
      marginBottom: '20px',
      padding: '15px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid #D4AF37',
      borderRadius: '8px'
    }}>
      {synthesisSlots.map((slot, index) => (
        <div
          key={index}
          className="synthesis-slot"
          onClick={() => slot && handleRemoveFromSlot(index)}
          style={{
            aspectRatio: '1',
            background: slot ? 
              'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)' : 
              'linear-gradient(135deg, #333 0%, #222 100%)',
            border: slot ? '2px solid #D4AF37' : '2px dashed #666',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: slot ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
            padding: '8px',
            textAlign: 'center'
          }}
        >
          {slot ? (
            <SynthesisSlotContent slot={slot} jewelry={jewelry} />
          ) : (
            <div style={{ color: '#999', fontSize: '9px' }}>
              放入首饰
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SynthesisSlotContent({ slot, jewelry }) {
  if (slot.type === 'jewelry') {
    const jewelryItem = jewelry[slot.index];
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
  } else if (slot.type === 'superStone') {
    return (
      <>
        <div style={{ fontSize: '24px', marginBottom: '4px' }}>💠</div>
        <div style={{ color: '#9370db', fontSize: '10px', fontWeight: 'bold' }}>
          女娲石
        </div>
        <div style={{ color: '#87CEEB', fontSize: '9px' }}>
          x{slot.count}
        </div>
        <div style={{ color: '#999', fontSize: '8px', marginTop: '4px' }}>
          点击移除
        </div>
      </>
    );
  }
  
  return null;
}

export default SynthesisSlots;