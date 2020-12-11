export const API_BASE_URL =
  process.env.REACT_APP_OPENSRP_API_BASE_URL ||
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  'https://opensrp-stage.smartregister.org/opensrp/rest/';

// String
export const ERROR_OCCURRED = 'An error occurred';

// url
export const URL_ADD_TEAM = 'teams/add';
export const URL_EDIT_TEAM = 'teams/edit/';

//
// Practitioner
//
export const PRACTITIONER_GET = 'practitioner/';
export const PRACTITIONER_POST = 'practitionerRole/add';
export const PRACTITIONER_DEL = 'practitionerRole/delete/';
export const PRACTITIONER_ROLE_ADD = 'practitionerRole/add';

//
// Teams
//
export const TEAM_UUID = 'team-uuid';
export const TEAMS_GET = 'organization/';
export const TEAMS_PUT = 'organization/';
export const TEAMS_POST = 'organization';
export const TEAM_PRACTITIONERS = 'organization/practitioner/';
