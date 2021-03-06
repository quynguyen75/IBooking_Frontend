import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";

import { IGeneral } from "interfaces";
import { formatDate } from "utils/date";

export const GeneralList: React.FC = () => {
  const { tableProps, sorter } = useTable<IGeneral>();

  const formatedData = tableProps.dataSource?.map((item: any) => ({
    ...item,
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
    isDelete: item.isDelete + "",
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
          dataIndex="name"
          title="Name"
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter={{ multiple: 2 }}
        />

        <Table.Column dataIndex="status" title="Status" />

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
