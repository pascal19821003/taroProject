import React from 'react';

import {IMember} from '@/interfaces/member';
import {INode} from '@/interfaces/node';
import {View, Text, Image} from '@tarojs/components';
import {Thread_DETAIL_NAVIGATE, timeagoInst} from '@/utils';

import './thread.css';
import {eventCenter} from '@tarojs/taro';
import Taro from '@tarojs/taro';

export type ThreadProps = {
  title: string;
  member: IMember;
  node: INode;
  last_modified: number;
  tid: number;
  replies: number;
  key?: number;
  not_navi?: boolean; // 不导航到 detail
};

export default function Thread(props: ThreadProps) {
  const {title, member, last_modified, replies, node, not_navi, tid} = props;
  const time = timeagoInst.format(last_modified * 1000, 'zh');
  const usernameCls = `author ${not_navi ? 'bold' : ''}`;

  //'pages/thread_detail/thread_detail'

  const handleNavigate = () => {
    if (not_navi) {
      return;
    }
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, {...props});
    // console.log("props", props)
    Taro.navigateTo({url: '/pages/thread_detail/thread_detail'});
  };

  return (
    <View className="thread" onClick={handleNavigate}>
      <View className="info">
        <View>
          <Image src={member.avatar_large} className="avatar" />
        </View>
        <View className="middle">
          <View className={usernameCls}>{member.username}</View>
          <View className="replies">
            <Text className="mr10">{time}</Text>
            <Text>评论 {replies}</Text>
          </View>
        </View>
        <View className="node">
          <Text className="tag">{node.title}</Text>
        </View>
      </View>
      <Text>{title}</Text>
    </View>
  );
}
