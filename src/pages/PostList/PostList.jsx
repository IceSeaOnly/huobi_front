import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';

import './PostList.scss';

export default class PostList extends Component {
  static displayName = 'PostList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '订单管理', link: '' },
      { text: '订单列表', link: '#/post/list' },
    ];
    return (
      <div className="post-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
