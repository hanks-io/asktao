import React from 'react';
import { useDispatch } from 'react-redux';
import { addSuperStone, addJewelry, incrementBossKills } from '../../store/jewelrySlice';
import { addSystemLog, addMiscLog, showToast } from '../../store/uiSlice';
import { generateJewelry } from '../../utils/gameLogic';

function BossCard({ boss }) {
  const dispatch = useDispatch();

  const handleAttackBoss = () => {
    // 模拟战斗结果
    const isVictory = Math.random() > 0.3; // 70% 胜率
    
    if (isVictory) {
      dispatch(incrementBossKills());
      
      // 掉落女娲石（高级妖王）
      if (boss.level >= 70 && Math.random() < 0.3) {
        const amount = Math.floor(Math.random() * 2) + 1;
        dispatch(addSuperStone(amount));
        dispatch(addMiscLog({ message: `💠 获得女娲石 x${amount}` }));
      }
      
      // 掉落首饰
      if (Math.random() < boss.drops.jewelry) {
        const jewelry = generateJewelry(boss.level);
        dispatch(addJewelry(jewelry));
        dispatch(addMiscLog({ message: `✨ 获得 ${jewelry.name}` }));
      }
      
      dispatch(addSystemLog({ message: `⚔️ 成功击败 ${boss.name}！` }));
      dispatch(showToast({ message: `击败了 ${boss.name}！`, type: 'success' }));
    } else {
      dispatch(addSystemLog({ message: `💀 挑战 ${boss.name} 失败...` }));
      dispatch(showToast({ message: `挑战失败，再接再厉！`, type: 'warning' }));
    }
  };

  return (
    <div className="boss-card" style={{
      background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
      border: `2px solid ${boss.level >= 100 ? '#FF6B6B' : boss.level >= 70 ? '#FFD700' : '#87CEEB'}`,
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '11px'
    }}
    onClick={handleAttackBoss}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }}
    >
      <div style={{ fontSize: '20px', marginBottom: '4px' }}>
        {getBossIcon(boss.level)}
      </div>
      <div style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '2px' }}>
        {boss.name}
      </div>
      <div style={{ color: '#87CEEB', marginBottom: '2px' }}>
        Lv.{boss.level}
      </div>
      <div style={{ color: '#90EE90', fontSize: '9px', marginBottom: '2px' }}>
        HP: {boss.hp}
      </div>
      <div style={{ color: '#FF6B6B', fontSize: '9px' }}>
        攻击: {boss.power}
      </div>
    </div>
  );
}

function getBossIcon(level) {
  if (level >= 150) return '👑';
  if (level >= 130) return '💀';
  if (level >= 110) return '🐉';
  if (level >= 90) return '👹';
  if (level >= 70) return '🔥';
  if (level >= 50) return '⚡';
  return '👿';
}

export default BossCard;