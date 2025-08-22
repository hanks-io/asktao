import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store/uiSlice';

function Toast() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector(state => state.ui.toast);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, dispatch]);

  // 关键字高亮函数
  const highlightKeywords = (text) => {
    const keywords = {
      // 金色关键字
      '成功击败': '#FFD700',
      '成功合成': '#FFD700', 
      '获得': '#FFD700',
      '胜利': '#FFD700',
      // 红色关键字
      '失败': '#FF6B6B',
      '败北': '#FF6B6B',
      '不足': '#FF6B6B',
      // 绿色关键字
      '首饰': '#90EE90',
      // 蓝色关键字  
      '女娲石': '#87CEEB',
      // 紫色关键字
      '青珑挂珠': '#DDA0DD',
      '紫晶坠子': '#DDA0DD',
      '三才项圈': '#DDA0DD',
      '幻彩项链': '#DDA0DD'
    };

    let highlightedText = text;
    Object.entries(keywords).forEach(([keyword, color]) => {
      const regex = new RegExp(`(${keyword})`, 'g');
      highlightedText = highlightedText.replace(regex, `<span style="color: ${color}; text-shadow: 0 0 4px ${color}50;">$1</span>`);
    });

    return highlightedText;
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
      <div 
        className={`toast ${type}`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.75)',
          border: '1px solid #D4AF37',
          borderRadius: '8px',
          padding: '12px 20px',
          color: '#F5DEB3',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 10000,
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)',
          animation: 'toastSlideIn 0.3s ease-out',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
          minWidth: '200px',
          textAlign: 'center',
          whiteSpace: 'pre-line'
        }}
        dangerouslySetInnerHTML={{ __html: highlightKeywords(message) }}
      />
    </>
  );
}

export default Toast;