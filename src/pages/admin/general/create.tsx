import { IResourceComponentsProps } from "@pankod/refine-core";

import { useForm, Create, Form, Input } from "@pankod/refine-antd";

import { IGeneral } from "interfaces";

export const GeneralCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IGeneral>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item wrapperCol={{ span: 14 }} label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
