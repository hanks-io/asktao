import React from 'react';
import { JEWELRY_ICONS } from '../../utils/constants';
import { useLongPress } from '../../hooks/useMobile';

function JewelryItem({ jewelry, index, onClick, onLongPress, showCount = false }) {
  const longPressEvents = useLongPress(() => {
    onLongPress && onLongPress(jewelry, index);
  });

  const handleClick = (e) => {
    e.preventDefault();
    onClick && onClick(jewelry, index);
  };

  const icon = JEWELRY_ICONS[jewelry.type]?.[jewelry.level] || '💍';
  const borderColor = getBorderColor(jewelry.level);

  return (
    <div
      className="jewelry-item"
      onClick={handleClick}
      {...longPressEvents}
      style={{
        background: `linear-gradient(135deg, ${getBackgroundColor(jewelry.level)})`,
        border: `2px solid ${borderColor}`,
        borderRadius: '6px',
        padding: '6px',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '9px',
        color: '#fff',
        transition: 'all 0.3s ease',
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = `0 4px 12px ${borderColor}40`;
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '16px', marginBottom: '2px' }}>
        {icon}
      </div>
      <div style={{ fontSize: '8px', lineHeight: '1.2' }}>
        Lv.{jewelry.level}
      </div>
      
      {/* 显示数量（70级首饰） */}
      {showCount && jewelry.count > 1 && (
        <div style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          background: '#FF6B6B',
          color: '#fff',
          borderRadius: '50%',
          width: '16px',
          height: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          fontWeight: 'bold'
        }}>
          {jewelry.count}
        </div>
      )}

      {/* 特殊属性标识 */}
      {jewelry.additionalStats && jewelry.additionalStats.some(stat => stat.quality === 'special') && (
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '2px',
          color: '#FFD700',
          fontSize: '8px'
        }}>
          ✨
        </div>
      )}
    </div>
  );
}

function getBorderColor(level) {
  if (level >= 150) return '#FF1493';
  if (level >= 130) return '#9400D3';
  if (level >= 110) return '#FF4500';
  if (level >= 90) return '#FFD700';
  if (level >= 70) return '#FF6347';
  if (level >= 50) return '#32CD32';
  if (level >= 35) return '#1E90FF';
  return '#87CEEB';
}

function getBackgroundColor(level) {
  if (level >= 150) return '#4B0082, #8B008B';
  if (level >= 130) return '#663399, #4B0082';
  if (level >= 110) return '#FF4500, #FF6347';
  if (level >= 90) return '#B8860B, #DAA520';
  if (level >= 70) return '#8B0000, #CD5C5C';
  if (level >= 50) return '#228B22, #32CD32';
  if (level >= 35) return '#1E90FF, #4169E1';
  return '#4682B4, #87CEEB';
}

export default JewelryItem;