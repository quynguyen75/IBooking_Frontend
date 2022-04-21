import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
} from "@pankod/refine-antd";
import { formatDate } from "utils/date";

export const BookingList: React.FC = () => {
  const { tableProps, sorter } = useTable({
    metaData: {
      populate: ["user", "room", "bookingStatus"],
    },
  });

  const formatedData = tableProps.dataSource?.map((item: any) => ({
    ...item,
    bookedAt: formatDate(item.bookedAt),
    paymentAt: formatDate(item.paymentAt),
    user: item.user.username,
    totalPrice: item.totalPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    }),
    room: item.room.title,
    bookingStatus: item.bookingStatus.name,
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

        <Table.Column dataIndex="user" title="User" />
        <Table.Column dataIndex="room" title="Room" />
        <Table.Column dataIndex="bookingStatus" title="Booking Status" />

        <Table.Column
          dataIndex="totalPrice"
          title="Total Price"
          defaultSortOrder={getDefaultSortOrder("totalPrice", sorter)}
          sorter={{ multiple: 2 }}
        />

        <Table.Column
          dataIndex="checkInDate"
          title="Check In Date"
          defaultSortOrder={getDefaultSortOrder("checkInDate", sorter)}
          sorter={{ multiple: 2 }}
        />

        <Table.Column
          dataIndex="checkOutDate"
          title="Check Out Date"
          defaultSortOrder={getDefaultSortOrder("checkOutDate", sorter)}
          sorter={{ multiple: 2 }}
        />

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
