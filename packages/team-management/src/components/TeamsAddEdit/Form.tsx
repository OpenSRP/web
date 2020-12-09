import React, { useState } from 'react';
import { Select, Button, Form as AntdForm, Radio, Input } from 'antd';
import { history } from '@onaio/connected-reducer-registry';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { v4 } from 'uuid';
import {
  API_BASE_URL,
  TEAMS_POST,
  PRACTITIONER_POST,
  PRACTITIONER_DEL,
  TEAMS_PUT,
} from '../../constants';
import { OpenSRPService } from '@opensrp/server-service';
import {
  sendSuccessNotification,
  sendInfoNotification,
  sendErrorNotification,
} from '@opensrp/notifications';
import { OrganizationPOST } from '../../ducks/organizations';
import { Practitioner, PractitionerPOST } from '../../ducks/practitioners';

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 11 } };
const offsetLayout = { wrapperCol: { offset: 8, span: 11 } };
const layoutFull = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
const offsetLayoutFull = { wrapperCol: { offset: 8, span: 16 } };

export interface FormField {
  name: string;
  active: boolean;
  practitioners: string[];
}

interface Props {
  id?: string;
  practitioner: Practitioner[];
  initialValue?: FormField | null;
  accessToken: string;
}

/**
 * Handle form submission
 *
 * @param {Practitioner} practitioner list of practitioner to filter the selected one from
 * @param {string} accessToken Token for api calles
 * @param {object} values value of form fields
 * @param {object} initialValue initialValue of form fields
 * @param {string} id id of the team
 * @param {Function} setIsSubmitting function to set IsSubmitting loading process
 */
export function onSubmit(
  practitioner: Practitioner[],
  accessToken: string,
  values: FormField,
  initialValue: FormField,
  id?: string,
  setIsSubmitting?: (value: boolean) => void
) {
  if (setIsSubmitting) setIsSubmitting(true);
  const Teamid = id ? id : v4();

  const payload: OrganizationPOST = {
    active: values.active,
    identifier: Teamid,
    name: values.name,
    type: {
      coding: [
        {
          code: 'team',
          display: 'Team',
          system: 'http://terminology.hl7.org/CodeSystem/organization-type',
        },
      ],
    },
  };

  setTeam(accessToken, payload, id)
    .then(async () => {
      // Filter and seperate the practitioners uuid
      // const toBe = initialValue.practitioners.filter((val) => values.practitioners.includes(val));
      const toAdd = initialValue.practitioners.filter((val) => !values.practitioners.includes(val));
      const toRemove = values.practitioners.filter(
        (val) => !initialValue.practitioners.includes(val)
      );

      await SetPractitioners(practitioner, toAdd, toRemove, accessToken, Teamid);

      if (setIsSubmitting) setIsSubmitting(false);
      history.goBack();
    })
    .catch(() => {
      if (setIsSubmitting) setIsSubmitting(false);
      sendErrorNotification('An error occurred');
    });
}

/**
 * handle Practitioners
 *
 * @param {Practitioner} practitioner list of practitioner to filter the selected one from
 * @param {Array<string>} toAdd list of practitioner uuid to add
 * @param {Array<string>} toRemove list of practitioner uuid to remove
 * @param {string} accessToken Token for api calles
 * @param {string} id id of the team
 */
async function SetPractitioners(
  practitioner: Practitioner[],
  toAdd: string[],
  toRemove: string[],
  accessToken: string,
  id: string
) {
  sendInfoNotification('Assigning Practitioners');

  // Api Call to delete practitioners
  toRemove.forEach((prac) =>
    new OpenSRPService(accessToken, API_BASE_URL, PRACTITIONER_DEL + prac).delete()
  );

  // Api Call to add practitioners
  const toAddPractitioner = practitioner.filter((e) => toAdd.includes(e.identifier));
  const payload: PractitionerPOST[] = toAddPractitioner.map((prac) => {
    return {
      active: prac.active,
      identifier: v4(),
      practitioner: prac.identifier,
      organization: id,
      code: { text: 'Community Health Worker' },
    };
  });
  const serve = new OpenSRPService(accessToken, API_BASE_URL, PRACTITIONER_POST);
  await serve.create(payload);

  sendSuccessNotification('Successfully Assigned Practitioners');
}

/**
 * Function to make teams API call
 *
 * @param {string} accessToken Token for api calles
 * @param {OrganizationPOST} payload payload To send
 * @param {string} id of the team if already created
 */
export async function setTeam(accessToken: string, payload: OrganizationPOST, id?: string) {
  if (id) {
    const serve = new OpenSRPService(accessToken, API_BASE_URL, TEAMS_PUT + id);
    await serve.update(payload);
    sendSuccessNotification('Successfully Updated Teams');
  } else {
    const serve = new OpenSRPService(accessToken, API_BASE_URL, TEAMS_POST);
    await serve.create(payload);
    sendSuccessNotification('Successfully Added Teams');
  }
}

export const Form: React.FC<Props> = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const initialValue = props.initialValue
    ? props.initialValue
    : { active: true, name: '', practitioners: [''] };

  return (
    <AntdForm
      requiredMark={false}
      {...layout}
      onFinish={(values) =>
        onSubmit(
          props.practitioner,
          props.accessToken,
          values,
          initialValue,
          props.id,
          setIsSubmitting
        )
      }
      initialValues={initialValue}
    >
      <AntdForm.Item name="name" label="Team Name">
        <Input placeholder="Enter a team name" />
      </AntdForm.Item>

      <AntdForm.Item name="active" label="Status">
        <Radio.Group>
          <Radio value={true}>Active</Radio>
          <Radio value={false}>Inactive</Radio>
        </Radio.Group>
      </AntdForm.Item>

      <AntdForm.List name="practitioners">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <AntdForm.Item
                className="practitioners_Field"
                {...(index === 0 ? layoutFull : offsetLayoutFull)}
                label={index === 0 ? 'Team Members' : ''}
                key={field.key}
                tooltip="This is a required field"
              >
                <AntdForm.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message:
                        fields.length > 0
                          ? "Please input user's name or delete this field."
                          : "Please input user's name",
                    },
                  ]}
                  noStyle
                >
                  <Select style={{ width: '69%' }} placeholder="Select user (practitioners only)">
                    {props.practitioner.map((practitioner) => (
                      <Select.Option key={practitioner.identifier} value={practitioner.identifier}>
                        {practitioner.name}
                      </Select.Option>
                    ))}
                  </Select>
                </AntdForm.Item>
                {fields.length > 1 ? (
                  <Button
                    className="removePractitioner"
                    type="default"
                    style={{ border: 0, boxShadow: 'none' }}
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                  />
                ) : null}
              </AntdForm.Item>
            ))}
            <AntdForm.Item {...offsetLayout}>
              <Button
                id="addPractitioner"
                type="dashed"
                onClick={() => add()}
                className="w-100"
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <AntdForm.ErrorList errors={errors} />
            </AntdForm.Item>
          </>
        )}
      </AntdForm.List>

      <AntdForm.Item {...offsetLayout}>
        <Button id="submit" loading={isSubmitting} type="primary" htmlType="submit">
          {isSubmitting ? 'Saving' : 'Save'}
        </Button>
        <Button id="cancel" onClick={() => history.goBack()} type="dashed">
          Cancel
        </Button>
      </AntdForm.Item>
    </AntdForm>
  );
};

export default Form;
