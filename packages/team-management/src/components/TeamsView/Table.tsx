import React from 'react';
import { Button, Divider, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Organization } from '../../ducks/organizations';
import { Link } from 'react-router-dom';
import { URL_EDIT_TEAM } from '../../constants';
import { Practitioner } from '../../ducks/practitioners';
import { Column, TableLayout } from '@opensrp/react-utils';
import lang from '../../lang';

export interface TableData extends Organization {
  key: string;
}

export interface Props {
  data: TableData[];
  opensrpBaseURL: string;
  setDetail: (isLoading: string | Organization) => void;
  setPractitionersList: (isLoading: string | Practitioner[]) => void;
  onViewDetails?: (
    row: TableData,
    opensrpBaseURL: string,
    setDetail: (isLoading: string | Organization) => void,
    setPractitionersList: (isLoading: string | Practitioner[]) => void
  ) => void;
}

const Table: React.FC<Props> = (props: Props) => {
  const { setDetail, onViewDetails, setPractitionersList, opensrpBaseURL } = props;

  const columns: Column<TableData>[] = [
    {
      title: lang.NAME,
      dataIndex: 'name',
      sorter: (a: TableData, b: TableData) => a.name.localeCompare(b.name),
    },
  ];

  return (
    <TableLayout
      id="TeamList"
      persistState={true}
      datasource={props.data}
      columns={columns}
      actions={{
        width: '10%',
        // eslint-disable-next-line react/display-name
        render: (_: unknown, record: TableData) => (
          <span className="d-flex justify-content-end align-items-center">
            <Link to={URL_EDIT_TEAM + record.identifier.toString()}>
              <Button type="link" className="m-0 p-1">
                {lang.EDIT}
              </Button>
            </Link>
            <Divider type="vertical" />
            <Dropdown
              overlay={
                <Menu className="menu">
                  <Menu.Item
                    className="viewdetails"
                    onClick={() => {
                      if (onViewDetails) {
                        onViewDetails(record, opensrpBaseURL, setDetail, setPractitionersList);
                      }
                    }}
                  >
                    {lang.VIEW_DETAILS}
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              arrow
              trigger={['click']}
            >
              <MoreOutlined className="more-options" />
            </Dropdown>
          </span>
        ),
      }}
    />
  );
};

export default Table;
