'use strict';

import './index.less';
import './../src/less/index.less';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr, {toastr} from './../src/';
import DevTools from './containers/DevTools';
import config from './../config';

import loremIpsum from 'lorem-ipsum';

class InfoComp extends Component {
  static displayName = 'InfoComp';
  render() {
    const {title} = this.props.options.props;
    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}

class ErrorComp extends Component {
  static displayName = 'ErrorComp';
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.message}</h2>
      </div>
    );
  }
}

export default class App extends Component {
  static displayName = 'ReduxModalDev';

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.renderDev = this.renderDev.bind(this);
  }

  renderDev() {
    if (config.env !== 'production') {
      return <DevTools />;
    }
  }

  renderComp(title) {
    class myComp extends Component {
      static displayName = 'component';

      render() {
        return <div>{title}</div>;
      }
    }
    return myComp;
  }

  add() {
    toastr.success('Success title', loremIpsum());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="wrapper">
          <ReduxToastr position="top-fw"/>
          <div className="content">
            <button type="button" className="btn btn-success" onClick={this.add.bind(this)}>Success</button>
            <button type="button" className="btn btn-primary"
                    onClick={() => toastr.info(null, null, {component: InfoComp, props: {title: 'Look here!'}})}>
              Info
            </button>
            <button type="button" className="btn btn-danger"
                    onClick={() => toastr.error(
                    'Error title',
                    'Error message',
                    {timeOut: 4000, component: ErrorComp}
                    )}>
              Error
            </button>
            <button type="button" className="btn btn-warning"
                    onClick={() => toastr.warning('Warning title', loremIpsum())}>Warning
            </button>
            <button type="button" className="btn btn-default"
                    onClick={() => toastr.message('Message title', {component: this.renderComp('God dag')})}>Message
            </button>
          </div>
          {this.renderDev()}
        </div>
      </Provider>
    );
  }
}
