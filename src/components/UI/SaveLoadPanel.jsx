import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showToast, addSystemLog } from '../../store/uiSlice';
import ConfirmDialog from './ConfirmDialog';

function SaveLoadPanel() {
  const dispatch = useDispatch();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))
  });

  const handleSaveGame = () => {
    try {
      const state = window.store?.getState();
      if (state) {
        const saveData = {
          character: state.character,
          jewelry: state.jewelry,
          equipment: state.equipment,
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        };
        localStorage.setItem('wendaoJewelrySave', JSON.stringify(saveData));
        dispatch(showToast({ message: '游戏已保存！', type: 'success' }));
        dispatch(addSystemLog({ message: '💾 手动保存游戏成功' }));
      }
    } catch (error) {
      console.error('保存失败:', error);
      dispatch(showToast({ message: '保存失败：' + error.message, type: 'error' }));
    }
  };

  const handleLoadGame = () => {
    try {
      const saveData = localStorage.getItem('wendaoJewelrySave');
      if (saveData) {
        const parsedData = JSON.parse(saveData);
        dispatch(showToast({ message: '存档读取成功！请刷新页面', type: 'success' }));
        dispatch(addSystemLog({ message: `📂 读取存档: ${new Date(parsedData.timestamp).toLocaleString()}` }));
        
        // 显示确认对话框
        setTimeout(() => {
          setConfirmDialog({
            isOpen: true,
            title: '读取存档',
            message: '存档已读取，是否刷新页面应用更改？',
            onConfirm: () => {
              setConfirmDialog(prev => ({ ...prev, isOpen: false }));
              window.location.reload();
            },
            onCancel: () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))
          });
        }, 1000);
      } else {
        dispatch(showToast({ message: '没有找到存档文件', type: 'warning' }));
      }
    } catch (error) {
      console.error('读取失败:', error);
      dispatch(showToast({ message: '读取失败：' + error.message, type: 'error' }));
    }
  };

  const handleClearSave = () => {
    setConfirmDialog({
      isOpen: true,
      title: '清空存档',
      message: '确定要清空存档吗？这将删除所有游戏进度！',
      onConfirm: () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        try {
          localStorage.removeItem('wendaoJewelrySave');
          dispatch(showToast({ message: '存档已清空！请刷新页面', type: 'success' }));
          dispatch(addSystemLog({ message: '🗑️ 存档已清空' }));
          
          setTimeout(() => {
            setConfirmDialog({
              isOpen: true,
              title: '重新开始',
              message: '存档已清空，是否刷新页面重新开始？',
              onConfirm: () => {
                setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                window.location.reload();
              },
              onCancel: () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))
            });
          }, 1000);
        } catch (error) {
          console.error('清空失败:', error);
          dispatch(showToast({ message: '清空失败：' + error.message, type: 'error' }));
        }
      },
      onCancel: () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))
    });
  };

  return (
    <div className="save-load-panel" style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    }}>
      <button
        className="btn btn-primary"
        onClick={handleSaveGame}
        title="保存游戏"
        style={{
          padding: '4px 6px',
          fontSize: '9px',
          background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        💾
      </button>
      
      <button
        className="btn btn-secondary"
        onClick={handleLoadGame}
        title="读取存档"
        style={{
          padding: '4px 6px',
          fontSize: '9px',
          background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        📂
      </button>
      
      <button
        className="btn btn-danger"
        onClick={handleClearSave}
        title="清空存档"
        style={{
          padding: '4px 6px',
          fontSize: '9px',
          background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🗑️
      </button>

      {/* 确认对话框 */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
    </div>
  );
}

export default SaveLoadPanel;