import React, { Component } from 'react';
import MessageList from './components/MessageList';

export default class JinseNews extends Component {
  static displayName = 'JinseNews';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="jinse-news-page">
        <MessageList />
      </div>
    );
  }
}
