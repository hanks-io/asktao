import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogPanel, setActiveLogTab, clearLogs } from '../../store/uiSlice';

function LogPanel() {
  const dispatch = useDispatch();
  const { expanded, activeLogTab, systemLogs, miscLogs } = useSelector(state => state.ui.logPanel);

  const handleTogglePanel = () => {
    dispatch(toggleLogPanel());
  };

  const handleTabSwitch = (tab) => {
    dispatch(setActiveLogTab(tab));
  };

  const handleClearLogs = () => {
    dispatch(clearLogs({ logType: activeLogTab }));
  };

  const currentLogs = activeLogTab === 'system' ? systemLogs : miscLogs;

  return (
    <div className="log-panel" style={{ 
      marginTop: '15px', 
      background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', 
      border: '2px solid #D4AF37', 
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      {/* 标签切换和收起按钮 */}
      <div style={{ 
        display: 'flex', 
        background: 'rgba(0,0,0,0.3)', 
        borderBottom: '1px solid #444'
      }}>
        <button
          className={`log-tab ${activeLogTab === 'system' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('system')}
          style={{
            flex: 1,
            padding: '8px',
            background: 'none',
            border: 'none',
            color: activeLogTab === 'system' ? '#87CEEB' : '#888',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          🔔 系统
        </button>
        <button
          className={`log-tab ${activeLogTab === 'misc' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('misc')}
          style={{
            flex: 1,
            padding: '8px',
            background: 'none',
            border: 'none',
            color: activeLogTab === 'misc' ? '#FFD700' : '#888',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          📜 杂项
        </button>
        <button
          onClick={handleClearLogs}
          style={{
            padding: '8px 12px',
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          title="清空日志"
        >
          🗑️
        </button>
        <button
          onClick={handleTogglePanel}
          style={{
            padding: '8px 12px',
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          title="收起/展开日志"
        >
          📋
        </button>
      </div>
      
      {/* 记录内容 */}
      {expanded && (
        <div style={{
          height: '80px',
          overflowY: 'auto',
          padding: '8px',
          fontSize: '10px',
          color: activeLogTab === 'system' ? '#87CEEB' : '#ccc',
          lineHeight: '1.4'
        }}>
          {currentLogs.length === 0 ? (
            <div style={{ color: '#666', textAlign: 'center', paddingTop: '20px' }}>
              {activeLogTab === 'system' ? '等待系统消息...' : '等待杂项记录...'}
            </div>
          ) : (
            currentLogs.map((log) => (
              <div key={log.id} style={{ marginBottom: '4px' }}>
                <span style={{ color: '#666', fontSize: '9px' }}>[{log.timestamp}]</span> {log.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default LogPanel;