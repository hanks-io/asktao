import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseAttribute, decreaseAttribute, updatePowerRating } from '../../store/characterSlice';
import { addSystemLog } from '../../store/uiSlice';

const ATTRIBUTE_NAMES = {
  strength: '力量',
  constitution: '体质',
  spirit: '灵力',
  agility: '敏捷'
};

const ATTRIBUTE_DESCRIPTIONS = {
  strength: '影响战力和首饰效果',
  constitution: '影响战力和首饰效果', 
  spirit: '影响战力和首饰效果',
  agility: '影响战力和首饰效果'
};

function AttributeAllocation() {
  const dispatch = useDispatch();
  const character = useSelector(state => state.character);

  const handleIncrease = (attribute) => {
    if (character.availablePoints <= 0) return;
    
    dispatch(increaseAttribute({ attribute }));
    dispatch(updatePowerRating());
    dispatch(addSystemLog({ message: `分配了1点${ATTRIBUTE_NAMES[attribute]}` }));
  };

  const handleDecrease = (attribute) => {
    if (character.attributes[attribute] <= 0) return;
    
    dispatch(decreaseAttribute({ attribute }));
    dispatch(updatePowerRating());
    dispatch(addSystemLog({ message: `收回了1点${ATTRIBUTE_NAMES[attribute]}` }));
  };

  return (
    <div className="attribute-allocation" style={{
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid #D4AF37',
      borderRadius: '8px',
      padding: '12px',
      margin: '10px 0'
    }}>
      <h4 style={{
        color: '#D4AF37',
        margin: '0 0 10px 0',
        fontSize: '14px'
      }}>
        基础属性分配
      </h4>
      
      <div style={{ fontSize: '11px' }}>
        {Object.keys(ATTRIBUTE_NAMES).map(attribute => (
          <div key={attribute} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            padding: '6px 8px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
            border: '1px solid #444'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#87CEEB', fontWeight: 'bold' }}>
                {ATTRIBUTE_NAMES[attribute]}
              </div>
              <div style={{ color: '#999', fontSize: '9px' }}>
                {ATTRIBUTE_DESCRIPTIONS[attribute]}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <button
                onClick={() => handleDecrease(attribute)}
                disabled={character.attributes[attribute] <= 0}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #D4AF37',
                  background: character.attributes[attribute] > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                  color: character.attributes[attribute] > 0 ? '#D4AF37' : '#666',
                  borderRadius: '3px',
                  fontSize: '10px',
                  cursor: character.attributes[attribute] > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                -
              </button>
              
              <span style={{
                color: '#FFD700',
                fontSize: '11px',
                width: '25px',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {character.attributes[attribute]}
              </span>
              
              <button
                onClick={() => handleIncrease(attribute)}
                disabled={character.availablePoints <= 0}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #D4AF37',
                  background: character.availablePoints > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                  color: character.availablePoints > 0 ? '#D4AF37' : '#666',
                  borderRadius: '3px',
                  fontSize: '10px',
                  cursor: character.availablePoints > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
        
        <div style={{
          marginTop: '8px',
          textAlign: 'center',
          fontSize: '10px',
          color: character.availablePoints > 0 ? '#90EE90' : '#666'
        }}>
          可分配点数: {character.availablePoints}
        </div>
      </div>
    </div>
  );
}

export default AttributeAllocation;