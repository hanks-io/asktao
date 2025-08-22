import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/uiSlice';
import { 
  EQUIPMENT_SLOTS, 
  EQUIPMENT_SLOT_NAMES, 
  EQUIPMENT_QUALITY_COLORS,
  EQUIPMENT_SLOT_ICONS 
} from '../../utils/equipmentConstants';

function EquipmentPanel() {
  const dispatch = useDispatch();
  const equippedItems = useSelector(state => state.equipment.slots);
  const totalPower = useSelector(state => state.equipment.totalPower);
  
  const handleSlotClick = (slot) => {
    dispatch(openModal({
      modalName: 'equipmentBag',
      data: { targetSlot: slot }
    }));
  };

  const handleEquipmentClick = (equipment) => {
    dispatch(openModal({
      modalName: 'equipmentDetail',
      data: { equipment }
    }));
  };

  const handleOpenBag = () => {
    dispatch(openModal({
      modalName: 'equipmentBag',
      data: {}
    }));
  };

  return (
    <div className="equipment-panel">
      {/* 标题和总战斗力 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div className="section-header" style={{
          color: '#D4AF37',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          装备系统
        </div>
        <div style={{
          color: '#FFD700',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          总战力: {totalPower || 0}
        </div>
      </div>

      {/* 装备槽位 - 4x2网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '20px',
        padding: '16px',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid #D4AF37',
        borderRadius: '8px'
      }}>
        {Object.values(EQUIPMENT_SLOTS).map((slot) => {
          const equipment = equippedItems[slot];
          return (
            <div
              key={slot}
              onClick={() => equipment ? handleEquipmentClick(equipment) : handleSlotClick(slot)}
              style={{
                aspectRatio: '1',
                background: equipment ? 
                  'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)' : 
                  'linear-gradient(135deg, #333 0%, #222 100%)',
                border: equipment ? 
                  `2px solid ${EQUIPMENT_QUALITY_COLORS[equipment.quality]}` : 
                  '2px dashed #666',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = equipment ? 
                  `0 4px 12px ${EQUIPMENT_QUALITY_COLORS[equipment.quality]}40` :
                  '0 4px 12px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {equipment ? (
                <>
                  {/* 装备图标 */}
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>
                    {equipment.icon}
                  </div>
                  {/* 装备等级 */}
                  <div style={{
                    color: EQUIPMENT_QUALITY_COLORS[equipment.quality],
                    fontSize: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    Lv.{equipment.level}
                  </div>
                  {/* 特殊属性标识 */}
                  {equipment.additionalStats && equipment.additionalStats.some(stat => stat.quality === 'special') && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      color: '#FFD700',
                      fontSize: '10px'
                    }}>
                      ✨
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* 空槽位图标 */}
                  <div style={{ 
                    fontSize: '20px', 
                    marginBottom: '4px',
                    opacity: 0.6
                  }}>
                    {EQUIPMENT_SLOT_ICONS[slot]}
                  </div>
                  {/* 槽位名称 */}
                  <div style={{
                    color: '#666',
                    fontSize: '9px',
                    textAlign: 'center',
                    lineHeight: '1.1'
                  }}>
                    {EQUIPMENT_SLOT_NAMES[slot]}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* 操作按钮 */}
      <div style={{
        display: 'flex',
        gap: '12px'
      }}>
        <button
          onClick={handleOpenBag}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            color: '#000',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          🎒 装备背包
        </button>
      </div>

      {/* 套装信息 */}
      <div style={{
        marginTop: '15px',
        padding: '12px',
        background: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid #444',
        borderRadius: '6px'
      }}>
        <div style={{
          color: '#90EE90',
          fontSize: '13px',
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          套装加成
        </div>
        <div style={{
          color: '#87CEEB',
          fontSize: '12px',
          lineHeight: '1.4'
        }}>
          同等级同五行绿色装备可组成套装<br/>
          获得额外属性加成
        </div>
      </div>
    </div>
  );
}

export default EquipmentPanel;