import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import axios from 'axios';

const { Row, Col } = Grid;

export default class RealTimeStatistics extends Component {
  static displayName = 'RealTimeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      risedCoinCounts:'loading',
      allCoinCounts:'loading',
      avgRiseRange:'loading',
      maxRiseRange:'loading',
      accountBtcSum:'loading',
      accountRmbSum:'loading',
      evnGoodPoints:'loading',
      evnBadPoints:'loading',
    };
  }

  componentDidMount() {
    axios
      .get('/admin/readTimeStatistics')
      .then((response) => {
        this.setState({
          risedCoinCounts:response.data.data.risedCoinCounts,
          allCoinCounts:response.data.data.allCoinCounts,
          avgRiseRange:response.data.data.avgRiseRange,
          maxRiseRange:response.data.data.maxRiseRange,
          accountBtcSum:response.data.data.accountBtcSum,
          accountRmbSum:response.data.data.accountRmbSum,
          evnGoodPoints:response.data.data.evnGoodPoints,
          evnBadPoints:response.data.data.evnBadPoints,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="real-time-statistics">
        <IceContainer>
          <Row style={styles.items}>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.green }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>上涨币种</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemContent}>
                  <h2 style={styles.itemNum}>{this.state.risedCoinCounts}</h2>
                  <div style={styles.itemMeta}>
                    <p style={styles.total}>{this.state.allCoinCounts}</p>
                    <p style={styles.desc}>币种总数</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.lightBlue }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>平均幅度</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemContent}>
                  <h2 style={styles.itemNum}>{this.state.avgRiseRange}</h2>
                  <div style={styles.itemMeta}>
                    <p style={styles.total}>{this.state.maxRiseRange}</p>
                    <p style={styles.desc}>最高涨幅</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.darkBlue }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>财富一览</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemRow}>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>{this.state.accountBtcSum}</h2>
                    <p style={styles.desc}>BTC</p>
                  </div>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>{this.state.accountRmbSum}</h2>
                    <p style={styles.desc}>RMB</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col span="6" style={styles.item}>
              <div style={{ ...styles.itemBody, ...styles.navyBlue }}>
                <div style={styles.itemTitle}>
                  <p style={styles.titleText}>币圈环境</p>
                  <span style={styles.tag}>实时</span>
                </div>
                <div style={styles.itemRow}>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>{this.state.evnGoodPoints}</h2>
                    <p style={styles.desc}>利好</p>
                  </div>
                  <div style={styles.itemCol}>
                    <h2 style={styles.itemNum}>{this.state.evnBadPoints}</h2>
                    <p style={styles.desc}>利空</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  items: {
    padding: 0,
  },
  itemBody: {
    padding: '12px',
    borderRadius: '4px',
    color: '#fff',
    height: '144px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '14px',
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '20px 0',
    fontSize: '32px',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
  },
  green: {
    background: '#31B48D',
  },
  lightBlue: {
    background: '#38A1F2',
  },
  darkBlue: {
    background: '#7538C7',
  },
  navyBlue: {
    background: '#3B67A4',
  },
};
