import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './LatestNews.scss';
import { Pagination,Feedback } from '@icedesign/base';
import axios from 'axios';
import Ellipsis from '@icedesign/ellipsis';

export default class LatestNews extends Component {
  static displayName = 'LatestNews';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      current:1,
      total:0,
    };
  }

  componentDidMount() {
    this.fetchData(1);
  }

  fetchData = (page)=>{
    axios('/admin/tradeHistoryItems?pageSize=10&page='+page).then((response) => {
    // axios('./mock/latest-news.json?page='+page).then((response) => {
      const { data } = response;
      if(data && data.status == 'SUCCESS'){
        this.setState({
          dataSource: data.data.list,
          total:data.data.totalSize,
          current:page
        });
      }else{
        Feedback.toast.error("数据获取失败!");
      }
    })
    .catch(function (error) {
      Feedback.toast.error("数据获取失败!");
    });
  }

  handleChange = (page)=>{
    this.fetchData(page);
  }

  render() {
    return (
      <div>
      <div className="latest-news" style={styles.container}>
        {this.state.dataSource.map((dataSet,index)=>{
          return (
              <IceContainer style={styles.cardContainer} key={index}>
              <h3 style={styles.cardTitle}>
                {dataSet.name}
                <a className="link" href="#" style={styles.more}>
                  更多
                </a>
              </h3>
              <div style={styles.items}>
                {dataSet.list.map((item, itemIndex) => {
                  return (
                    <a className="link" key={itemIndex}  style={styles.item}>
                      <div style={styles.itemTitle}>
                        <span style={styles.BLACK}>{item.symbol}</span>
                        <span style={styles.RED}>{item.price}</span>
                        <span style={styles.GREEN}>x {item.amount}</span>
                        <span style={styles.BLACK}>- {item.fieldFees}</span>
                        <span style={styles.BLUE}> = {item.total}</span>
                      </div>
                      <div style={styles.itemTime}>{item.finishedAt}</div>
                    </a>
                  );
                })}
              </div>
            </IceContainer>
            )
        })}
      </div>
      <IceContainer>
        <Pagination current={this.state.current} onChange={this.handleChange} total={this.state.total}/>
      </IceContainer>
      
      </div>
    );
  }
}

const styles = {
  RED:{
    color:'red',
    width:'75px',
    display:'block',
    float:'left'
  },
  GREEN:{
    color:'green',
    width:'75px',
    display:'block',
    float:'left'
  },
  BLACK:{
    color:'black',
    width:'75px',
    display:'block',
    float:'left'
  },
  BLUE:{
    color:'blue',
    width:'75px',
    display:'block',
    float:'left'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '49.5%',
    height: 300,
  },

  cardTitle: {
    position: 'relative',
    margin: '0 0 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  more: {
    position: 'absolute',
    right: 0,
    fontSize: '12px',
    color: '#666',
  },
  item: {
    position: 'relative',
    display: 'block',
  },
  itemTime: {
    position: 'absolute',
    right: 0,
    top: 6,
    fontSize: '12px',
  },
  itemTitle: {
    height: '34px',
    lineHeight: '34px',
    fontSize: '13px',
  },
  itemComment: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  commentTitle: {
    height: '28px',
    lineHeight: '28px',
    fontSize: '13px',
  },
  commentTime: {
    fontSize: '12px',
  },
  commentNum: {
    position: 'absolute',
    right: 0,
    top: 6,
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    fontSize: '12px',
    textAlign: 'center',
    borderRadius: '50px',
    background: '#FF2851',
    color: '#fff',
  },
};
