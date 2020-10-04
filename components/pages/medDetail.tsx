import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import { medicineProps } from './home';

type medDetailProps = {
  medicine?: medicineProps;
};

function MedDetail({ medicine }: medDetailProps) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <List renderHeader='Name:'>
        <InputItem
          clear
          onChange={(value: string) => {
            console.log(value);
          }}
          placeholder='placeholder'
        ></InputItem>
      </List>
      <List renderHeader='Description:'>
        <InputItem
          clear
          onChange={(value: string) => {
            console.log(value);
          }}
          placeholder='placeholder'
        ></InputItem>
      </List>
      <List renderHeader='Does per time:'>
        <TextInput
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          placeholder='placeholder'
        ></TextInput>
      </List>
      <List renderHeader='Time per day:'>
        <TextInput
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          placeholder='placeholder'
        ></TextInput>
      </List>
      <WhiteSpace size='lg' />
      <Button type='primary'>Add alarms</Button>
      <WhiteSpace size='lg' />
      <Button type='warning'>Delete</Button>
    </ScrollView>
  );
}

export default MedDetail;
