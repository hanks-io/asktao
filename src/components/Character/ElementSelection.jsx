import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectElement } from '../../store/characterSlice';
import { addSystemLog, showToast } from '../../store/uiSlice';

const ELEMENT_STYLES = {
  金: { background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#000' },
  木: { background: 'linear-gradient(135deg, #90EE90, #228B22)', color: '#000' },
  水: { background: 'linear-gradient(135deg, #87CEEB, #4682B4)', color: '#000' },
  火: { background: 'linear-gradient(135deg, #FF6B6B, #DC143C)', color: '#fff' },
  土: { background: 'linear-gradient(135deg, #DEB887, #8B7355)', color: '#000' }
};

function ElementSelection() {
  const dispatch = useDispatch();
  const selectedElement = useSelector(state => state.character.element);

  const handleElementSelect = (element) => {
    if (selectedElement === element) return;
    
    dispatch(selectElement(element));
    dispatch(addSystemLog({ message: `选择了五行：${element}` }));
    dispatch(showToast({ message: `选择了五行：${element}`, type: 'success' }));
  };

  return (
    <div className="element-selection" style={{
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
        五行选择
      </h4>
      
      <div className="element-buttons" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '4px'
      }}>
        {Object.keys(ELEMENT_STYLES).map(element => (
          <button
            key={element}
            className="element-btn"
            onClick={() => handleElementSelect(element)}
            style={{
              padding: '6px',
              fontSize: '10px',
              ...ELEMENT_STYLES[element],
              border: selectedElement === element ? '2px solid #fff' : '1px solid #D4AF37',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: selectedElement === element ? `0 0 10px ${ELEMENT_STYLES[element].background.split(',')[0].split('(')[1]}` : 'none'
            }}
          >
            {element}
          </button>
        ))}
      </div>
      
      {selectedElement && (
        <div style={{
          marginTop: '8px',
          fontSize: '10px',
          color: '#87CEEB',
          textAlign: 'center'
        }}>
          已选择五行：{selectedElement}
        </div>
      )}
    </div>
  );
}

export default ElementSelection;