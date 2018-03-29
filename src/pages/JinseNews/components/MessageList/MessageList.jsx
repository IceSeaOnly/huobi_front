import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Pagination } from '@icedesign/base';
import axios from 'axios';


export default class MessageList extends Component {
  static displayName = 'MessageList';

  constructor(props) {
    super(props);
    this.state = {
      current:1,
      dataSource:[],
      total:1,
      pageSize:8,
    };
  }

  componentDidMount() {
    axios
      .get('/admin/jinseNews?pageSize='+this.state.pageSize+'&page='+(this.state.current-1))
      .then((response) => {
        this.setState({
          current:response.data.data.page+1,
          dataSource: response.data.data.list,
          total:response.data.data.total,
          pageSize:response.data.data.pageSize,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (page)=> {
        axios
      .get('/admin/jinseNews?pageSize='+this.state.pageSize+'&page='+(page-1))
      .then((response) => {
        this.setState({
          current:response.data.data.page+1,
          dataSource: response.data.data.list,
          total:response.data.data.total,
          pageSize:response.data.data.pageSize,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  randerStar = (num) => {
    if(num == 0) num = 1;
    var rsp = '';
    for (var i = 0; i < num; i++) {
      if(num >= 5){
        rsp += '※';
      }else{
        rsp += '△';
      }
    }
    return rsp;
  }

  renderItem = (item, idx) => {

    return (
      <div style={styles.item} key={idx}>
        <div style={styles.title}>
          {item.title} {this.randerStar(item.grade)}
          <span style={styles.datetime}>{item.createdTime}</span>
        </div>
        <div style={item.grade>=5?styles.im_message:styles.message}>{item.content}</div>
      </div>
    );
  };

  render() {
    return (
      <div className="message-list" style={styles.messageList}>
        <IceContainer>
          {this.state.dataSource.map(this.renderItem)}
          <div style={styles.paginationWarp}>
            <Pagination total={this.state.total} pageSize={this.state.pageSize} current={this.state.current} onChange={this.handleChange}/>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  item: {
    borderBottom: '1px solid #eee',
    margin: '0 0 20px',
  },
  title: {
    color: '#444',
    marginBottom: '10px',
    position: 'relative',
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    paddingTop: '10px',
    
    color: '#999',
  },
  message: {
    color: '#000000',
    marginBottom: '20px',
    
  },
  im_message: {
    color: '#FF0000',
    marginBottom: '20px',
    
  },
  paginationWarp: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageList: {},
};
