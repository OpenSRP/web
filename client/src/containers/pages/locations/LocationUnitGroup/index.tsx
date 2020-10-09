import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Table, Input, Popconfirm, Form, Row, Col, Menu, Dropdown, Button, Divider } from 'antd';
import { MoreOutlined, SearchOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import { getExtraData } from '@onaio/session-reducer';
import { connect } from 'react-redux';
import { Store } from 'redux';
// import { Dictionary } from '@onaio/utils';
import '../Location.css';
import LocationDetail from '../../../../components/locations/LocationDetail';

interface Item {
  key: string;
  name: string;
  status: 'Alive' | 'Not Active';
  type: string;
  created: string;
  lastupdated: string;
  externalid: string;
  openmrsid: string;
  username: string;
  version: string;
  syncstatus: 'Synced' | 'Not Synced';
  level: number;
}

const tableData: Item[] = [];
for (let i = 0; i < 100; i++) {
  tableData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    level: 2,
    lastupdated: `2017-10-${i}`,
    status: 'Alive',
    type: 'Feautire',
    created: `2016-10-${i}`,
    externalid: `asdkjh123${i}`,
    openmrsid: `asdasdasdkjh123${i}`,
    username: `edward ${i}`,
    version: `${i}`,
    syncstatus: 'Synced',
  });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {/* {inputNode} */}
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const LocationUnitGroup = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData);
  const [editingKey, setEditingKey] = useState('');
  const [value, setValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Item) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => setEditingKey('');

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const AdditionalMenu = (e: any) => (
    <Menu>
      <Menu.Item onClick={() => {setSelectedLocation(e)}}>View Details</Menu.Item>
      <Menu.Item>
        <Popconfirm title="Sure to Delete?" onConfirm={() => console.log('')}>
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
      sorter: (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name),
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      width: '10%',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <p onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </p>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <p>Cancel</p>
            </Popconfirm>
          </span>
        ) : (
          <span className="location-table-action">
            <p className="edit" onClick={() => edit(record)}>
              Edit
            </p>
            <Dropdown
              overlay={() => AdditionalMenu(record)}
              placement="bottomLeft"
              arrow
              trigger={['click']}
            >
              <MoreOutlined className="more-options" />
            </Dropdown>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'level' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onChange = (e: { target: { value: any } }) => {
    console.log('target :: ', e.target.value);
    const currentValue = e.target.value;
    setValue(currentValue);
    const filteredData = tableData.filter((entry) =>
      entry.name.toLowerCase().includes(currentValue.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <section>
      <Helmet>
        <title>Locations Unit</title>
      </Helmet>
      <Row justify="start" className="weclome-box">
        <Col span={24}>
          <h5>Location Unit Group Management</h5>
        </Col>
      </Row>
      <Row>
        <Col span={selectedLocation !== null ? 16 : 24}>
          <Row className="bg-white">
            <Col span={24}>
              <div className="mb-3 mt-3 mr-1 ml-3 d-flex justify-content-between">
                <h5>
                  <Input
                    placeholder="Search"
                    size="large"
                    value={value}
                    prefix={<SearchOutlined />}
                    onChange={onChange}
                  />
                </h5>
                <div>
                  <Button type="primary">
                    <PlusOutlined />
                    Add location unit group
                  </Button>
                  <Divider type="vertical" />
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key={'1'}>Logout</Menu.Item>
                      </Menu>
                    }
                    placement="bottomRight"
                  >
                    <Button shape="circle" icon={<SettingOutlined />} type="text" />
                  </Dropdown>
                </div>
              </div>
              <div className="table-container">
                <Form form={form} component={false}>
                  <Table
                    components={{ body: { cell: EditableCell } }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{ onChange: cancel, showQuickJumper: true }}
                  />
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
        {selectedLocation !== null ? (
          <Col span={8}>
            <Row>
              <Col span={24}>
                <LocationDetail locationData={selectedLocation} />
              </Col>
            </Row>
          </Col>
        ) : null}
      </Row>
    </section>
  );
};

export { LocationUnitGroup };

/** Connect the component to the store */

/** map state to props */

const mapStateToProps = (state: Partial<Store>) => {
  const result = {
    extraData: getExtraData(state),
  };
  return result;
};

/** create connected component */

/** Connected Header component
 */
const ConnectedLocationUnitGroupComponent = connect(mapStateToProps)(LocationUnitGroup);

export default ConnectedLocationUnitGroupComponent;
