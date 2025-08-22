import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BossModal from './BossModal';

function BossList() {
  const normalStone = useSelector(state => state.jewelry.normalStone);
  const superStone = useSelector(state => state.jewelry.superStone);
  const totalBossKills = useSelector(state => state.jewelry.totalBossKills);
  const [showBossModal, setShowBossModal] = useState(false);

  const handleBossChallenge = () => {
    setShowBossModal(true);
  };

  const handleCloseBossModal = () => {
    setShowBossModal(false);
  };


  return (
    <>
      <div className="boss-section" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', fontSize: '9px', color: '#87CEEB' }}>
          <span>击杀: <span style={{ color: '#FFD700' }}>{totalBossKills}</span></span>
          <span>💎 {normalStone}</span>
          <span>💠 {superStone}</span>
        </div>
        <button
          className="boss-challenge-btn"
          onClick={handleBossChallenge}
          style={{
            background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '9px',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 2px 4px rgba(139, 0, 0, 0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          妖王挑战
        </button>
      </div>
      
      {/* 妖王选择模态框 */}
      <BossModal 
        isOpen={showBossModal} 
        onClose={handleCloseBossModal} 
      />
    </>
  );
}

export default BossList;