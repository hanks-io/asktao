import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal, showToast } from '../../store/uiSlice';
import { equipItem, removeFromInventory } from '../../store/equipmentSlice';
import { 
  EQUIPMENT_QUALITY_COLORS, 
  EQUIPMENT_QUALITY_NAMES,
  EQUIPMENT_SLOT_NAMES,
  ELEMENT_NAMES,
  ELEMENT_COLORS 
} from '../../utils/equipmentConstants';
import { calculateEquipmentPower } from '../../utils/equipmentLogic';

function EquipmentDetailModal() {
  const dispatch = useDispatch();
  const { open, data } = useSelector(state => state.ui.modals.equipmentDetail);
  
  if (!open || !data?.equipment) return null;
  
  const equipment = data.equipment;
  const power = calculateEquipmentPower(equipment);

  const handleClose = () => {
    dispatch(closeModal({ modalName: 'equipmentDetail' }));
  };

  const handleEquip = () => {
    dispatch(equipItem({ slot: equipment.slot, equipment }));
    dispatch(showToast({ 
      message: `已装备 ${equipment.name}`, 
      type: 'success' 
    }));
    handleClose();
  };

  const handleUpgrade = () => {
    dispatch(openModal({
      modalName: 'equipmentUpgrade',
      data: { equipment }
    }));
    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这件装备吗？')) {
      dispatch(removeFromInventory({ id: equipment.id }));
      dispatch(showToast({ 
        message: `已删除 ${equipment.name}`, 
        type: 'info' 
      }));
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: 'none',
          overflow: 'visible',
          minWidth: '300px',
          maxWidth: '360px'
        }}
      >
        {/* 装备标题 */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <div style={{ 
            fontSize: '32px', 
            marginBottom: '6px'
          }}>
            {equipment.icon}
          </div>
          <div style={{ 
            color: EQUIPMENT_QUALITY_COLORS[equipment.quality], 
            fontSize: '16px', 
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {equipment.name}
          </div>
          <div style={{ 
            color: '#87CEEB', 
            fontSize: '12px',
            marginBottom: '2px'
          }}>
            Lv.{equipment.level} {EQUIPMENT_QUALITY_NAMES[equipment.quality]}{EQUIPMENT_SLOT_NAMES[equipment.slot]}
          </div>
          <div style={{ 
            color: ELEMENT_COLORS[equipment.element], 
            fontSize: '12px'
          }}>
            {ELEMENT_NAMES[equipment.element]}系 | 战斗力: {power}
          </div>
        </div>

        {/* 基础属性 */}
        <div style={{
          background: 'rgba(212, 175, 55, 0.1)',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '12px',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          <div style={{ 
            color: '#FFD700', 
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '6px'
          }}>
            基础属性
          </div>
          <div style={{ 
            color: '#87CEEB', 
            fontSize: '12px',
            marginBottom: '3px'
          }}>
            {equipment.baseStats.primary.name}: +{equipment.baseStats.primary.value}
          </div>
          <div style={{ 
            color: '#87CEEB', 
            fontSize: '12px'
          }}>
            {equipment.baseStats.secondary.name}: +{equipment.baseStats.secondary.value}
          </div>
        </div>

        {/* 附加属性 */}
        {equipment.additionalStats && equipment.additionalStats.length > 0 && (
          <div style={{
            background: 'rgba(144, 238, 144, 0.1)',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '12px',
            border: '1px solid rgba(144, 238, 144, 0.3)'
          }}>
            <div style={{ 
              color: '#90EE90', 
              fontSize: '13px',
              fontWeight: 'bold',
              marginBottom: '6px'
            }}>
              附加属性
            </div>
            {equipment.additionalStats.map((stat, idx) => {
              const color = stat.quality === 'special' ? '#FFD700' : '#90EE90';
              return (
                <div key={idx} style={{ 
                  color, 
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '2px'
                }}>
                  {stat.quality === 'special' && '✨ '}{stat.name}: +{stat.value}
                </div>
              );
            })}
          </div>
        )}

        {/* 升级信息 */}
        {equipment.quality !== 'green' && (
          <div style={{
            background: 'rgba(255, 215, 0, 0.1)',
            padding: '8px',
            borderRadius: '6px',
            marginBottom: '15px',
            border: '1px solid rgba(255, 215, 0, 0.3)'
          }}>
            <div style={{ 
              color: '#FFD700', 
              fontSize: '11px',
              textAlign: 'center'
            }}>
              {equipment.quality === 'white' && '白色→蓝色: 需要黑水 (100%成功)'}
              {equipment.quality === 'blue' && '蓝色→粉色: 需要粉水晶+金色材料 (60%成功)'}
              {equipment.quality === 'pink' && '粉色→黄金: 需要黄水晶 (50%成功)'}
              {equipment.quality === 'gold' && '黄金→绿色: 需要绿水晶+金色材料 (30%成功)'}
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
          <button
            onClick={handleEquip}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
              color: '#000',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            装备
          </button>

          {equipment.quality !== 'green' && (
            <button
              onClick={handleUpgrade}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #28a745 0%, #155724 100%)',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              升级
            </button>
          )}

          <button
            onClick={handleDelete}
            style={{
              flex: 0.7,
              background: 'linear-gradient(135deg, #dc3545 0%, #721c24 100%)',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            删除
          </button>
        </div>

        {/* 关闭按钮 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          marginTop: '10px' 
        }}>
          <button
            onClick={handleClose}
            style={{
              background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
              color: '#fff',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentDetailModal;