import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  useSelect,
  FormProps,
  Form,
  Select,
  Button,
  Row,
  Col,
  Card,
} from "@pankod/refine-antd";
import { CrudFilters, HttpError } from "@pankod/refine-core";
import { USER_API } from "constant/resource";

import useFetch from "hooks/useFetch";
import { IGeneral, IRoom, IRoomFilterVariable, IUser } from "interfaces";
import React from "react";
import { formatDate } from "utils/date";

const { Option } = Select;

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { queryResult: roomTypes } = useSelect<IGeneral>({
    resource: "room-types",
  });

  const [userFetchStatus, userOptions] = useFetch(USER_API);

  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="User" name="user">
        <Select
          showSearch
          placeholder="Select a person"
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

      <Form.Item label="Room Type" name="roomType">
        <Select allowClear placeholder="Search room type">
          {roomTypes.data?.data.map((type) => (
            <Option key={type.id} value={type.id}>
              {type.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="status" name="status">
        <Select
          allowClear
          placeholder="Search status"
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
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export const RoomList: React.FC = () => {
  const { tableProps, sorter, searchFormProps } = useTable<
    IRoom,
    HttpError,
    IRoomFilterVariable
  >({
    resource: "rooms",
    metaData: {
      populate: ["user", "roomType"],
    },
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { user, status, roomType } = params;

      filters.push(
        {
          field: "user][id]",
          operator: "eq",
          value: user,
        },
        {
          field: "roomType][id]",
          operator: "eq",
          value: roomType,
        },
        {
          field: "status",
          operator: "eq",
          value: status,
        }
      );

      return filters;
    },
  });

  const formatedData = tableProps.dataSource?.map((item: any) => ({
    ...item,
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
    roomType: item.roomType?.name,
    user: item.user?.username,
    nightPrice: item.nightPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }),
  }));

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="Filters">
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>

      <Col lg={18} xs={24}>
        <List>
          <Table
            {...tableProps}
            dataSource={formatedData}
            rowKey="id"
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
            }}
          >
            <Table.Column
              dataIndex="id"
              title="ID"
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
              sorter={{ multiple: 3 }}
            />
            <Table.Column
              dataIndex="title"
              title="Title"
              defaultSortOrder={getDefaultSortOrder("title", sorter)}
              sorter={{ multiple: 2 }}
            />

            <Table.Column
              dataIndex="user"
              title="User"
              defaultSortOrder={getDefaultSortOrder("user", sorter)}
              sorter={{ multiple: 2 }}
            />

            <Table.Column dataIndex="status" title="Status" />

            <Table.Column
              dataIndex="roomType"
              title="Room Type"
              defaultSortOrder={getDefaultSortOrder("roomType", sorter)}
              sorter={{ multiple: 2 }}
            />

            <Table.Column
              dataIndex="nightPrice"
              title="Night Price"
              defaultSortOrder={getDefaultSortOrder("nightPrice", sorter)}
              sorter={{ multiple: 2 }}
            />

            <Table.Column
              dataIndex="createdAt"
              title="CreatedAt"
              defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
              sorter={{ multiple: 2 }}
            />

            <Table.Column
              dataIndex="updatedAt"
              title="UpdatedAt"
              defaultSortOrder={getDefaultSortOrder("updatedAt", sorter)}
              sorter={{ multiple: 2 }}
            />

            <Table.Column<{ id: string }>
              title="Actions"
              dataIndex="actions"
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
