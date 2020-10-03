import * as constants from './Constants';

export const handleAddBtnPress = (addModalOpen) => ({
  type: constants.TOGGLE_ADD_MODAL,
  addModalOpen,
});

export const handleShowTimePickerBtnPress = (showTimePicker) => ({
  type: constants.TOOGLE_SHOW_TIME_PICKER,
  showTimePicker,
});
