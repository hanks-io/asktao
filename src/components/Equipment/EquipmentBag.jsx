import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { equipItem } from '../../store/equipmentSlice';
import { closeModal, showToast, openModal } from '../../store/uiSlice';
import { EQUIPMENT_QUALITY_COLORS, EQUIPMENT_SLOT_NAMES } from '../../utils/equipmentConstants';

function EquipmentBag() {
  const dispatch = useDispatch();
  const { open, data } = useSelector(state => state.ui.modals.equipmentBag);
  const equipmentBag = useSelector(state => state.equipment.inventory);
  const [sortBy, setSortBy] = useState('level'); // level, quality, slot

  if (!open) return null;

  const targetSlot = data?.targetSlot;

  // 过滤装备（如果指定了目标槽位）
  const filteredEquipment = targetSlot ? 
    equipmentBag.filter(item => item.slot === targetSlot) : 
    equipmentBag;

  // 排序装备
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    switch (sortBy) {
      case 'level':
        return b.level - a.level;
      case 'quality':
        const qualityOrder = { white: 0, blue: 1, pink: 2, gold: 3, green: 4 };
        return qualityOrder[b.quality] - qualityOrder[a.quality];
      case 'slot':
        return a.slot.localeCompare(b.slot);
      default:
        return 0;
    }
  });

  const handleEquipmentClick = (equipment) => {
    if (targetSlot && equipment.slot !== targetSlot) {
      dispatch(showToast({ 
        message: `该装备不能装备到${EQUIPMENT_SLOT_NAMES[targetSlot]}槽位`, 
        type: 'warning' 
      }));
      return;
    }

    dispatch(equipItem({ slot: equipment.slot, equipment }));
    dispatch(showToast({ 
      message: `已装备 ${equipment.name}`, 
      type: 'success' 
    }));
    dispatch(closeModal({ modalName: 'equipmentBag' }));
  };

  const handleEquipmentLongPress = (equipment) => {
    dispatch(openModal({
      modalName: 'equipmentDetail',
      data: { equipment }
    }));
  };

  const handleClose = () => {
    dispatch(closeModal({ modalName: 'equipmentBag' }));
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: 'none',
          overflow: 'visible',
          minWidth: '320px',
          maxWidth: '400px'
        }}
      >
        {/* 标题和排序 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div style={{
            color: '#D4AF37',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            装备背包 ({filteredEquipment.length})
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#333',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            <option value="level">按等级</option>
            <option value="quality">按品质</option>
            <option value="slot">按部位</option>
          </select>
        </div>

        {/* 装备网格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(60px, 1fr))',
          gap: '8px',
          maxHeight: '300px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '8px',
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid #444',
          borderRadius: '6px'
        }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {sortedEquipment.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: '#666',
              padding: '40px 20px',
              fontSize: '14px'
            }}>
              {targetSlot ? `没有可装备的${EQUIPMENT_SLOT_NAMES[targetSlot]}` : '背包为空'}
            </div>
          ) : (
            sortedEquipment.map((equipment) => (
              <div
                key={equipment.id}
                onClick={() => handleEquipmentClick(equipment)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleEquipmentLongPress(equipment);
                }}
                style={{
                  aspectRatio: '1',
                  background: `linear-gradient(135deg, ${EQUIPMENT_QUALITY_COLORS[equipment.quality]}20 0%, ${EQUIPMENT_QUALITY_COLORS[equipment.quality]}10 100%)`,
                  border: `2px solid ${EQUIPMENT_QUALITY_COLORS[equipment.quality]}`,
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '4px',
                  textAlign: 'center',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 4px 12px ${EQUIPMENT_QUALITY_COLORS[equipment.quality]}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '18px', marginBottom: '2px' }}>
                  {equipment.icon}
                </div>
                <div style={{ 
                  color: EQUIPMENT_QUALITY_COLORS[equipment.quality], 
                  fontSize: '9px',
                  fontWeight: 'bold',
                  lineHeight: '1.1'
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
                    fontSize: '8px'
                  }}>
                    ✨
                  </div>
                )}

                {/* 品质指示器 */}
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: EQUIPMENT_QUALITY_COLORS[equipment.quality]
                }}></div>
              </div>
            ))
          )}
        </div>

        {/* 操作按钮 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: '15px' 
        }}>
          <button
            onClick={handleClose}
            style={{
              background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            关闭
          </button>
        </div>

        {/* 提示文字 */}
        <div style={{
          marginTop: '10px',
          textAlign: 'center',
          color: '#999',
          fontSize: '11px'
        }}>
          点击装备 | 右键查看详情
        </div>
      </div>
    </div>
  );
}

export default EquipmentBag;