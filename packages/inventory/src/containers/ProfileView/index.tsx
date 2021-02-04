import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Table } from 'antd';
import { OpenSRPService } from '@opensrp/react-utils';
import {
  TreeNode,
  hierarchyReducer,
  hierarchyReducerName,
  locationUnitsReducer,
  fetchLocationUnits,
  locationUnitsReducerName,
  getLocationsByNameAndId,
  getLocationUnitById,
  LocationUnit,
  loadJurisdictions,
  getLocationsBySearch,
  getTreesByIds,
} from '@opensrp/location-management';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType } from 'antd/lib/table/interface';
import { columns } from './utils';
import { sendErrorNotification } from '@opensrp/notifications';
import { Spin } from 'antd';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { BrokenPage, useHandleBrokenPage } from '@opensrp/react-utils';
import { Helmet } from 'react-helmet';
import {
  GET_INVENTORY_BY_SERVICE_POINT,
  INVENTORY_SERVICE_POINT_LIST_VIEW,
  REGION,
  DISTRICT,
  COMMUNE,
  LOCATIONS_GET_ALL_SYNC_ENDPOINT,
} from '../../constants';
import { CommonProps, defaultCommonProps } from '../../helpers/common';
import {
  ADD_NEW_INVENTORY_ITEM,
  SERVICE_POINT_INVENTORY,
  EDIT_SERVICE_POINT,
  INVENTORY_ITEMS,
  ERROR_OCCURRED,
  REGION_LABEL,
  DISTRICT_LABEL,
  TYPE_LABEL,
  LAT_LONG_LABEL,
  COMMUNE_LABEL,
  SERVICE_POINT_ID_LABEL,
  BACK_TO_SERVICE_POINT_LIST,
} from '../../lang';
import { TableData } from './utils';
import '../../index.css';
import {
  fetchInventories,
  getInventoriesArray,
  inventoryReducer,
  inventoryReducerName,
} from '../../ducks/inventory';
import { inventory1, inventory2 } from '../../constants';
import { getNodePath } from './utils';
/** make sure locations and hierarchy reducer is registered */
reducerRegistry.register(hierarchyReducerName, hierarchyReducer);
reducerRegistry.register(locationUnitsReducerName, locationUnitsReducer);
reducerRegistry.register(inventoryReducerName, inventoryReducer);

const locationsBySearchSelector = getLocationsByNameAndId();
const structuresSelector = getLocationsBySearch();
const treesSelector = getTreesByIds();

/** props for the ServicePointProfile view */
interface ServicePointsListProps extends CommonProps {
  LocationsByGeoLevel: TreeNode[];
  columns: ColumnsType<TableData>;
  fetchInventories: typeof fetchInventories;
  geoLevel: number;
  service: typeof OpenSRPService;
}

export interface Props {
  opensrpBaseURL: string;
}

const defaultProps = {
  ...defaultCommonProps,
  LocationsByGeoLevel: [],
  columns: columns,
  fetchInventories,
  geoLevel: 0,
  opensrpBaseURL: '',
  service: OpenSRPService,
};

type ServicePointsListTypes = ServicePointsListProps & RouteComponentProps & Props;

export interface GeographicLocationInterface {
  geographicLevel?: number;
  label?: number;
}

export const findPath = (nodePath: any[], geoLevel: number) => {
  return nodePath.find((x: GeographicLocationInterface) => x.geographicLevel === geoLevel);
};

interface DefaultGeographyItemProp {
  label: string;
  value?: string | number | string[] | number[];
}

/** component that renders Geography Items
 *
 * @param props - the component props
 */
export const GeographyItem = (props: DefaultGeographyItemProp) => {
  const { label, value } = props;
  return (
    <Col md={24} className="geography-item">
      <p className="item">
        {label}: {value}
      </p>
    </Col>
  );
};

/** component that renders service point list
 *
 * @param props - the component props
 */
