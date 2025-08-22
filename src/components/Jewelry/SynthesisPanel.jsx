import React from 'react';
import { useSelector } from 'react-redux';
import JewelryBag from './JewelryBag';
import SynthesisSlots from './SynthesisSlots';
import SynthesisButton from './SynthesisButton';
import SynthesisHelp from './SynthesisHelp';

function SynthesisPanel() {
  const superStone = useSelector(state => state.jewelry.superStone);

  return (
    <div className="synthesis-panel">
      {/* 背包区域 */}
      <div className="bag-section" style={{ marginBottom: '20px' }}>
        <div className="section-header" style={{
          color: '#D4AF37',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          背包
        </div>
        
        {/* 材料统计 */}
        <div className="materials-info" style={{
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid #444',
          borderRadius: '6px',
          padding: '8px',
          marginBottom: '10px',
          fontSize: '12px'
        }}>
          <div style={{ color: '#87CEEB' }}>
            💠 女娲石: <span style={{ color: '#FF6B6B' }}>{superStone}</span>
          </div>
        </div>

        <JewelryBag />
        
        {/* 操作提示 */}
        <div className="bag-tip" style={{
          marginTop: '8px',
          fontSize: '10px',
          color: '#666',
          textAlign: 'center'
        }}>
          💡 单击选择操作 • 长按查看属性
        </div>
      </div>

      {/* 合成操作区域 */}
      <div className="operation-section">
        <div className="section-header" style={{
          color: '#D4AF37',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          首饰合成
        </div>

        <SynthesisSlots />
        <SynthesisButton />
        <SynthesisHelp />
      </div>
    </div>
  );
}

export default SynthesisPanel;