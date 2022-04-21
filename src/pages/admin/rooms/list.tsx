import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
} from "@pankod/refine-antd";

import useFetch from "hooks/useFetch";
import React from "react";
import { Line } from "react-chartjs-2";
import { formatDate } from "utils/date";

export const RoomList: React.FC = () => {
  const { tableProps, sorter } = useTable({
    resource: "rooms",
    metaData: {
      populate: ["user", "roomType"],
    },
  });

  const formatedData = tableProps.dataSource?.map((item: any) => ({
    ...item,
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
    roomType: item.roomType.name,
    user: item.user.username,
    nightPrice: item.nightPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }),
  }));

  return (
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
  );
};
