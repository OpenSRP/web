import { mount } from 'enzyme';
import React from 'react';
import { Column, TableLayout } from '..';
import { TABLE_PAGE_SIZE, TABLE_PAGE_SIZE_OPTIONS } from '../../../constants';

interface TableData {
  geographicLevel: number;
  id: string;
  key: string;
  name: string;
}

const columns: Column<TableData>[] = [
  {
    title: 'NAME',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'LEVEL',
    dataIndex: 'geographicLevel',
    sorter: (a, b) => a.geographicLevel - b.geographicLevel,
  },
  {
    title: 'ACTIONS',
    width: '10%',
    // eslint-disable-next-line react/display-name
    render: () => <span id="Actions">actions</span>,
  },
];

describe('Table Layout', () => {
  const tableData: TableData[] = [];
  for (let i = 1; i < 5; i++) {
    tableData.push({
      id: i.toString(),
      key: i.toString(),
      name: `Edrward ${i}`,
      geographicLevel: i,
    });
  }

  it('renders without crashing', () => {
    const wrapper = mount(<TableLayout datasource={tableData} columns={columns} />);

    expect(wrapper.find('Table').first().prop('dataSource')).toMatchObject(tableData);
    expect(wrapper.find('Table').first().prop('columns')).toMatchObject(columns);
  });

  it('Must have default settings applied', () => {
    const wrapper = mount(<TableLayout datasource={tableData} columns={columns} />);

    expect(wrapper.find('Table').first().prop('pagination')).toMatchObject({
      showQuickJumper: true,
      showSizeChanger: true,
      defaultPageSize: TABLE_PAGE_SIZE,
      pageSizeOptions: TABLE_PAGE_SIZE_OPTIONS,
    });
  });

  it('can override default settings', () => {
    const wrapper = mount(
      <TableLayout datasource={tableData} pagination={false} columns={columns} />
    );

    expect(wrapper.find('Table').first().prop('pagination')).toBe(false);
  });
});
