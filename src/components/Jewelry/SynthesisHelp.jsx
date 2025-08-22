import React from 'react';

function SynthesisHelp() {
  return (
    <div className="synthesis-help" style={{
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
        合成规则说明
      </div>
      
      <div style={{ fontSize: '10px', color: '#87CEEB', lineHeight: '1.4' }}>
        <div style={{ marginBottom: '4px' }}>
          • 20级：3个20级首饰 = 35级 (100%成功)
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 35级：3个35级首饰 = 50级 (100%成功)
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 50级：3个50级首饰 = 60级 (100%成功)
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 60级：3个60级首饰 = 70级 (100%成功)
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 70级：1个70级首饰 + 2个女娲石 = 80级 (95%成功)
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 80-100级：1个当前等级首饰 + 2个女娲石
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 110-140级：1个当前等级首饰 + 2个70级首饰 (100%成功)
        </div>
        <div style={{ marginBottom: '4px' }}>
          • 150级：已是最高等级，无法合成
        </div>
        <div style={{ color: '#FFD700', fontSize: '9px' }}>
          成功率：80级(95%)，90级(90%)，100级(70%)
        </div>
      </div>
    </div>
  );
}

export default SynthesisHelp;