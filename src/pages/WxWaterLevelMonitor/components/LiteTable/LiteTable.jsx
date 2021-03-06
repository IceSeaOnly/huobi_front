import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table,Button,Feedback} from '@icedesign/base';
import axios from 'axios';

const styles = {
  finish: {
    color: '#64D874',
  },
  waiting: {
    color: '#999999',
  },
};
const Toast = Feedback.toast;

export default class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };

    this.timer = setInterval(
      () => {
        this.componentDidMount();
      },
      10000
    );
  }


  deleteItem = (index) => {
    axios
      .get('/admin/deleteWxMonitor?id='+this.state.tableData[index]['id'])
      .then((response) => {
        if(response.data.result){
          Toast.success('添加成功');
          this.componentDidMount();
        }else{
          Toast.error(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderOperation = (value, index) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} shape="text">
        删除
      </Button>
    );
  };

  componentDidMount() {
    axios
      .get('/admin/wxMonitorList')
      .then((response) => {
        this.setState({
          tableData: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { tableData } = this.state;
    return (
      <div className="lite-table">
        <IceContainer style={styles.tableCard}>
          <Table dataSource={tableData} hasBorder={false}>
            <Table.Column title="监听币种" dataIndex="coin"/>
            <Table.Column title="当前水位" dataIndex="current"/>
            <Table.Column title="创建时间" dataIndex="createTime"/>
            <Table.Column title="通知微信" dataIndex="noticePep"/>
            <Table.Column title="操作" cell={this.renderOperation} />
          </Table>
        </IceContainer>
      </div>
    );
  }
}
