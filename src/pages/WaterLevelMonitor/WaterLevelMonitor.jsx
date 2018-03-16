import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';

import LiteTable from './components/LiteTable';
import './WaterLevelMonitor.scss';

export default class WaterLevelMonitor extends Component {
  static displayName = 'WaterLevelMonitor';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '决策管理', link: '' },
      { text: '水位监控', link: '#/strategy/waterLevelMonitor' },
    ];
    return (
      <div className="user-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <LiteTable />
      </div>
    );
  }
}
