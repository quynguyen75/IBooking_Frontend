import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  useNavigation,
  useNotification,
} from "@pankod/refine-core";

import {
  Button,
  Col,
  Edit,
  Form,
  Input,
  Row,
  Select,
  useForm,
} from "@pankod/refine-antd";

import useFetch from "hooks/useFetch";
import { ROLE_API, USER_API } from "constant/resource";
import { IRole, IUser } from "interfaces";

const { Option } = Select;

const statusOptions = ["Active", "Deleted"];

const genderOptions = ["Male", "Female", "Other"];

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const userId = window.location.pathname.split("/").slice(-1).join("");

  const { formProps } = useForm<IUser>({
    resource: `users/${userId}`,
  });
  const { open } = useNotification();
  const { list } = useNavigation();

  const [_, roleOptions] = useFetch(ROLE_API);
  const [userFetchStatus, user] = useFetch(USER_API + `/${userId}`);

  console.log(user);

  const saveHandler = async () => {
    const response = await fetch(USER_API + `/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formProps.form?.getFieldsValue(true),
      }),
    });
    if (response.ok) {
      open({
        message: "Update successfully",
        type: "success",
      });
      list("User-management");
    }
  };

  useEffect(() => {
    if (user) {
      formProps.form?.setFields([
        {
          name: "username",
          value: user.username,
        },
        {
          name: "email",
          value: user.email,
        },
        {
          name: "address",
          value: user.address,
        },
        {
          name: "phoneNumber",
          value: user.phoneNumber,
        },
        {
          name: "gender",
          value: user.gender,
        },

        {
          name: "role",
          value: user.role.id,
        },

        {
          name: "status",
          value: user.status,
        },
      ]);
    }
  }, [user]);

  return (
    <Edit
      actionButtons={
        <Button
          onClick={saveHandler}
          style={{
            backgroundColor: "#67be23",
            color: "#fff",
          }}
        >
          Save
        </Button>
      }
    >
      <Form {...formProps} layout="vertical">
        <Row>
          <Col span={12}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Name"
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
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
              label="Phone"
              name="phoneNumber"
            >
              <Input type={"email"} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{
                span: 10,
              }}
              label="Gender"
              name="gender"
            >
              <Select>
                {genderOptions.map((gender) => (
                  <Option value={gender}>{gender}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{
                span: 10,
              }}
              label="Status"
              name="status"
            >
              <Select>
                {statusOptions.map((status) => (
                  <Option value={status}>{status}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{
                span: 10,
              }}
              label="Role"
              name="role"
            >
              <Select>
                {roleOptions &&
                  roleOptions.roles
                    .filter((role: IRole) => role.name !== "Public")
                    .map((role: IRole) => (
                      <Option value={role.id}>{role.name}</Option>
                    ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
