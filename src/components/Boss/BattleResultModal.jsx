import React, { useEffect, useState } from 'react';

function BattleResultModal({ isOpen, result, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // 等动画完成
  };

  if (!isOpen) return null;

  return (
    <div 
      className="battle-result-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        opacity: show ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
      onClick={handleClose}
    >
      <div 
        className="battle-result-modal"
        style={{
          background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
          border: '3px solid #D4AF37',
          borderRadius: '15px',
          padding: '30px',
          maxWidth: '350px',
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          transform: show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 战斗结果标题 */}
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: result.victory ? '#90EE90' : '#FF6B6B',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          {result.victory ? '⚔️ 胜利！' : '💀 败北'}
        </div>

        {/* 妖王信息 */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid #444',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            color: '#FFD700',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>
            {result.bossName}
          </div>
          <div style={{
            color: '#87CEEB',
            fontSize: '12px'
          }}>
            {result.bossLevel}级妖王
          </div>
        </div>

        {/* 战斗结果内容 */}
        {result.victory ? (
          <div>
            {result.rewards && result.rewards.length > 0 ? (
              <div>
                <div style={{
                  color: '#D4AF37',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  获得奖励：
                </div>
                <div style={{
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '20px'
                }}>
                  {result.rewards.map((reward, index) => (
                    <div
                      key={index}
                      style={{
                        color: '#F5DEB3',
                        fontSize: '13px',
                        marginBottom: index < result.rewards.length - 1 ? '8px' : 0,
                        padding: '5px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        animation: `slideIn 0.5s ease ${index * 0.2}s both`
                      }}
                    >
                      {reward}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                color: '#999',
                fontSize: '13px',
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px'
              }}>
                本次挑战未获得任何掉落物品
              </div>
            )}
          </div>
        ) : (
          <div style={{
            color: '#FF6B6B',
            fontSize: '13px',
            marginBottom: '20px',
            padding: '15px',
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid #FF6B6B',
            borderRadius: '8px'
          }}>
            挑战失败，再接再厉！
          </div>
        )}

        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(212, 175, 55, 0.3)'
          }}
          onMouseEnter={e => {
            e.target.style.background = 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          确定
        </button>

        {/* 添加CSS动画 */}
        <style>
          {`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default BattleResultModal;