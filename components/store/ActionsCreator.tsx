import * as constants from './Constants';
import { medicineProps } from '../pages/home';

export const handleAddBtnPress = (addModalOpen: boolean) => ({
  type: constants.TOGGLE_ADD_MODAL,
  addModalOpen,
});

export const setMedicine = (medicine: medicineProps) => ({
  type: constants.SET_MEDICINE,
  medicine,
});

export const handleShowTimePickerBtnPress = (showTimePicker: boolean) => ({
  type: constants.TOOGLE_SHOW_TIME_PICKER,
  showTimePicker,
});
