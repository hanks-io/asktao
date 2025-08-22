import React from 'react';
import { useSelector } from 'react-redux';
import JewelryBag from './JewelryBag';
import RecastSlots from './RecastSlots';
import RecastButton from './RecastButton';

function RecastPanel() {
  const normalStone = useSelector(state => state.jewelry.normalStone);
  const superStone = useSelector(state => state.jewelry.superStone);

  return (
    <div className="recast-panel">
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

        <JewelryBag mode="recast" />
        
        {/* 操作提示 */}
        <div className="bag-tip" style={{
          marginTop: '8px',
          fontSize: '10px',
          color: '#666',
          textAlign: 'center'
        }}>
          💡 选择80-100级首饰进行重铸
        </div>
      </div>

      {/* 重铸操作区域 */}
      <div className="operation-section">
        <div className="section-header" style={{
          color: '#D4AF37',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          首饰重铸（80-100级专用）
        </div>

        <RecastSlots />
        <RecastButton />
        
        {/* 重铸说明 */}
        <div className="recast-help" style={{
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid #444',
          borderRadius: '6px',
          padding: '12px'
        }}>
          <div style={{
            color: '#D4AF37',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            重铸规则说明
          </div>
          
          <div style={{ fontSize: '10px', color: '#87CEEB', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '4px' }}>
              • 重铸可重新随机首饰的附加属性
            </div>
            <div style={{ marginBottom: '4px' }}>
              • 需要3个同类型同等级的80-100级首饰
            </div>
            <div style={{ color: '#90EE90', fontSize: '9px' }}>
              • 100%成功率，不消耗额外材料
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecastPanel;