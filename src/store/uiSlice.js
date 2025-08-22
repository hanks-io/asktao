import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'synthesis', // 'synthesis', 'recast', 'character', 'equipment'
  modals: {
    jewelryDetail: { open: false, jewelry: null, index: null },
    equipmentDetail: { open: false, equipment: null, index: null },
    equipmentBag: { open: false, targetSlot: null },
    confirmDialog: { open: false, title: '', message: '', onConfirm: null },
    synthesisSuccess: { open: false, jewelry: null },
  },
  toast: {
    open: false,
    message: '',
    type: 'info', // 'info', 'success', 'warning', 'error'
  },
  logPanel: {
    expanded: true,
    activeLogTab: 'system', // 'system', 'misc'
    systemLogs: [],
    miscLogs: [],
  },
  mobile: {
    isMobile: false,
    orientation: 'portrait', // 'portrait', 'landscape'
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    openModal: (state, action) => {
      const { modalName, data } = action.payload;
      state.modals[modalName] = { ...state.modals[modalName], open: true, ...data };
    },
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state.modals[modalName] = { ...state.modals[modalName], open: false };
    },
    showToast: (state, action) => {
      const { message, type = 'info' } = action.payload;
      state.toast = { open: true, message, type };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
    toggleLogPanel: (state) => {
      state.logPanel.expanded = !state.logPanel.expanded;
    },
    setActiveLogTab: (state, action) => {
      state.logPanel.activeLogTab = action.payload;
    },
    addSystemLog: (state, action) => {
      const { message } = action.payload;
      state.logPanel.systemLogs.push({
        id: Date.now(),
        message,
        timestamp: new Date().toLocaleTimeString(),
      });
      // 保持最多50条记录
      if (state.logPanel.systemLogs.length > 50) {
        state.logPanel.systemLogs.shift();
      }
    },
    addMiscLog: (state, action) => {
      const { message } = action.payload;
      state.logPanel.miscLogs.push({
        id: Date.now(),
        message,
        timestamp: new Date().toLocaleTimeString(),
      });
      // 保持最多50条记录
      if (state.logPanel.miscLogs.length > 50) {
        state.logPanel.miscLogs.shift();
      }
    },
    setMobileState: (state, action) => {
      const { isMobile, orientation } = action.payload;
      state.mobile.isMobile = isMobile;
      if (orientation) state.mobile.orientation = orientation;
    },
    clearLogs: (state, action) => {
      const { logType } = action.payload;
      if (logType === 'system') {
        state.logPanel.systemLogs = [];
      } else if (logType === 'misc') {
        state.logPanel.miscLogs = [];
      } else {
        state.logPanel.systemLogs = [];
        state.logPanel.miscLogs = [];
      }
    },
  },
});

export const {
  setActiveTab,
  openModal,
  closeModal,
  showToast,
  hideToast,
  toggleLogPanel,
  setActiveLogTab,
  addSystemLog,
  addMiscLog,
  setMobileState,
  clearLogs,
} = uiSlice.actions;

export default uiSlice.reducer;