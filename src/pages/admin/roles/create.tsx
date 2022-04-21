import {
  IResourceComponentsProps,
  useNavigation,
  useNotification,
} from "@pankod/refine-core";

import { useForm, Create, Form, Input, Button } from "@pankod/refine-antd";

import { IRole } from "interfaces";
import { ROLE_API } from "constant/resource";

export const RoleCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IRole>({
    resource: "users-permissions/roles",
  });

  const { list } = useNavigation();
  const { open } = useNotification();

  const saveHandler = async () => {
    const roleName = formProps.form?.getFieldValue("name");
    const roleDesc = formProps.form?.getFieldValue("description");

    const response = await fetch(ROLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roleName,
        description: roleDesc,
      }),
    });

    if (response.ok) {
      open({
        message: "Create successfully",
        type: "success",
      });
      list("roles");
    }
  };

  return (
    <Create
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
        <Form.Item wrapperCol={{ span: 14 }} label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 14 }}
          label="Description"
          name="description"
        >
          <textarea
            style={{
              width: "100%",
              minHeight: "5rem",
              padding: "0.7rem",
            }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
