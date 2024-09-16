import React from 'react';

import {IMember} from '@/interfaces/member';
import {INode} from '@/interfaces/node';
import {View} from '@tarojs/components';
import Thread from './thread';
import Loading from './loading';

export type ThreadType = {
  title: string;
  member: IMember;
  node: INode;
  last_modified: number;
  id: number;
  replies: number;
  key?: number;
};

type Props = {
  threads: ThreadType[];
  loading: boolean;
};

export default function ThreadList({loading, threads}: Props) {
  if (loading) {
    return <Loading />;
  }

  const element = threads?.map((thread, index) => {
    return (
      <Thread
        key={thread.id}
        node={thread.node}
        title={thread.title}
        last_modified={thread.last_modified}
        replies={thread.replies}
        tid={thread.id}
        member={thread.member}
      />
    );
  });
  return <View>{element}</View>;
}
