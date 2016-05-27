import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import ToastrBox from './ToastrBox';
import * as tActions from './actions';
import {EE} from './toastrEmitter';
import config from './config';

@connect(state => ({
  toastr: state.toastr ? state.toastr : state.get('toastr')
}), tActions)
export default class ReduxToastr extends Component {
  static displayName = 'ReduxToastr';

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: null
  };

  constructor(props) {
    super(props);
    config.timeOut = this.props.timeOut;
    config.newestOnTop = this.props.newestOnTop;
  }

  componentDidMount() {
    const {addToastrAction, clean} = this.props;
    EE.on('add/toastr', addToastrAction);
    EE.on('clean/toastr', clean);
  }

  componentWillUnmount() {
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
  }

  render() {
    return (
      <div className={cn('redux-toastr', this.props.position)}>
        {this.props.toastr &&
            this.props.toastr.toastrs.map(item => <ToastrBox key={item.id} item={item}  {...this.props}/>)
        }
      </div>
    );
  }
}
