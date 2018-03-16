/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './UserForm.scss';
import axios from 'axios';

const { Row, Col } = Grid;
const Toast = Feedback.toast;
export default class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        baseCoin: '',
        quoteCoin: '',
        targetValue: '',
        notice: '17854258196',
        wxNotice: 'oz1S1v_7W7O1t-KxfdFK5Sk6eJVs',
      },
    };
  }


  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      axios({
        url: '/admin/addMonitor',
        method: 'post',
        data: values,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (response) {
          if(response.data.result){
            Toast.success('添加成功');
          }else{
            Toast.error(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });  
    });
  };

  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加水位监控</h2>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.formLabel}>
                  基础币种：
                </Col>
                <Col span="10">
                  <IceFormBinder name="baseCoin" required message="必填">
                    <Input size="large" placeholder="请输入基础币种" />
                  </IceFormBinder>
                  <IceFormError name="baseCoin" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.formLabel}>
                  计费币种：
                </Col>
                <Col span="10">
                  <IceFormBinder name="quoteCoin">
                    <Select
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: 'USDT', value: 'usdt' },
                        { label: 'BTC', value: 'btc' },
                        { label: 'ETH', value: 'eth' },
                      ]}
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.formLabel}>
                  目标值：
                </Col>
                <Col span="10">
                  <IceFormBinder name="targetValue" required message="必填">
                    <Input size="large" placeholder="请输入目标值" />
                  </IceFormBinder>
                  <IceFormError name="targetValue" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.formLabel}>
                  通知人手机号：
                </Col>
                <Col span="10">
                  <IceFormBinder name="notice" message="必填">
                    <Input size="large"  placeholder="请输入通知人手机号,英文逗号分隔"  hasClear maxLength={11} hasLimitHint/>
                  </IceFormBinder>
                  <IceFormError name="notice" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col span="3" style={styles.formLabel}>
                  通知人微信号：
                </Col>
                <Col span="10">
                  <IceFormBinder name="wxNotice" message="必填">
                    <Input size="large" placeholder="请输入通知人微信号,英文逗号分隔" hasClear/>
                  </IceFormBinder>
                  <IceFormError name="wxNotice" />
                </Col>
              </Row>

      
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
