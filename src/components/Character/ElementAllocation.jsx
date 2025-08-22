import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseElementAttribute, decreaseElementAttribute, updatePowerRating } from '../../store/characterSlice';
import { addSystemLog } from '../../store/uiSlice';

const ELEMENT_RELATIONS = {
  generate: { 金: '水', 木: '火', 水: '木', 火: '土', 土: '金' },
  overcome: { 金: '木', 木: '土', 水: '火', 火: '金', 土: '水' },
  colors: {
    金: '#FFD700',
    木: '#90EE90', 
    水: '#87CEEB',
    火: '#FF6B6B',
    土: '#DEB887'
  }
};

function ElementAllocation() {
  const dispatch = useDispatch();
  const character = useSelector(state => state.character);

  const handleIncrease = (element) => {
    if (character.elementPoints <= 0) return;
    
    dispatch(increaseElementAttribute({ element }));
    dispatch(updatePowerRating());
    dispatch(addSystemLog({ message: `分配了1点${element}系天赋` }));
  };

  const handleDecrease = (element) => {
    if (character.elementAttributes[element] <= 0) return;
    
    dispatch(decreaseElementAttribute({ element }));
    dispatch(updatePowerRating());
    dispatch(addSystemLog({ message: `收回了1点${element}系天赋` }));
  };

  if (!character.element) {
    return (
      <div className="element-allocation" style={{
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
          五行天赋
        </h4>
        <div style={{
          color: '#666',
          textAlign: 'center',
          fontSize: '12px'
        }}>
          请先选择五行
        </div>
      </div>
    );
  }

  const selectedElement = character.element;
  const generateElement = ELEMENT_RELATIONS.generate[selectedElement];
  const overcomeElement = ELEMENT_RELATIONS.overcome[selectedElement];

  const elementOptions = [
    { element: selectedElement, label: `${selectedElement}系精通`, multiplier: 50, description: '主系精通，提供最高加成' },
    { element: generateElement, label: `${generateElement}系协调 (相生)`, multiplier: 30, description: '相生关系，提供中等加成' },
    { element: overcomeElement, label: `${overcomeElement}系克制 (相克)`, multiplier: 40, description: '相克关系，提供较高加成' }
  ];

  return (
    <div className="element-allocation" style={{
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
        五行天赋
      </h4>
      
      <div style={{ fontSize: '11px' }}>
        {elementOptions.map(({ element, label, multiplier, description }) => (
          <div key={element} style={{
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
              <div style={{ 
                color: ELEMENT_RELATIONS.colors[element],
                fontWeight: 'bold',
                marginBottom: '2px'
              }}>
                {label}
              </div>
              <div style={{ color: '#999', fontSize: '9px' }}>
                {description} (+{multiplier}战力/点)
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <button
                onClick={() => handleDecrease(element)}
                disabled={character.elementAttributes[element] <= 0}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #D4AF37',
                  background: character.elementAttributes[element] > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                  color: character.elementAttributes[element] > 0 ? '#D4AF37' : '#666',
                  borderRadius: '3px',
                  fontSize: '10px',
                  cursor: character.elementAttributes[element] > 0 ? 'pointer' : 'not-allowed'
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
                {character.elementAttributes[element]}
              </span>
              
              <button
                onClick={() => handleIncrease(element)}
                disabled={character.elementPoints <= 0}
                style={{
                  width: '20px',
                  height: '20px',
                  border: '1px solid #D4AF37',
                  background: character.elementPoints > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
                  color: character.elementPoints > 0 ? '#D4AF37' : '#666',
                  borderRadius: '3px',
                  fontSize: '10px',
                  cursor: character.elementPoints > 0 ? 'pointer' : 'not-allowed'
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
          color: character.elementPoints > 0 ? '#90EE90' : '#666'
        }}>
          可分配五行点数: {character.elementPoints}
        </div>
      </div>
    </div>
  );
}

export default ElementAllocation;