import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

import LiteTable from './components/LiteTable';
import './WxWaterLevelMonitor.scss';

export default class WxWaterLevelMonitor extends Component {
  static displayName = 'WaterLevelMonitor';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '决策管理', link: '' },
      { text: '微信监控', link: '#/strategy/wxWaterLevelMonitor' },
    ];
    return (
      <div className="user-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <LiteTable />
      </div>
    );
  }
}
