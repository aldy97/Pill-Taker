import React from 'react';
import ItemEditor, { ItemProps } from '../itemEditor';
import medList from '../../mock/medList';
import { Text, FlatList, View } from 'react-native';

//Second section in the footer: allows users to edit his/her perscription
function Edit() {
  const renderItem = (obj: any) => {
    const item: ItemProps = obj.item;
    return <ItemEditor name={item.name} number={item.number}></ItemEditor>;
  };

  return (
    <View>
      <FlatList
        data={medList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
}

export default Edit;
