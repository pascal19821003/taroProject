import React, {useState} from 'react';
import {View, RichText, Text, Image} from '@tarojs/components';
import Thread, {ThreadProps} from '../../components/thread';
import Loading from '@/components/loading';
import {GlobalState, timeagoInst} from '@/utils';
import Taro from '@tarojs/taro';
import api from '@/utils/api';
import {IThread} from '@/interfaces/thread';
import {ThreadType} from '@/components/thread_list';

function prettyHTML(str: string) {
  const lines = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  lines.forEach(line => {
    const regex = new RegExp(`<${line}`, 'gi');

    str = str.replace(regex, `<${line} class="line"`);
  });

  return str.replace(/<img/gi, '<img class="img"');
}

export default function ThreadDetail() {
  console.log('GlobalState.thread', GlobalState.thread);
  // loading: true,
  // replies: [],
  // content: '',
  // thread: {} as IThreadProps
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [thread, setThread] = useState<ThreadProps>();

  React.useEffect(() => {
    (async () => {
      setThread(GlobalState.thread);
      const id = GlobalState.thread.tid;
      let [{data}, {data: dataArr}] = await Promise.all([
        loadReplies(id),
        loadTopics(id),
      ]);

      setReplies(data);
      let content = prettyHTML(
        dataArr.map(item => item.content_rendered).join(','),
      );
      setContent(content);
      setLoading(false)
    })();
  }, []);

  const loadReplies = async (id: number) => {
    return Taro.request<IThread[]>({
      url: api.getReplies({
        topic_id: id,
      }),
    });
    // console.log('loadReplies', res);
    // return new Promise((resolve) => {
    //     resolve(res)
    // });
  };

  const loadTopics = async (id: number) => {
    return Taro.request<IThread[]>({
      url: api.getTopics({
        id,
      }),
    });
    // console.log('loadTopics', res);
    // return new Promise((resolve) => {
    //     resolve(res)
    // });
  };

  const replieEl = replies.map((reply, index) => {
    const time = timeagoInst.format(reply.last_modified * 1000, 'zh');
    return (
      <View className="reply" key={reply.id}>
        <Image src={reply.member.avatar_large} className="avatar" />
        <View className="main">
          <View className="author">{reply.member.username}</View>
          <View className="time">{time}</View>
          {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? (
            <View className="content">{reply.content}</View>
          ) : (
            <RichText nodes={reply.content} className="content" />
          )}
          <View className="floor">{index + 1} 楼</View>
        </View>
      </View>
    );
  });

  const contentEl = loading ? (
    <Loading />
  ) : (
    <View>
      <View className="main-content">
        {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? (
          <View>{content}</View>
        ) : (
          <RichText nodes={content} />
        )}
      </View>
      <View className="replies">{replieEl}</View>
    </View>
  );

  return (
    <View className="detail">
      {thread && (
        <Thread
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.tid}
          member={thread.member}
          not_navi={true}
        />
      )}
      {contentEl}
    </View>
  );
}
