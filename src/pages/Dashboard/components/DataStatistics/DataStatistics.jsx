import React, { Component } from 'react';
import { Grid, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';
import './DataStatistics.scss';
import ReactDOM from 'react-dom';
import IceEllipsis from '@icedesign/ellipsis';
import axios from 'axios';

const { Row, Col } = Grid;


export default class DataStatistics extends Component {
  static displayName = 'DataStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
  statisticData: [],
    };
  }

  componentDidMount() {
    axios
      .get('/admin/btcDataStatistics')
      .then((response) => {
        this.setState({
          chartData:response.data.data.chartData,
          statisticData: response.data.data.statisticData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    const cols = {
      counts: { tickInterval: 20 },
    };

    return (
      <div className="data-statistics">
        <IceContainer>
          <h4 style={styles.title}>BTC价格位置分布</h4>
          <Row>
            <Col span="16">
              <Chart
                height={300}
                padding={[50, 35, 50, 35]}
                data={this.state.chartData}
                scale={cols}
                forceFit
              >
                <Axis name="price" />
                <Axis name="value" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="interval" position="price*counts" />
              </Chart>
            </Col>
            <Col span="8">
              <ul style={styles.items}>
                {this.state.statisticData.map((item, index) => {
                  return (
                    <li key={index} className="item-box" style={styles.itemBox}>
                      <div style={styles.itemIcon}>
                        <Icon
                          type="dollar"
                          style={styles.icon}
                          className="itemIcon"
                        />
                      </div>
                      <div style={styles.itemText}>
                        <div style={styles.name}>{item.name}</div>
                        <IceEllipsis showTooltip={true} lineLimit={7} text={item.value.toString()} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
  },
  title: {
    margin: '0',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  items: {
    display: 'flex',
    flexDeriction: 'row',
    flexWrap: 'wrap',
    marginLeft: '30px',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    marginTop: '50px',
  },
  itemIcon: {
    marginRight: '10px',
  },
  icon: {
    color: '#3FA1FF',
  },
  value: {
    color: '#1F82FF',
    fontSize: '20px',
  },
  name: {
    fontSize: '12px',
  },
};
