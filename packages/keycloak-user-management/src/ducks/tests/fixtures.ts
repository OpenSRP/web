/* eslint-disable no-template-curly-in-string */
import { KeycloakUser } from '../user';
import { KeycloakUserGroup } from '../userGroups';

export const keycloakUsersArray: KeycloakUser[] = [
  {
    id: '97f36061-52fb-4474-88f2-fd286311ff1d',
    createdTimestamp: 1600843525533,
    username: 'mwalimu',
    enabled: true,
    totp: false,
    emailVerified: false,
    firstName: 'Benjamin',
    lastName: 'Mwalimu',
    email: 'dubdabasoduba@gmail.com',
    disableableCredentialTypes: [],
    requiredActions: ['UPDATE_PASSWORD'],
    notBefore: 0,
    access: {
      manageGroupMembership: true,
      view: true,
      mapRoles: true,
      impersonate: false,
      manage: true,
    },
  },
  {
    id: '80385001-f385-42ec-8edf-8591dc181a54',
    createdTimestamp: 1600156374050,
    username: 'ona',
    enabled: true,
    totp: false,
    emailVerified: false,
    firstName: 'Ona',
    lastName: 'kenya',
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: 0,
    access: {
      manageGroupMembership: true,
      view: true,
      mapRoles: true,
      impersonate: false,
      manage: true,
    },
  },
  {
    id: '520b579e-70e9-4ae9-b1f8-0775c605b8d2',
    createdTimestamp: 1599565616551,
    username: 'ona-admin',
    enabled: true,
    totp: false,
    emailVerified: false,
    firstName: 'Ona',
    lastName: 'Admin',
    email: 'test@onatest.com',
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: 1600329648,
    access: {
      manageGroupMembership: true,
      view: true,
      mapRoles: true,
      impersonate: false,
      manage: true,
    },
  },
  {
    id: 'cab07278-c77b-4bc7-b154-bcbf01b7d35b',
    createdTimestamp: 1600156317992,
    username: 'opensrp',
    enabled: true,
    totp: false,
    emailVerified: false,
    firstName: 'Demo',
    lastName: 'kenya',
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: 0,
    access: {
      manageGroupMembership: true,
      view: true,
      mapRoles: true,
      impersonate: false,
      manage: true,
    },
  },
];

export const keycloakUser = {
  id: 'cab07278-c77b-4bc7-b154-bcbf01b7d35b',
  createdTimestamp: 1600156317992,
  username: 'opensrp',
  enabled: true,
  totp: false,
  emailVerified: false,
  firstName: 'Demo',
  lastName: 'kenya',
  email: 'test@onatest.com',
  disableableCredentialTypes: [],
  requiredActions: [],
  notBefore: 0,
  access: {
    manageGroupMembership: true,
    view: true,
    mapRoles: true,
    impersonate: false,
    manage: true,
  },
};

export const userGroups: KeycloakUserGroup[] = [
  { id: '283c5d6e-9b83-4954-9f3b-4c2103e4370c', name: 'Admin', path: '/Admin', subGroups: [] },
  {
    id: '4dd15e66-7132-429b-8939-d1e601611464',
    name: 'New Group',
    path: '/New Group',
    subGroups: [],
  },
  {
    id: '580c7fbf-c201-4dad-9172-1df9faf24936',
    name: 'Super User',
    path: '/Super User',
    subGroups: [],
  },
  {
    id: '2fffbc6a-528d-4cec-aa44-97ef65b9bba2',
    name: 'Test User Group',
    path: '/Test User Group',
    subGroups: [],
  },
];

