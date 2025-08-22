import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabNavigation from './UI/TabNavigation';
import SynthesisPanel from './Jewelry/SynthesisPanel';
import RecastPanel from './Jewelry/RecastPanel';
import CharacterPanel from './Character/CharacterPanel';
import EquipmentPanel from './Equipment/EquipmentPanel';
import LogPanel from './UI/LogPanel';
import Toast from './UI/Toast';
import SaveLoadPanel from './UI/SaveLoadPanel';
import JewelryDetailModal from './UI/JewelryDetailModal';
import SynthesisSuccessModal from './UI/SynthesisSuccessModal';
import EquipmentDetailModal from './Equipment/EquipmentDetailModal';
import EquipmentBag from './Equipment/EquipmentBag';
import BossList from './Boss/BossList';
// import { useMobile } from '../hooks/useMobile'; // 移动端适配预留
import { useGameData } from '../hooks/useGameData';
import { initializeItems } from '../store/jewelrySlice';
import { addSystemLog } from '../store/uiSlice';

function MainApp() {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.ui.activeTab);
  // const { isMobile } = useMobile(); // 移动端适配预留
  const { updateCalculatedData } = useGameData();

  useEffect(() => {
    // 初始化游戏数据
    const initializeGame = () => {
      // 检查是否有存档数据，如果有就不初始化
      const saveData = localStorage.getItem('wendaoJewelrySave');
      if (!saveData) {
        // 只有在没有存档时才初始化默认数据
        dispatch(initializeItems());
        console.log('[游戏初始化] 未找到存档，初始化默认数据');
      } else {
        console.log('[游戏初始化] 检测到存档，跳过初始化');
      }
      dispatch(addSystemLog({ message: '🎉 欢迎来到问道手游首饰打造系统！' }));
      updateCalculatedData();
    };

    initializeGame();
  }, [dispatch, updateCalculatedData]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'synthesis':
        return <SynthesisPanel />;
      case 'recast':
        return <RecastPanel />;
      case 'character':
        return <CharacterPanel />;
      case 'equipment':
        return <EquipmentPanel />;
      default:
        return <SynthesisPanel />;
    }
  };

  return (
    <div className="wendao-app">
      {/* 游戏标题 */}
      <h1 className="game-title">问道手游首饰打造系统</h1>
      
      {/* 顶部导航栏 - 保持原有功能 */}
      <div className="top-bar">
        <SaveLoadPanel />
        <BossList />
      </div>
      
      {/* 主内容区域 */}
      <div className="main-content">
        <TabNavigation />
        <div className="tab-content active">
          {renderActiveTab()}
        </div>
      </div>
      
      {/* 日志面板 */}
      <LogPanel />
      
      {/* Toast 消息 */}
      <Toast />
      
      {/* 模态框 */}
      <JewelryDetailModal />
      <SynthesisSuccessModal />
      <EquipmentDetailModal />
      <EquipmentBag />
    </div>
  );
}

export default MainApp;