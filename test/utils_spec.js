import {mapToToastrMessage} from '../src/utils';
import { expect } from 'chai';

describe('mapToToastrMessage', () => {
  const msgType = 'info';
  const type = {type: 'info'};

  it('handles a title and a message', () => {
    const toastr = mapToToastrMessage(msgType, ['Title', 'Message']);
    expect(toastr).to.deep.equal({
      ...type,
      title: 'Title',
      message: 'Message',
      options: {}
    });
  });

  it('handles only a title', () => {
    const toastr = mapToToastrMessage(msgType, ['Title']);
    expect(toastr).to.deep.equal({
      ...type,
      title: 'Title',
      options: {}
    });
  });

  it('handles no arguments', () => {
    expect(mapToToastrMessage(msgType, [])).to.deep.equal({
      ...type,
      options: {}
    });
  });

  it('handles null arguments', () => {
    expect(mapToToastrMessage(msgType, [null, null])).to.deep.equal({
      ...type,
      options: {}
    });
    expect(mapToToastrMessage(msgType, [null])).to.deep.equal({
      ...type,
      options: {}
    });
  });

  it('handles undefined arguments', () => {
    expect(mapToToastrMessage(msgType, [undefined, undefined])).to.deep.equal({
      ...type,
      options: {}
    });
    expect(mapToToastrMessage(msgType, [undefined])).to.deep.equal({
      ...type,
      options: {}
    });
  });

  it('handles a title, a message and an options object', () => {
    const toastr = mapToToastrMessage(msgType, ['Title', 'Message', {component: 'MyComponent'}]);
    expect(toastr).to.deep.equal({
      ...type,
      title: 'Title',
      message: 'Message',
      options: {component: 'MyComponent'}
    });
  });

  it('handles a title and an options object', () => {
    const toastr = mapToToastrMessage(msgType, ['Title', {component: 'MyComponent'}]);
    expect(toastr).to.deep.equal({
      ...type,
      title: 'Title',
      options: {component: 'MyComponent'}
    });
  });

  it('handles an options object as only argument', () => {
    const toastr = mapToToastrMessage(msgType, [{component: 'MyComponent'}]);
    expect(toastr).to.deep.equal({
      ...type,
      options: {component: 'MyComponent'}
    });
  });

});
