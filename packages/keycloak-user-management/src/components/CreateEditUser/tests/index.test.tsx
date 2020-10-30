import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { history } from '@onaio/connected-reducer-registry';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store } from '@opensrp/store';
import * as opensrpStore from '@opensrp/store';
import * as fixtures from './fixtures';
import { CreateEditUser, ConnectedCreateEditUser } from '..';
import flushPromises from 'flush-promises';
import { KeycloakService } from '@opensrp/keycloak-service';
import fetch from 'jest-fetch-mock';
import { defaultInitialValues } from '../../forms/UserForm';
import toJson from 'enzyme-to-json';
import {
  reducer as keycloakUsersReducer,
  reducerName as keycloakUsersReducerName,
  fetchKeycloakUsers,
  removeKeycloakUsers,
} from '../../../ducks/user';

jest.mock('@opensrp/store', () => ({
  __esModule: true,
  ...jest.requireActual('@opensrp/store'),
}));

reducerRegistry.register(keycloakUsersReducerName, keycloakUsersReducer);

describe('components/CreateEditUser', () => {
  const props = {
    history,
    keycloakUser: fixtures.keycloakUser,
    keycloakBaseURL: 'https://keycloak-stage.smartregister.org/auth/admin/realms/opensrp-web-stage',
    serviceClass: KeycloakService,
    fetchKeycloakUsersCreator: fetchKeycloakUsers,
    accessToken: 'access token',
    location: {
      hash: '',
      pathname: '/users/edit',
      search: '',
      state: '',
    },
    match: {
      isExact: true,
      params: { userId: fixtures.keycloakUser.id },
      path: `/users/edit/:id`,
      url: `/users/edit/${fixtures.keycloakUser.id}`,
    },
  };

  beforeEach(() => {
    store.dispatch(removeKeycloakUsers());
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    act(() => {
      shallow(
        <Router history={history}>
          <CreateEditUser {...props} />
        </Router>
      );
    });
  });

  it('renders correctly', () => {
    store.dispatch(fetchKeycloakUsers([fixtures.keycloakUser]));

    const wrapper = mount(
      <Router history={history}>
        <CreateEditUser {...props} />
      </Router>
    );

    const row = wrapper.find('Row').at(0);

    expect(row.props()).toMatchSnapshot();

    wrapper.unmount();
  });

  it('renders correctly for create user', () => {
    const propsCreate = {
      history,
      keycloakUser: null,
      keycloakBaseURL:
        'https://keycloak-stage.smartregister.org/auth/admin/realms/opensrp-web-stage',
      serviceClass: KeycloakService,
      fetchKeycloakUsersCreator: fetchKeycloakUsers,
      accessToken: 'access token',
      location: {
        hash: '',
        pathname: '/users/new',
        search: '',
        state: '',
      },
      match: {
        isExact: true,
        params: { userId: null },
        path: `/users/new/`,
        url: `/users/new/`,
      },
    };

    const wrapper = mount(
      <Router history={history}>
        <CreateEditUser {...propsCreate} />
      </Router>
    );

    const row = wrapper.find('Row').at(0);

    expect(row.find('UserForm').prop('initialValues')).toEqual(defaultInitialValues);

    wrapper.unmount();
  });

  it('fetches user if page is refreshed', async () => {
    fetch.once(JSON.stringify(fixtures.keycloakUser));

    jest.spyOn(opensrpStore, 'makeAPIStateSelector').mockReturnValue('bamboocha');

    const propsPageRefreshed = {
      ...props,
      keycloakUser: null,
    };

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedCreateEditUser {...propsPageRefreshed} />
        </Router>
      </Provider>
    );

    // Loader should be displayed
    expect(toJson(wrapper.find('div.lds-ripple'))).toBeTruthy();

    await act(async () => {
      await flushPromises();
      wrapper.update();
    });

    expect(fetch.mock.calls[1]).toEqual([
      `https://keycloak-stage.smartregister.org/auth/admin/realms/opensrp-web-stage/users/${fixtures.keycloakUser.id}`,
      {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer bamboocha',
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'GET',
      },
    ]);

    wrapper.unmount();
  });

  it('works correctly with the store', async () => {
    store.dispatch(fetchKeycloakUsers([fixtures.keycloakUser]));
    const getAccessTokenMock = jest
      .spyOn(opensrpStore, 'makeAPIStateSelector')
      .mockReturnValue('bamboocha');

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedCreateEditUser {...props} />
        </Router>
      </Provider>
    );

    await act(async () => {
      await flushPromises();
      wrapper.update();
    });

    expect(wrapper.find('CreateEditUser').prop('keycloakUser')).toEqual(fixtures.keycloakUser);
    expect(wrapper.find('CreateEditUser').prop('accessToken')).toEqual('bamboocha');
    expect(getAccessTokenMock).toHaveBeenCalledWith(store.getState());
  });
});