export const userRoles = [
  {
    id: '6e54eff8-2a1d-4271-9e51-475cc7bf100c',
    name: 'ALL_EVENTS',
    description: 'Allows on to Download all Events',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '27239907-97ee-4ef7-a5f6-10faeb6a2f25',
    name: 'EDIT_KEYCLOAK_USERS',
    description: 'The role allows one to edit other keycloak users',
    composite: true,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '80f5812e-f653-4b8f-9de3-f25e46be7fcc',
    name: 'offline_access',
    // eslint-disable-next-line no-template-curly-in-string
    description: '${role_offline-access}',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '6a796c5f-eb44-4198-a403-dc73912d3515',
    name: 'OPENMRS',
    description: 'Basic Role for users, To be changed to User Or Provider',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: 'c51387a9-cdf6-42c9-af47-c87239fbc771',
    name: 'PLANS_FOR_USER',
    description: 'Allows on to view plans for user',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '7753e3a6-b950-43ce-b164-ebf8138b3c36',
    name: 'realm-admin',
    description: 'Realm Administrator',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: 'a8f4205b-0518-4371-8b9a-f29217dfb935',
    name: 'uma_authorization',
    // eslint-disable-next-line no-template-curly-in-string
    description: '${role_uma_authorization}',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '2492045d-69c7-4aee-8172-15151ca5902d',
    name: 'VIEW_KEYCLOAK_USERS',
    description: 'Role allows one to view keycloak users',
    composite: true,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
];

export const unsortedUserGroups: KeycloakUserGroup[] = [
  {
    id: '4dd15e66-7132-429b-8939-d1e601611464',
    name: 'New Group',
    path: '/New Group',
    subGroups: [],
  },
  { id: '283c5d6e-9b83-4954-9f3b-4c2103e4370c', name: 'Admin', path: '/Admin', subGroups: [] },
  {
    id: '2fffbc6a-528d-4cec-aa44-97ef65b9bba2',
    name: 'Test User Group',
    path: '/Test User Group',
    subGroups: [],
  },
  {
    id: '580c7fbf-c201-4dad-9172-1df9faf24936',
    name: 'Super User',
    path: '/Super User',
    subGroups: [],
  },
  {
    id: '580c7fbf-c201-4dad-9172-1df9faf24936',
    name: 'Super User',
    path: '/Super User',
    subGroups: [],
  },
];

export const availableRoles = [
  {
    id: '27239907-97ee-4ef7-a5f6-10faeb6a2f25',
    name: 'EDIT_KEYCLOAK_USERS',
    description: 'The role allows one to edit other keycloak users',
    composite: true,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '2492045d-69c7-4aee-8172-15151ca5902d',
    name: 'VIEW_KEYCLOAK_USERS',
    description: 'Role allows one to view keycloak users',
    composite: true,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
];

export const assignedRoles = [
  {
    id: '6a796c5f-eb44-4198-a403-dc73912d3515',
    name: 'OPENMRS',
    description: 'Basic Role for users, To be changed to User Or Provider',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '6e54eff8-2a1d-4271-9e51-475cc7bf100c',
    name: 'ALL_EVENTS',
    description: 'Allows on to Download all Events',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: 'c51387a9-cdf6-42c9-af47-c87239fbc771',
    name: 'PLANS_FOR_USER',
    description: 'Allows on to view plans for user',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '7753e3a6-b950-43ce-b164-ebf8138b3c36',
    name: 'realm-admin',
    description: 'Realm Administrator',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '80f5812e-f653-4b8f-9de3-f25e46be7fcc',
    name: 'offline_access',
    description: '${role_offline-access}',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: 'a8f4205b-0518-4371-8b9a-f29217dfb935',
    name: 'uma_authorization',
    description: '${role_uma_authorization}',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
];

export const effectiveRoles = [
  {
    id: '6a796c5f-eb44-4198-a403-dc73912d3515',
    name: 'OPENMRS',
    description: 'Basic Role for users, To be changed to User Or Provider',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '6e54eff8-2a1d-4271-9e51-475cc7bf100c',
    name: 'ALL_EVENTS',
    description: 'Allows on to Download all Events',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: 'c51387a9-cdf6-42c9-af47-c87239fbc771',
    name: 'PLANS_FOR_USER',
    description: 'Allows on to view plans for user',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '7753e3a6-b950-43ce-b164-ebf8138b3c36',
    name: 'realm-admin',
    description: 'Realm Administrator',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: '80f5812e-f653-4b8f-9de3-f25e46be7fcc',
    name: 'offline_access',
    description: '${role_offline-access}',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
  {
    id: 'a8f4205b-0518-4371-8b9a-f29217dfb935',
    name: 'uma_authorization',
    description: '${role_uma_authorization}',
    composite: false,
    clientRole: false,
    containerId: 'opensrp-web-stage',
  },
];
