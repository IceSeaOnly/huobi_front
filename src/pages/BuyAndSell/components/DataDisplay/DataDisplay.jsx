import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import { Pagination,Feedback } from '@icedesign/base';

export default class DataDisplay extends Component {
  static displayName = 'DataDisplay';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }

  componentDidMount(){
    axios('/admin/tradeHistoryDisplay').then((response) => {
    // axios('./mock/data-display.json').then((response) => {
      const { data } = response;
      if(data && data.status == 'SUCCESS'){
        this.setState({
          data: data.data,
        });
      }else{
        Feedback.toast.error("数据获取失败!");
      }
    })
    .catch(function (error) {
      Feedback.toast.error("数据获取失败!");
    });
  }

  render() {
    return (
      <div className="data-display">
        <IceContainer>
          <div style={styles.items}>
            {this.state.data.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <span style={styles.count}>{item.count}</span>/
                  <span style={styles.expect}>{item.expect}</span>                  
                  <span style={styles.splitLine} />
                  <p style={styles.title}>{item.title}</p>
                </div>
              );
            })}
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  items: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '20%',
    margin: '5px 0',
    textAlign: 'center',
  },
  count: {
    margin: '12px 0',
    fontWeight: 'bold',
    fontSize: '30px',
    color: '#15A0FF',
  }, 
  expect: {
    fontSize: '15px',
    color: '#D6D6D6',
  },
  title: {
    color: '#999',
  },
  splitLine: {
    display: 'block',
    margin: '0 auto',
    width: '24px',
    height: '1px',
    background: '#9B9B9B',
  },
};
