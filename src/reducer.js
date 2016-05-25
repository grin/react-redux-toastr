import {createReducer, guid}  from './utils.js';
import config from './config';
import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR} from './constants';

const initialState = {
  toastrs: []
};

export default createReducer(initialState, {
  [ADD_TOASTR]: (state, payload) => {
    const newToastr = {
      id: guid(),
      type: payload.type,
      title: payload.title,
      message: payload.message,
      options: payload.options
    };

    if (!config.newestOnTop) {
      return {
        ...state,
        toastrs: [
          ...state.toastrs,
          newToastr
        ]
      };
    }
    return {
      ...state,
      toastrs: [
        newToastr,
        ...state.toastrs
      ]
    };
  },
  [REMOVE_TOASTR]: (state, payload) => {
    return {
      ...state,
      toastrs: state.toastrs.filter(toastr => toastr.id !== payload.id)
    };
  },
  [CLEAN_TOASTR]: (state) => {
    return {
      ...state,
      toastrs: []
    };
  }
});
