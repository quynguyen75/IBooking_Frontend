import React, { useEffect, useState } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  Button,
  Col,
  Edit,
  Form,
  Input,
  Row,
  useForm,
  useSelect,
  Select,
  InputNumber,
} from "@pankod/refine-antd";

import { IGeneral, IRoom, IUser } from "interfaces";
import useFetch from "hooks/useFetch";
import { USER_API } from "constant/resource";

const { TextArea } = Input;

const { Option } = Select;

const options = [
  {
    value: "Active",
  },
  {
    value: "Deleted",
  },
];

export const RoomEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    formProps,
    queryResult: roomData,
    saveButtonProps,
  } = useForm<IRoom>({
    metaData: {
      populate: ["user", "roomType"],
    },
  });

  const { queryResult: roomTypes } = useSelect<IGeneral>({
    resource: "room-types",
  });

  const roomTypeOptions = roomData?.data?.data &&
    roomTypes.data?.data && [
      roomTypes.data.data.find(
        (type: IGeneral) => type.id == roomData.data.data.roomType.id
      ),
      ...roomTypes.data.data.filter(
        (type: IGeneral) => type.id != roomData.data.data.roomType.id
      ),
    ];

  const [status, userOptions] = useFetch(USER_API);

  useEffect(() => {
    if (roomTypeOptions) {
      formProps.form?.setFields([
        {
          name: "roomType",
          value: roomTypeOptions[0]?.id,
        },
      ]);
    }
  }, [roomTypeOptions]);

  useEffect(() => {
    if (userOptions) {
      formProps.form?.setFields([
        {
          name: "user",
          value: roomData?.data?.data.user.id,
        },
      ]);
    }
  }, [userOptions, roomData]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item wrapperCol={{ span: 14 }} label="Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14 }} label="Description" name="desc">
          <TextArea
            style={{
              minHeight: "5rem",
              resize: "none",
            }}
          />
        </Form.Item>

        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Night Price"
              name="nightPrice"
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Cleanliness Fee"
              name="cleanlinessFee"
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Max Guest Count"
              name="guestCount"
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Room Type"
              name="roomType"
              initialValue={"He"}
            >
              <Select>
                {roomTypeOptions?.map((type) => (
                  <Option key={type?.id} value={type?.id}>
                    {type?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item wrapperCol={{ span: 14 }} label="User" name="user">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
              >
                {userOptions &&
                  userOptions.map((user: IUser) => (
                    <Option key={user.id} value={user.id}>
                      {user.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={roomData?.data?.data.status}
            >
              <Select>
                {options?.map((category) => (
                  <Option key={category.value} value={category.value}>
                    {category.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
