import {View, Text} from '@tarojs/components';
import Taro, {useLoad} from '@tarojs/taro';
import {useEffect} from 'react';
import api from '@/utils/api';
import './index.css';
import ThreadList, {ThreadType} from '@/components/thread_list';
import React from 'react';

export default function Index() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [threads, setThreads] = React.useState<ThreadType[]>([]);
  useLoad(() => {
    console.log('Page loaded.');
  });

  useEffect(() => {
    (async () => {
      try {
        // throw Error("error!!")
        const res = await Taro.request({
          url: api.getLatestTopic(),
        });
        console.log('getLatestTopic', res);
        setThreads(res.data);
        setLoading(false);
      } catch (error) {
        Taro.showToast({
          title: 'Load data met an error.',
        });
      }
    })();
  }, []);

  return (
    <View className="index">
      <ThreadList loading={loading} threads={threads} />
    </View>
  );
}
