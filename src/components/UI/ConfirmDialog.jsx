import React, { useEffect, useState } from 'react';

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = '确定', cancelText = '取消' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setShow(false);
    setTimeout(() => {
      onConfirm();
    }, 300);
  };

  const handleCancel = () => {
    setShow(false);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="confirm-dialog-overlay"
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
        zIndex: 2500, // 确保在所有其他模态框之上
        opacity: show ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
      onClick={handleCancel}
    >
      <div 
        className="confirm-dialog-modal"
        style={{
          background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
          border: '3px solid #D4AF37',
          borderRadius: '15px',
          padding: '25px',
          maxWidth: '320px',
          width: '85%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          transform: show ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* 标题 */}
        {title && (
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#D4AF37',
            marginBottom: '15px',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            {title}
          </div>
        )}

        {/* 消息内容 */}
        <div style={{
          color: '#F5DEB3',
          fontSize: '13px',
          lineHeight: '1.5',
          marginBottom: '25px',
          whiteSpace: 'pre-line' // 支持换行符
        }}>
          {message}
        </div>

        {/* 按钮组 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleCancel}
            style={{
              flex: 1,
              padding: '10px 15px',
              background: 'linear-gradient(135deg, #666 0%, #444 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #777 0%, #555 100%)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'linear-gradient(135deg, #666 0%, #444 100%)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '10px 15px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 3px 6px rgba(212, 175, 55, 0.3)'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #FFD700 0%, #DAA520 100%)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;