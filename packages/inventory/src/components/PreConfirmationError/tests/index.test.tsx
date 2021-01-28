import React from 'react';
import { PreConfirmationError } from '..';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { mount, shallow } from 'enzyme';

const history = createBrowserHistory();

describe('pre confirmation error card', () => {
  it('renders without crashing', () => {
    shallow(
      <Router history={history}>
        <PreConfirmationError />
      </Router>
    );
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <PreConfirmationError />
      </Router>
    );

    // full general snapshot
    expect(wrapper.text()).toMatchSnapshot('full general snapshot');

    // table with errors
    wrapper.find('tr').forEach((tr) => {
      expect(tr.text()).toMatchSnapshot('table row');
    });

    // we should have a retry button
    expect(wrapper.find('button').text).toMatchSnapshot();
  });
});
