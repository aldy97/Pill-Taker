import * as constants from './Constants';

const defaultState = {
  addModalOpen: false,
  showTimePicker: false,
  medicine: {},
};

export default (state = defaultState, action) => {
  if (action.type === constants.TOGGLE_ADD_MODAL) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.addModalOpen = action.addModalOpen;
    return newState;
  }

  if (action.type === constants.SET_MEDICINE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.medicine = action.medicine;
    return newState;
  }

  if (action.type === constants.TOOGLE_SHOW_TIME_PICKER) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.showTimePicker = action.showTimePicker;
    return newState;
  }
  return state;
};
