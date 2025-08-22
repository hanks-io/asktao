import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../store/uiSlice';

const tabs = [
  { key: 'synthesis', label: '⚗️ 合成', title: '首饰合成' },
  { key: 'recast', label: '🔄 重铸', title: '首饰重铸' },
  { key: 'character', label: '⚔️ 人物', title: '角色成长' },
  { key: 'equipment', label: '⚔️ 装备', title: '装备系统' }
];

function TabNavigation() {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.ui.activeTab);

  const handleTabClick = (tabKey) => {
    dispatch(setActiveTab(tabKey));
  };

  return (
    <div className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.key)}
          title={tab.title}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;