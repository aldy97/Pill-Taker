import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import InputItem from '@ant-design/react-native/lib/input-item';
import List from '@ant-design/react-native/lib/list';
import WhiteSpace from '@ant-design/react-native/lib/white-space';
import { medicineProps } from './home';

type medDetailProps = {
  medicine?: medicineProps;
  deleteMedicine: any;
  setShowAddMed: any;
};

function MedDetail({ medicine, setShowAddMed }: medDetailProps) {
  const [editable, setEditable] = useState(false);
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
          editable={editable}
          onChange={(value: string) => {
            console.log(value);
          }}
          defaultValue={medicine ? medicine.name : ''}
          placeholder={medicine ? medicine.name : 'Enter name'}
        ></InputItem>
      </List>
      <List renderHeader='Description:'>
        <InputItem
          clear
          editable={editable}
          onChange={(value: string) => {
            console.log(value);
          }}
          defaultValue={medicine ? medicine.description : ''}
          placeholder={medicine ? '' : 'Enter description'}
        ></InputItem>
      </List>
      <List renderHeader='Does per time:'>
        <TextInput
          editable={editable}
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          defaultValue={medicine ? medicine.dose_per_time.toString() : ''}
          placeholder={medicine ? '' : 'Enter does per time'}
        ></TextInput>
      </List>
      <List renderHeader='Times per day:'>
        <TextInput
          editable={editable}
          keyboardType='numeric'
          style={{ height: 40, marginLeft: 16, fontSize: 17 }}
          defaultValue={medicine ? medicine.times_per_day.toString() : ''}
          placeholder={medicine ? '' : 'Enter times per day'}
        ></TextInput>
      </List>
      <WhiteSpace size='lg' />
      {medicine ? (
        <Button
          onPress={() => {
            editable ? setShowAddMed(false) : setEditable(true);
          }}
        >
          {editable ? 'confirm' : 'Edit this medicine'}
        </Button>
      ) : (
        <View></View>
      )}
      <WhiteSpace size='lg' />
      <Button type='primary'>Add alarms</Button>
      <WhiteSpace size='lg' />
    </ScrollView>
  );
}

export default MedDetail;
