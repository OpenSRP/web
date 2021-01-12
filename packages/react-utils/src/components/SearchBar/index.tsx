import React, { ChangeEvent } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { reducerName, filteredDataReducer, fetchFilteredDataAction } from '../../ducks';
import { useDispatch } from 'react-redux';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

reducerRegistry.register(reducerName, filteredDataReducer);

/** SearchBar props interface  */
export interface SearchBarDefaultProps {
  placeholder?: string;
  size?: SizeType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

/** function type for custom onChangeHandler functions */
export type OnChangeType = (event: ChangeEvent<HTMLInputElement>) => void;

/** search bar props interface */
export interface SearchBarProps extends SearchBarDefaultProps {
  onChangeHandler?: OnChangeType;
}

const defaultProps: SearchBarProps = {
  placeholder: '',
  size: 'large',
  data: [],
};

const SearchBar = (props: SearchBarProps) => {
  const { placeholder, size, data, onChangeHandler } = props;
  const dispatch = useDispatch();

  const customOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    const filteredData = [];
    for (const x of data) {
      const values = Object.values(x);
      for (const y of values) {
        if ((y as string).toLowerCase().includes(currentValue.toLowerCase())) {
          filteredData.push(x);
        }
      }
    }
    dispatch(fetchFilteredDataAction([...new Set(filteredData)]));
  };

  return (
    <Space style={{ marginBottom: 16, float: 'left' }}>
      <h5>
        <Input
          placeholder={placeholder}
          size={size}
          prefix={<SearchOutlined />}
          onChange={onChangeHandler ?? customOnChangeHandler}
        />
      </h5>
    </Space>
  );
};

SearchBar.defaultProps = defaultProps;

export { SearchBar };
