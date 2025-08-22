import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/uiSlice';
import { JEWELRY_ICONS } from '../../utils/constants';

function SynthesisSuccessModal() {
  const dispatch = useDispatch();
  const { open, jewelry } = useSelector(state => state.ui.modals.synthesisSuccess);

  // 移除自动关闭逻辑

  if (!open || !jewelry) return null;

  const handleClose = () => {
    dispatch(closeModal({ modalName: 'synthesisSuccess' }));
  };

  const icon = JEWELRY_ICONS[jewelry.type]?.[jewelry.level] || '💍';
  const hasSpecialAttributes = jewelry.additionalStats && 
    jewelry.additionalStats.some(stat => stat.quality === 'special');

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #2C1810 0%, #4A2C1A 30%, #3D2817 100%)',
          border: '2px solid #D4AF37',
          borderRadius: '12px',
          minWidth: '300px',
          maxWidth: '360px',
          padding: '20px',
          position: 'relative',
          maxHeight: 'none',
          overflow: 'visible',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
        }}
      >

        {/* 恭喜标题 */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '12px' 
        }}>
          <div style={{ 
            color: '#FFD700',
            fontSize: '18px', 
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3)',
            animation: 'textGlow 2s ease-in-out infinite alternate'
          }}>
            🎉 恭喜合成！
          </div>
        </div>

        {/* 首饰展示 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          <div style={{ 
            fontSize: '32px', 
            marginBottom: '6px'
          }}>{icon}</div>
          <div style={{ 
            color: '#FFD700', 
            fontSize: '16px', 
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {jewelry.name} Lv.{jewelry.level}
          </div>
        </div>

        {/* 基础属性 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 215, 0, 0.1) 100%)',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '12px',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          backdropFilter: 'blur(2px)'
        }}>
          <div style={{ 
            color: '#FFD700', 
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {jewelry.baseStats.name}: +{jewelry.baseStats.value}
          </div>
        </div>

        {/* 附加属性 */}
        {jewelry.additionalStats && jewelry.additionalStats.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(144, 238, 144, 0.12) 0%, rgba(34, 139, 34, 0.08) 100%)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '12px',
            border: '1px solid rgba(144, 238, 144, 0.4)',
            backdropFilter: 'blur(2px)'
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

        {/* 特殊属性提示 */}
        {hasSpecialAttributes && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 20, 147, 0.15) 0%, rgba(138, 43, 226, 0.1) 100%)',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '12px',
            textAlign: 'center',
            border: '1px solid rgba(255, 20, 147, 0.5)',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{ 
              color: '#FF69B4', 
              fontSize: '12px', 
              fontWeight: 'bold'
            }}>
              ✨ 获得特殊属性！
            </div>
          </div>
        )}


      </div>

      <style jsx>{`
        @keyframes textGlow {
          from {
            textShadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3);
            transform: scale(1);
          }
          to {
            textShadow: 0 0 15px rgba(255, 215, 0, 1), 0 0 25px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5);
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}

export default SynthesisSuccessModal;