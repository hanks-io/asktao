import React from 'react';
import { useSelector } from 'react-redux';

function CharacterInfo() {
  const character = useSelector(state => state.character);

  return (
    <div className="character-info" style={{
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid #D4AF37',
      borderRadius: '8px',
      padding: '12px',
      margin: '10px 0'
    }}>
      <h3 style={{
        color: '#D4AF37',
        margin: '0 0 10px 0',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        角色信息
      </h3>
      
      <div className="character-basic" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        fontSize: '12px'
      }}>
        <div style={{ color: '#87CEEB' }}>
          等级: <span style={{ color: '#FFD700' }}>{character.level}</span>
        </div>
        <div style={{ color: '#87CEEB' }}>
          五行: <span style={{ color: '#FFD700' }}>{character.element || '未选择'}</span>
        </div>
        <div style={{ color: '#87CEEB' }}>
          可分配点数: <span style={{ color: '#90EE90' }}>{character.availablePoints}</span>
        </div>
        <div style={{ color: '#87CEEB' }}>
          五行点数: <span style={{ color: '#90EE90' }}>{character.elementPoints}</span>
        </div>
        <div style={{
          color: '#FFD700',
          gridColumn: 'span 2',
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: '4px'
        }}>
          战力: <span style={{ color: '#FF6B6B' }}>{character.powerRating}</span>
        </div>
      </div>
    </div>
  );
}

export default CharacterInfo;