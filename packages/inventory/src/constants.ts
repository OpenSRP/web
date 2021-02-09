// opensrp api strings
export const OPENSRP_API_BASE_URL = 'https://mg-eusm-staging.smartregister.org/opensrp/rest/';
export const OPENSRP_UPLOAD_STOCK_ENDPOINT = 'stockresource/inventory/validate';
export const OPENSRP_IMPORT_STOCK_ENDPOINT = 'stockresource/import/inventory';
export const LOCATIONS_GET_ALL_SYNC_ENDPOINT = 'location/getAll';
export const OPENSRP_ENDPOINT_SETTINGS = 'v2/settings';
export const OPENSRP_ENDPOINT_STOCK_RESOURCE = 'stockresource/';

// router routes
export const INVENTORY_SERVICE_POINT_LIST_VIEW = '/inventory/list';
export const INVENTORY_SERVICE_POINT_PROFILE_VIEW = '/inventory/profile';
export const INVENTORY_BULK_UPLOAD_URL = '/inventory/upload';

// other constants
/** namespace for the keys attached to the columns */
export const TableColumnsNamespace = 'inventory';
export const errorsTableColumnsNameSpace = 'inventoryBulkUploadError';

// magic figures
export const SEARCH_QUERY_PARAM = 'querySearch';
export const BULK_UPLOAD_PARAM = 'bulkStep';
export const TABLE_PAGE_SIZE = 5;
export const TABLE_PAGE_SIZE_OPTIONS = ['5', '10', '20', '50', '100'];
export const tablePaginationOptions = {
  showQuickJumper: true,
  showSizeChanger: true,
  defaultPageSize: TABLE_PAGE_SIZE,
  pageSizeOptions: TABLE_PAGE_SIZE_OPTIONS,
};
export const CSV_FILE_TYPE = '.csv';

// Route params
export const ROUTE_PARAM_SERVICE_POINT_ID = 'servicePointId';
