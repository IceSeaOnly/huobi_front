import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@icedesign/base';
import axios from 'axios';
import CustomTable from './components/CustomTable';
import EditDialog from './components/EditDialog';
import DeleteBalloon from './components/DeleteBalloon';

const TabPane = Tab.TabPane;

const tabs = [
  { tab: '未完成', key: 'notComplete' },
  { tab: '已完成', key: 'complete' },
  { tab: '全部', key: 'all' },
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      tabKey: 'notComplete',
    };
    this.tabKeyInfo = {

    };
    this.columns = [
      {
        title: '单号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '交易对',
        dataIndex: 'symbol',
        key: 'symbol',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '账户id',
        dataIndex: 'accountId',
        key: 'accountId',
      },
      {
        title: '交易量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '成交额',
        dataIndex: 'fieldCashAmount',
        key: 'fieldCashAmount',
      },
      {
        title: '手续费',
        dataIndex: 'fieldFees',
        key: 'fieldFees',
      },
      {
        title: '创建@',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: '撤销@',
        dataIndex: 'canceledAt',
        key: 'canceledAt',
      },
      {
        title: '成交@',
        dataIndex: 'finishedAt',
        key: 'finishedAt',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          if (this.state.tabKey == 'notComplete'){
            return (
              <span>
                <DeleteBalloon
                  handleRemove={() => this.handleRemove(value, index, record)}
                />
              </span>
            );
          }else{
            return (<span></span>);
          }
        },
      },
    ];

    this.timer = setInterval(
      () => {
        this.componentDidMount();
      },
      20000
    );
  }

  componentDidMount() {
    console.log(this.state.tabKey);
    axios
      .get('/admin/orderList?listType='+this.state.tabKey)
      .then((response) => {
        this.setState({
          dataSource: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeDataTabPage = (key)=>{
    this.setState({
      tabKey: key,
    });
    axios
      .get('/admin/orderList?listType='+key)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          dataSource: response.data.data,
          key,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  /** 撤销事件处理 */
  handleRemove = (value, index) => {
    const { dataSource, tabKey } = this.state;

    axios
      .get('/admin/cancleOrder?orderId='+dataSource[index]['id'])
      .then((response) => {
          if(response.data.result){
            dataSource[tabKey].splice(index, index + 1);
            this.setState({
              dataSource,
            });
          }else{
            alert(response.data.msg);
          }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="tab-table">
        <IceContainer>
          <Tab onChange={this.changeDataTabPage}>
            {tabs.map((item) => {
              return (
                <TabPane tab={item.tab} key={item.key}>
                  <CustomTable
                    dataSource={dataSource}
                    columns={this.columns}
                    hasBorder={false}
                  />
                </TabPane>
              );
            })}
          </Tab>
        </IceContainer>
      </div>
    );
  }
}
