import React from 'react';
import {View, Image} from '@tarojs/components';
import './loading.css';
const imgUrl = require('../resource/spiner.gif');

export default function Loading() {
  return (
    <View className="loading">
      <Image src={imgUrl} className="img" />
    </View>
  );
}
