import * as constants from './Constants';

export const handleAddBtnPress = (addModalOpen) => ({
  type: constants.TOGGLE_ADD_MODAL,
  addModalOpen,
});
