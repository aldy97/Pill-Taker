import * as constants from '../store/Constants';
const defaultState = {
  addModalOpen: false,
};

export default (state = defaultState, action) => {
  if (action.type === constants.TOGGLE_ADD_MODAL) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.addModalOpen = action.addModalOpen;
    return newState;
  }
  return state;
};
