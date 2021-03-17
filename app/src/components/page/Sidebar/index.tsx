// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dictionary } from '@onaio/utils';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { URL_HOME } from '../../../constants';

import { Route, getRoutes } from '../../../routes';
import { getActiveKey } from './utils';
import { MAIN_LOGO_SRC } from '../../../configs/env';
import './Sidebar.css';

/** interface for SidebarProps */
export interface SidebarProps extends RouteComponentProps {
  authenticated: boolean;
  extraData: { [key: string]: Dictionary };
}

/** default props for Sidebar */
const defaultSidebarProps: Partial<SidebarProps> = {
  authenticated: false,
};

/** The Sidebar component */
export const SidebarComponent: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { extraData } = props;
  const { roles } = extraData;
  let location = useLocation();
  let loc = location.pathname.split('/');
  const [openKeys, setOpenKeys] = React.useState<React.Key[]>([]);

  const routes = getRoutes(roles as string[]);

  const mapChildren = React.useCallback((route: Route) => {
    if (route.children) {
      return (
        <Menu.SubMenu key={route.key} icon={route.otherProps?.icon} title={route.title}>
          {route.children.map(mapChildren)}
        </Menu.SubMenu>
      );
    } else if (route.url) {
      return (
        <Menu.Item key={route.key}>
          <Link className="admin-link" to={route.url}>
            {route.title}
          </Link>
        </Menu.Item>
      );
    } else {
      return <Menu.Item key={route.key}>{route.title}</Menu.Item>;
    }
  }, []);

  const sidebaritems: JSX.Element[] = React.useMemo(() => {
    return routes.filter((route) => route.enabled).map(mapChildren);
  }, [mapChildren, routes]);

  const activeLocationPaths = loc.filter((locString: string) => locString.length);
  const activeKey = getActiveKey(loc, routes);

  return (
    <Layout.Sider width="275px" className="layout-sider">
      <div className="logo">
        <Link to={URL_HOME}>
          <img src={MAIN_LOGO_SRC} className="img-fluid" alt="" />
        </Link>
      </div>

      <Menu
        key="main-menu"
        theme="dark"
        selectedKeys={[activeKey ?? '']}
        openKeys={openKeys.length ? (openKeys as string[]) : activeLocationPaths}
        defaultOpenKeys={activeLocationPaths}
        defaultSelectedKeys={[activeKey ?? '']}
        onOpenChange={(keys) => setOpenKeys(keys)}
        mode="inline"
        className="menu-dark"
      >
        {sidebaritems}
      </Menu>
    </Layout.Sider>
  );
};

SidebarComponent.defaultProps = defaultSidebarProps;

const Sidebar = withRouter(SidebarComponent);

export default Sidebar;
