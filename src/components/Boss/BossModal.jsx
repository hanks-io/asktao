import React from 'react';
import { useDispatch } from 'react-redux';
import { addSuperStone, addJewelry, incrementBossKills } from '../../store/jewelrySlice';
import { addSystemLog, showToast } from '../../store/uiSlice';
import { generateJewelry } from '../../utils/gameLogic';
import { BOSS_CONFIG, BOSS_JEWELRY_DROP_CONFIG } from '../../utils/constants';

function BossModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleBossAttack = (boss) => {
    console.log(`[妖王挑战] 开始挑战：${boss.name} (${boss.level}级)`);
    
    // 模拟战斗结果
    const isVictory = Math.random() > 0.3; // 70% 胜率
    console.log(`[妖王挑战] 战斗结果：${isVictory ? '胜利' : '失败'}`);
    
    const rewards = [];
    
    if (isVictory) {
      dispatch(incrementBossKills());
      console.log(`[妖王挑战] 击杀数增加，当前妖王：${boss.name}`);
      
      // 60级以上boss必爆女娲石
      if (boss.level >= 60) {
        // 60级以上掉落女娲石，数量1-10个
        const amount = Math.floor(Math.random() * 10) + 1;
        dispatch(addSuperStone(amount));
        rewards.push(`💠 女娲石 x${amount}`);
        console.log(`[掉落成功] 女娲石 x${amount} (60级以上必爆1-10个)`);
      } else {
        // 60级以下按概率掉落
        const stoneRoll = Math.random();
        console.log(`[掉落检查] 女娲石掉落率：${boss.drops.normalStone}，随机数：${stoneRoll.toFixed(3)}`);
        if (stoneRoll < boss.drops.normalStone) {
          const amount = Math.floor(Math.random() * 3) + 1;
          dispatch(addSuperStone(amount));
          rewards.push(`💠 女娲石 x${amount}`);
          console.log(`[掉落成功] 女娲石 x${amount}`);
        }
      }
      
      // 掉落首饰 - 使用boss配置表
      const jewelryRoll = Math.random();
      console.log(`[掉落检查] 首饰掉落率：${boss.drops.jewelry}，随机数：${jewelryRoll.toFixed(3)}`);
      if (jewelryRoll < boss.drops.jewelry) {
        const bossDropConfig = BOSS_JEWELRY_DROP_CONFIG[boss.level];
        if (bossDropConfig) {
          const totalWeight = bossDropConfig.jewelryLevels.reduce((sum, item) => sum + item.weight, 0);
          let randomWeight = Math.random() * totalWeight;
          
          for (const levelConfig of bossDropConfig.jewelryLevels) {
            randomWeight -= levelConfig.weight;
            if (randomWeight <= 0) {
              const amount = Math.floor(Math.random() * (levelConfig.amount.max - levelConfig.amount.min + 1)) + levelConfig.amount.min;
              
              for (let i = 0; i < amount; i++) {
                const jewelry = generateJewelry(levelConfig.level);
                dispatch(addJewelry(jewelry));
                rewards.push(`✨ ${jewelry.name}`);
                console.log(`[掉落成功] 首饰：${jewelry.name} (${jewelry.level}级)`);
              }
              break;
            }
          }
        }
      }
      
      console.log(`[战斗结束] 总奖励：`, rewards);
      dispatch(addSystemLog({ message: `⚔️ 成功击败 ${boss.name}！` }));
      
      // 显示战斗胜利toast
      const rewardsText = rewards.length > 0 ? `获得：${rewards.join(', ')}` : '';
      dispatch(showToast({ 
        message: `🎉 成功击败 ${boss.name}！${rewardsText}`, 
        type: 'success' 
      }));
      console.log(`[Toast显示] 胜利消息：${rewardsText}`);
    } else {
      dispatch(addSystemLog({ message: `💀 挑战 ${boss.name} 失败...` }));
      
      // 显示战斗失败toast
      dispatch(showToast({ 
        message: `💀 挑战 ${boss.name} 失败`, 
        type: 'error' 
      }));
      console.log(`[Toast显示] 失败消息`);
    }
    
    console.log(`[妖王挑战] 挑战结束，关闭模态框`);
    onClose(); // 关闭选择妖王的模态框
  };

  const getBossIcon = (level) => {
    if (level >= 150) return '👑';
    if (level >= 130) return '💀';
    if (level >= 110) return '🐉';
    if (level >= 90) return '👹';
    if (level >= 70) return '🔥';
    if (level >= 50) return '⚡';
    return '👿';
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        style={{
          background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
          borderRadius: '12px',
          border: '2px solid #D4AF37',
          padding: '15px',
          maxWidth: '360px',
          width: '100%',
          maxHeight: 'none',
          overflow: 'visible',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: '20px',
            cursor: 'pointer',
            padding: 0,
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
        
        <div style={{
          color: '#D4AF37',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          妖王挑战
        </div>
        
        <div style={{ display: 'grid', gap: '8px' }}>
          {BOSS_CONFIG.map((boss, index) => (
            <div
              key={index}
              onClick={() => handleBossAttack(boss)}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid #444',
                borderRadius: '6px',
                padding: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(0,0,0,0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  color: '#FF6B6B',
                  fontSize: '16px',
                  minWidth: '20px',
                  textAlign: 'center'
                }}>
                  {getBossIcon(boss.level)}
                </div>
                <div style={{ 
                  flex: 1,
                  minWidth: 0 // 允许文本收缩
                }}>
                  <div style={{
                    color: '#FFD700',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {boss.name}
                  </div>
                  <div style={{
                    color: '#87CEEB',
                    fontSize: '10px',
                    marginTop: '1px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {boss.level}级 - {boss.description}
                  </div>
                  <div style={{
                    color: '#90EE90',
                    fontSize: '9px',
                    marginTop: '1px'
                  }}>
                    HP: {boss.hp} | ATK: {boss.power}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BossModal;