import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import reducerRegistry from '@onaio/redux-reducer-registry';
import reducer, { reducerName } from '../../ducks/organizations';
import Form from './Form';
import { useParams } from 'react-router';
import { getAccessToken } from '@onaio/session-reducer';
import { useSelector } from 'react-redux';
import { API_BASE_URL, PRACTITIONER_GET } from '../../constants';
import { OpenSRPService } from '@opensrp/server-service';
import { notification } from 'antd';
import { Practitioner } from '../../ducks/practitioner';

reducerRegistry.register(reducerName, reducer);

export const TeamsAddEdit: React.FC = () => {
  const accessToken = useSelector((state) => getAccessToken(state) as string);
  const params: { id: string } = useParams();

  const [practitioner, setPractitioner] = useState<Practitioner[] | null>(null);

  useEffect(() => {
    // if (params.id) {
    //   const serve = new OpenSRPService(accessToken, API_BASE_URL, LOCATION_TAG_GET + params.id);
    //   serve
    //     .list()
    //     .then((response: LocationTag) => {
    //       setInitialValue({
    //         active: response.active,
    //         description: response.description,
    //         name: response.name,
    //       });
    //       setIsLoading(false);
    //     })
    //     .catch((e) => notification.error({ message: `${e}`, description: '' }));
    // } else {
    // }
  }, [accessToken, params.id]);

  useEffect(() => {
    const serve = new OpenSRPService(accessToken, API_BASE_URL, PRACTITIONER_GET);
    serve
      .list()
      .then((response: Practitioner[]) => {
        console.log(response);
        setPractitioner(response);
      })
      .catch((e) => notification.error({ message: `${e}`, description: '' }));
  }, [accessToken]);

  if (!practitioner) return <h1>loading</h1>;

  return (
    <section>
      <Helmet>
        <title>{params.id ? 'Edit' : 'Create'} Team</title>
      </Helmet>

      <h5 className="mb-3">{params.id ? 'Edit' : 'Create'} Team</h5>

      <div className="bg-white p-5">
        <Form accessToken={accessToken} id={params.id} practitioner={practitioner} />
      </div>
    </section>
  );
};

export default TeamsAddEdit;
