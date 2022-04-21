import { EditButton, List, Space, Table } from "@pankod/refine-antd";
import { USER_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import { formatDate } from "utils/date";

export const UserList: React.FC = () => {
  const [status, userData] = useFetch(USER_API);

  const formatedData =
    userData &&
    userData.map((user: any) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
      role: user.role.name,
    }));

  return (
    <List>
      <Table dataSource={formatedData} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="username" title="Name" />
        <Table.Column dataIndex="role" title="Role" />
        <Table.Column dataIndex="gender" title="Gender" />
        <Table.Column dataIndex="email" title="Email" />
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
  );
};
