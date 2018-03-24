import React, { Component } from 'react';
import LatestNews from './components/LatestNews';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import DataDisplay from './components/DataDisplay';

export default class BuyAndSell extends Component {
  static displayName = 'BuyAndSell';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '订单管理', link: '' },
      { text: '买卖收益', link: '#/post/buyAndSell' },
    ];
    return (
      <div className="buy-and-sell-page">
      <CustomBreadcrumb dataSource={breadcrumb} />
        <DataDisplay />
        <LatestNews />
      </div>
    );
  }
}
