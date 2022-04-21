import React, { useEffect } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { Edit, Form, Input, useForm, Select } from "@pankod/refine-antd";

import { IGeneral } from "interfaces";

const { Option } = Select;

const options = [
  {
    value: "Active",
  },
  {
    value: "Deleted",
  },
];

export const GeneralEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IGeneral>();

  useEffect(() => {
    if (queryResult?.data?.data) {
      formProps.form?.setFields([
        {
          name: "status",
          value: queryResult.data.data.status,
        },
      ]);
    }
  }, [queryResult?.data?.data]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item wrapperCol={{ span: 14 }} label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 6 }}
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            {options?.map((category) => (
              <Option key={category.value} value={category.value}>
                {category.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Edit>
  );
};
