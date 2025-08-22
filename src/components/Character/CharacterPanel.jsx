import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CharacterInfo from './CharacterInfo';
import ElementSelection from './ElementSelection';
import AttributeAllocation from './AttributeAllocation';
import ElementAllocation from './ElementAllocation';
import CharacterActions from './CharacterActions';
import { updatePowerRating } from '../../store/characterSlice';

function CharacterPanel() {
  const dispatch = useDispatch();
  
  // 当角色数据变化时更新战力
  useEffect(() => {
    dispatch(updatePowerRating());
  }, [dispatch]);

  return (
    <div className="character-panel">
      {/* 角色信息区域 */}
      <div className="character-section" style={{ marginBottom: '20px', color: '#ffffff' }}>
        <div className="section-header" style={{
          color: '#D4AF37',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          角色信息
        </div>
        
        {/* 角色基本信息 */}
        <CharacterInfo />
        
        {/* 五行选择 */}
        <ElementSelection />
        
        {/* 基础属性分配 */}
        <AttributeAllocation />
        
        {/* 五行天赋分配 */}
        <ElementAllocation />
        
        {/* 操作按钮 */}
        <CharacterActions />
      </div>
    </div>
  );
}

export default CharacterPanel;