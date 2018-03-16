import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const TabPane = Tab.TabPane;

const tabs = [
  { tab: '全部', key: 'all' }
  // , { tab: '开发中', key: 'review' }
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      tabKey: 'all',
    };
    this.columns = [{
        title: '交易对',
        dataIndex: 'symbol',
        key: 'symbol',
      },
      {
        title: '浮动指数',
        dataIndex: 'floatValue',
        key: 'floatValue',
      },
      {
        title: '最大值',
        dataIndex: 'maxValue',
        key: 'maxValue',
      },
      {
        title: '最小值',
        dataIndex: 'minValue',
        key: 'minValue',
      },
      {
        title: '平均值',
        dataIndex: 'avgValue',
        key: 'avgValue',
      },
      {
        title: '建议价',
        dataIndex: 'sugPrice',
        key: 'sugPrice',
      },
      {
        title: '当前价',
        dataIndex: 'curPrice',
        key: 'curPrice',
      },
      {
        title: '差价',
        dataIndex: 'diffPrice',
        key: 'diffPrice',
      },
      {
        title: '估益',
        dataIndex: 'estimatedIncome',
        key: 'estimatedIncome',
      }
    ];

    this.timer = setInterval(
      () => {
        axios
          .get('/admin/floatTop10')
          .then((response) => {
            if (null != response && response.data.result) {
              console.log(response.data.data);
              this.setState({
                dataSource: response.data.data,
              });
            } else {
              alert('系统错误,重新登录');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      30000
    );
  }

  componentDidMount() {
    axios
      .get('/admin/floatTop10')
      .then((response) => {
        if (null != response && response.data.result) {
          console.log(response.data.data);
          this.setState({
            dataSource: response.data.data,
          });
        } else {
          alert('系统错误,重新登录');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getFormValues = (dataIndex, values) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey][dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;
    dataSource[tabKey].splice(index, index + 1);
    this.setState({
      dataSource,
    });
  };

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  render() {
    const { dataSource } = this.state;
    return ( <
      div className = "tab-table" >
      <
      IceContainer >
      <
      Tab onChange = { this.handleTabChange } > {
        tabs.map((item) => {
          return ( <
            TabPane tab = { item.tab } key = { item.key } >
            <
            CustomTable dataSource = { dataSource } columns = { this.columns } hasBorder = { false }
            /> <
            /TabPane>
          );
        })
      } <
      /Tab> <
      /IceContainer> <
      /div>
    );
  }
}
