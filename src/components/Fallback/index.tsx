import * as React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router';

const Fallback: React.FC = () => {
  const history = useHistory();

  return (
    <Result
      status="error"
      title="An Error Occurred"
      subTitle="There has been an error. It’s been reported to the site administrators via email and
      should be fixed shortly. Thanks for your patience."
      extra={[
        <Button key="error" onClick={() => history.push('/')} type="primary">
          Back Home
        </Button>,
      ]}
    />
  );
};

export default Fallback;