const ServicePointProfile = (props: ServicePointsListTypes) => {
  const { columns, opensrpBaseURL, geoLevel, service } = props;
  const { broken, errorMessage, handleBrokenPage } = useHandleBrokenPage();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const loc = location.pathname.split('/');
  const spId = loc.pop() as string;

  const inventoriesArray = useSelector((state) => getInventoriesArray(state));
  const locationUnitById = useSelector((state) => getLocationUnitById(state, spId));
  const [locationNodeById] = useSelector((state) =>
    locationsBySearchSelector(state, { searchQuery: spId, geoLevel })
  );
  const [structure] = useSelector((state) =>
    structuresSelector(state, { searchQuery: spId, isJurisdiction: false })
  );
  const trees = useSelector((state) => treesSelector(state, {}));

  useEffect(() => {
    // get structures, this is the most important call for this page
    const params = {
      serverVersion: 0,
      // eslint-disable-next-line @typescript-eslint/camelcase
      is_jurisdiction: false,
    };
    const structuresDispatcher = (locations: LocationUnit[] = []) => {
      return fetchLocationUnits(locations, false);
    };
    loadJurisdictions(
      structuresDispatcher,
      opensrpBaseURL,
      params,
      {},
      service,
      LOCATIONS_GET_ALL_SYNC_ENDPOINT
    ).catch((err: Error) => handleBrokenPage(err));
    // get root Jurisdictions so we can later get the trees.
    const jurisdictionsDispatcher = (locations: LocationUnit[] = []) => {
      return dispatch(fetchLocationUnits(locations, true));
    };
    loadJurisdictions(
      jurisdictionsDispatcher,
      opensrpBaseURL,
      undefined,
      undefined,
      service
    ).catch((err: Error) => sendErrorNotification(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const serve = new OpenSRPService(`${GET_INVENTORY_BY_SERVICE_POINT}/${spId}`, opensrpBaseURL);
    serve
      .list()
      .then(() => {
        dispatch(fetchInventories([inventory1, inventory2]));
        setIsLoading(false);
      })
      .catch(() => sendErrorNotification(ERROR_OCCURRED));
  }, [dispatch, location.pathname, locationUnitById, opensrpBaseURL, spId, locationNodeById]);

  if (isLoading) return <Spin size="large" />;

  if (broken) {
    return <BrokenPage errorMessage={errorMessage} />;
  }

  const pageTitle = `${SERVICE_POINT_INVENTORY}`;
  const nodePath = getNodePath(structure, trees);

  return (
    <>
      <div className="inventory-profile-header">
        <Row>
          <Col md={16}>
            <Link to={INVENTORY_SERVICE_POINT_LIST_VIEW}>
              <p className="go-back-text">{BACK_TO_SERVICE_POINT_LIST}</p>
            </Link>
            <p className="title">{structure.properties.name}</p>
            <Row>
              <Col md={12}>
                <GeographyItem label={REGION_LABEL} value={findPath(nodePath, REGION)?.label} />
                <GeographyItem label={DISTRICT_LABEL} value={findPath(nodePath, DISTRICT)?.label} />
                <GeographyItem label={COMMUNE_LABEL} value={findPath(nodePath, COMMUNE)?.label} />
              </Col>
              <Col md={12}>
                <GeographyItem label={TYPE_LABEL} value={structure.properties.type} />
                <GeographyItem label={LAT_LONG_LABEL} value={''} />
                <GeographyItem label={SERVICE_POINT_ID_LABEL} value={spId} />
              </Col>
            </Row>
          </Col>
          <Col md={8} className="flex-center">
            <Link to={EDIT_SERVICE_POINT}>
              <Button type="primary" size="large" disabled>
                {EDIT_SERVICE_POINT}
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="content-section">
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Row className={'list-view'}>
          <Col className={'main-content'}>
            <div className="inventory-profile">
              <h6>{INVENTORY_ITEMS}</h6>
              <Link to={ADD_NEW_INVENTORY_ITEM}>
                <Button type="primary" size="large" disabled>
                  {ADD_NEW_INVENTORY_ITEM}
                </Button>
              </Link>
            </div>
            <Table dataSource={inventoriesArray} columns={columns}></Table>
          </Col>
        </Row>
      </div>
    </>
  );
};

ServicePointProfile.defaultProps = defaultProps;

export { ServicePointProfile };
