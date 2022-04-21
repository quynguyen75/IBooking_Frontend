import {
  Button,
  Col,
  Create,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";
import { useNavigation, useNotification } from "@pankod/refine-core";
import {
  GENDER_OPTIONS,
  ROLE_API,
  STATUS_OPTIONS,
  USER_API,
} from "constant/resource";
import useFetch from "hooks/useFetch";
import { IRole, IUser } from "interfaces";
import React, { useEffect } from "react";
import { dateToYMD } from "utils/date";

const { Option } = Select;

const dateFormat = "DD/MM/YYYY";

export const UserCreate: React.FC = () => {
  const { list } = useNavigation();

  const { formProps, saveButtonProps } = useForm<IUser>({
    resource: "users",
    redirect: false,
    onMutationSuccess() {
      list("User-management");
    },
  });

  const [status, roles] = useFetch(ROLE_API);

  useEffect(() => {
    if (roles) {
      formProps.form?.setFields([
        {
          name: "role",
          value: roles.roles[0].id,
        },
      ]);
    }
  }, [roles]);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row>
          <Col span={12}>
            <Form.Item wrapperCol={{ span: 14 }} label="Name" name="username">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Password"
              name="password"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item wrapperCol={{ span: 14 }} label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Phone"
              name="phoneNumber"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item wrapperCol={{ span: 14 }} label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Birthday"
              name="birthday"
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              initialValue={GENDER_OPTIONS[0]}
              wrapperCol={{ span: 14 }}
              label="Gender"
              name="gender"
            >
              <Select>
                {GENDER_OPTIONS.map((gender) => (
                  <Option value={gender}>{gender}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              initialValue={STATUS_OPTIONS[0]}
              wrapperCol={{ span: 14 }}
              label="Status"
              name="status"
            >
              <Select>
                {STATUS_OPTIONS.map((status) => (
                  <Option value={status}>{status}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item wrapperCol={{ span: 14 }} label="Role" name="role">
              <Select>
                {roles &&
                  roles.roles
                    .filter((role: IRole) => role.name !== "Public")
                    .map((role: IRole) => (
                      <Option value={role.id}>{role.name}</Option>
                    ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
