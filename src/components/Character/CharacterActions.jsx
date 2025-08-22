import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { levelUp, resetCharacter, updatePowerRating } from '../../store/characterSlice';
import { addSystemLog, showToast } from '../../store/uiSlice';
import ConfirmDialog from '../UI/ConfirmDialog';

function CharacterActions() {
  const dispatch = useDispatch();
  const character = useSelector(state => state.character);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))
  });

  const handleLevelUp = () => {
    if (character.level >= 150) {
      dispatch(showToast({ message: '已达到最高等级150级！', type: 'warning' }));
      return;
    }

    dispatch(levelUp());
    dispatch(updatePowerRating());
    dispatch(addSystemLog({ 
      message: `🎉 角色升级到${character.level + 1}级！获得4属性点和1五行点` 
    }));
    dispatch(showToast({ 
      message: `🎉 升级到 ${character.level + 1} 级！`, 
      type: 'success' 
    }));
  };

  const handleReset = () => {
    setConfirmDialog({
      isOpen: true,
      title: '重置角色',
      message: '确定要重置角色吗？这将清空所有属性分配！',
      onConfirm: () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        dispatch(resetCharacter());
        dispatch(addSystemLog({ message: '角色已重置' }));
        dispatch(showToast({ message: '角色已重置！', type: 'info' }));
      },
      onCancel: () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))
    });
  };

  return (
    <div className="character-actions" style={{
      display: 'flex',
      gap: '8px'
    }}>
      <button
        onClick={handleLevelUp}
        disabled={character.level >= 150}
        style={{
          flex: 1,
          padding: '8px',
          background: character.level >= 150 ? 
            '#666' : 
            'linear-gradient(135deg, #D4AF37, #B8860B)',
          border: 'none',
          borderRadius: '4px',
          color: character.level >= 150 ? '#999' : '#000',
          fontSize: '11px',
          cursor: character.level >= 150 ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
      >
        {character.level >= 150 ? '已满级' : `升级 (${character.level} → ${character.level + 1})`}
      </button>
      
      <button
        onClick={handleReset}
        style={{
          flex: 1,
          padding: '8px',
          background: 'linear-gradient(135deg, #CD5C5C, #8B0000)',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '11px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
      >
        重置角色
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

export default CharacterActions;