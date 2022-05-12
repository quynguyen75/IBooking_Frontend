import {
  EditButton,
  List,
  Space,
  Table,
  FormProps,
  useSelect,
  Form,
  Input,
  Icons,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  useTable,
  useForm,
} from "@pankod/refine-antd";
import { USER_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import { url } from "inspector";
import { IUser } from "interfaces";
import React, { useEffect, useState } from "react";
import { formatDate } from "utils/date";

type FilterProps = {
  setUsers: (users: any) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const Filter: React.FC<FilterProps> = ({ setUsers, setIsLoading }) => {
  const { formProps } = useForm();

  const filterHandler = () => {
    let urlQuery = "?";

    const getData = async () => {
      try {
        const formData = formProps.form?.getFieldsValue(true);

        if (Object.keys(formData).length === 0) {
          return;
        }

        Object.keys(formData).forEach((field) => {
          const filterField = `filters[${field}][${
            field === "username" ? "$contains" : "$eq"
          }]=${formData[field]}`;

          urlQuery += filterField + "&";
        });

        setIsLoading(true);

        const response = await fetch(USER_API + urlQuery + "&populate=role");
        const filteredUsers = await response.json();

        const formatedData =
          filteredUsers &&
          filteredUsers.map((user: any) => ({
            ...user,
            createdAt: formatDate(user.createdAt),
            updatedAt: formatDate(user.updatedAt),
            role: user.role.name,
          }));

        setUsers(formatedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  };

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item label="Search" name="username">
        <Input
          placeholder="Firstname, Lastname"
          prefix={<Icons.SearchOutlined />}
        />
      </Form.Item>
      <Form.Item label="Gender" name="gender">
        <Select
          options={[
            {
              label: "Male",
              value: "Male",
            },
            {
              label: "Female",
              value: "Female",
            },
            {
              label: "Other",
              value: "Other",
            },
          ]}
          placeholder="Gender"
        ></Select>
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select
          options={[
            {
              label: "Active",
              value: "Active",
            },
            {
              label: "Deleted",
              value: "Deleted",
            },
          ]}
          placeholder="Status"
        ></Select>
      </Form.Item>

      <Form.Item>
        <Button onClick={filterHandler} type="primary">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, userData] = useFetch(USER_API + "?populate=role");

  useEffect(() => {
    if (userData) {
      const formatedData =
        userData &&
        userData.map((user: any) => ({
          ...user,
          createdAt: formatDate(user.createdAt),
          updatedAt: formatDate(user.updatedAt),
          role: user.role.name,
        }));

      setUsers(formatedData);
    }
  }, [userData]);

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="Filters">
          <Filter setUsers={setUsers} setIsLoading={setIsLoading} />
        </Card>
      </Col>

      <Col lg={18} xs={24}>
        <List>
          <Table dataSource={users} loading={isLoading} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
            <Table.Column dataIndex="username" title="Name" />
            <Table.Column dataIndex="role" title="Role" />
            <Table.Column dataIndex="gender" title="Gender" />
            {/* <Table.Column dataIndex="email" title="Email" /> */}
            <Table.Column dataIndex="status" title="Status" />

            <Table.Column dataIndex="createdAt" title="CreatedAt" />

            <Table.Column dataIndex="updatedAt" title="UpdatedAt" />

            <Table.Column<{ id: string }>
              title="Actions"
              render={(_: any, record: any) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
