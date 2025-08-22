import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/uiSlice';
import { JEWELRY_ICONS } from '../../utils/constants';
import { calculateCharacterBonus } from '../../utils/gameLogic';

function JewelryDetailModal() {
  const dispatch = useDispatch();
  const { open, jewelry, index } = useSelector(state => state.ui.modals.jewelryDetail);
  const character = useSelector(state => state.character);

  if (!open || !jewelry) return null;

  const handleClose = () => {
    dispatch(closeModal({ modalName: 'jewelryDetail' }));
  };

  const icon = JEWELRY_ICONS[jewelry.type]?.[jewelry.level] || '💍';
  const characterBonus = calculateCharacterBonus(character, jewelry);

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: 'none',
          overflow: 'visible'
        }}
      >
        {/* 紧凑标题 */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <div style={{ 
            fontSize: '32px', 
            marginBottom: '6px'
          }}>{icon}</div>
          <div style={{ 
            color: '#D4AF37', 
            fontSize: '16px', 
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {jewelry.name} Lv.{jewelry.level}
          </div>
        </div>

        {/* 基础属性 */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.1)',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '12px',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          <div style={{ 
            color: '#FFD700', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {jewelry.baseStats.name}: +{jewelry.baseStats.value}
          </div>
        </div>

        {/* 角色加成 */}
        {characterBonus > 1.0 && (
          <div style={{
            background: 'rgba(135, 206, 235, 0.1)',
            padding: '8px',
            borderRadius: '6px',
            marginBottom: '12px',
            border: '1px solid rgba(135, 206, 235, 0.3)'
          }}>
            <div style={{ 
              color: '#87CEEB',
              fontSize: '13px',
              fontWeight: 'bold'
            }}>
              角色加成: +{Math.floor(jewelry.baseStats.value * characterBonus) - jewelry.baseStats.value} 
              <span style={{ color: '#90EE90' }}>(+{Math.floor((characterBonus - 1.0) * 100)}%)</span>
            </div>
          </div>
        )}

        {/* 附加属性 */}
        {jewelry.additionalStats && jewelry.additionalStats.length > 0 && (
          <div style={{
            background: 'rgba(144, 238, 144, 0.1)',
            padding: '8px',
            borderRadius: '6px',
            marginBottom: '12px',
            border: '1px solid rgba(144, 238, 144, 0.3)'
          }}>
            {jewelry.additionalStats.map((stat, idx) => {
              const color = stat.quality === 'special' ? '#FFD700' : '#90EE90';
              return (
                <div key={idx} style={{ 
                  color, 
                  fontSize: '13px',
                  fontWeight: 'bold',
                  marginBottom: '3px'
                }}>
                  {stat.name}: +{stat.value}{stat.unit || ''}
                </div>
              );
            })}
          </div>
        )}

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
          <button
            onClick={handleClose}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              color: '#000',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            关闭
          </button>
        </div>

        {/* 合成提示 */}
        {jewelry.level >= 70 && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#8B4513', fontSize: '12px', marginBottom: '8px' }}>
              {jewelry.level >= 110 ? 
                `${jewelry.level}级首饰需要配合70级首饰进行合成` :
                `${jewelry.level}级首饰可以使用女娲石进行合成`
              }
            </div>
            <div style={{ color: '#666', fontSize: '11px' }}>
              {jewelry.level >= 110 ?
                '请在背包中选择对应的70级首饰，然后点击合成按钮' :
                '需要2个女娲石进行合成'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JewelryDetailModal;