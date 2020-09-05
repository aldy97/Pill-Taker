import React from 'react';
import ItemEditor from '../itemEditor';
import { Text, View } from 'react-native';

//Second section in the footer: allows users to edit his/her perscription
function Edit() {
  return (
    <View>
      <ItemEditor></ItemEditor>
    </View>
  );
}

export default Edit;
