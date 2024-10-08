import Taro from '@tarojs/taro';
import React from 'react';
import {View, Text, Navigator} from '@tarojs/components';
import allNodes from './all_node';
import api from '../../utils/api';

import './index.css';

class Nodes extends React.Component<{}, {}> {
  config = {
    navigationBarTitleText: '节点',
  };

  render() {
    const element = allNodes.map(item => {
      const nodes = item.nodes.map(node => {
        return (
          <Navigator
            className="tag"
            url={`/pages/node_detail/index${api.queryString(node)}`}
            key={node.full_name}>
            <Text>{node.full_name}</Text>
          </Navigator>
        );
      });
      return (
        <View key={item.title} className="container">
          <View className="title">
            <Text style="margin-left: 5px">{item.title}</Text>
          </View>
          <View className="nodes">{nodes}</View>
        </View>
      );
    });
    return <View className="node-container">{element}</View>;
  }
}

export default Nodes;
