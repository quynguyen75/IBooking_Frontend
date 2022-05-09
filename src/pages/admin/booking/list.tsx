import {
  List,
  Table,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  Form,
  FormProps,
  useSelect,
  Input,
  Select,
  Icons,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
} from "@pankod/refine-antd";
import { CrudFilters, HttpError } from "@pankod/refine-core";
import { ROOM_API, USER_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import { IBooking, IBookingFilterVariable, IGeneral, IUser } from "interfaces";
import { formatDate } from "utils/date";

const { Option } = Select;

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { queryResult: bookingStatuses } = useSelect<IGeneral>({
    resource: "booking-statuses",
  });

  const { queryResult: paymentStatuses } = useSelect<IGeneral>({
    resource: "payment-statuses",
  });

  const { queryResult: paymentTypes } = useSelect<IGeneral>({
    resource: "payment-types",
  });

  const [userFetchStatus, userOptions] = useFetch(USER_API);
  const [roomFetchStatus, roomOptions] = useFetch(ROOM_API);

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

      <Form.Item label="Room" name="room">
        <Select
          showSearch
          placeholder="Select a room"
          optionFilterProp="children"
        >
          {roomOptions &&
            roomOptions.data.map((room: any) => (
              <Option key={room.id} value={room.id}>
                {room.attributes.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item label="Booking Status" name="bookingStatus">
        <Select allowClear placeholder="Search booking status">
          {bookingStatuses.data?.data.map((status) => (
            <Option key={status.id} value={status.id}>
              {status.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Payment Status" name="paymentStatus">
        <Select allowClear placeholder="Search payment status">
          {paymentStatuses.data?.data.map((status) => (
            <Option key={status.id} value={status.id}>
              {status.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Payment Type" name="paymentType">
        <Select allowClear placeholder="Search payment type">
          {paymentTypes.data?.data.map((type) => (
            <Option key={type.id} value={type.id}>
              {type.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export const BookingList: React.FC = () => {
  const { tableProps, sorter, searchFormProps } = useTable<
    IBooking,
    HttpError,
    IBookingFilterVariable
  >({
    metaData: {
      populate: ["user", "room", "bookingStatus"],
    },
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { user, room, bookingStatus, paymentStatus, paymentType } = params;

      filters.push(
        {
          field: "user][id]",
          operator: "eq",
          value: user,
        },
        {
          field: "room][id]",
          operator: "eq",
          value: room,
        },
        {
          field: "bookingStatus][id]",
          operator: "eq",
          value: bookingStatus,
        },
        {
          field: "paymentStatus][id]",
          operator: "eq",
          value: paymentStatus,
        },
        {
          field: "paymentType][id]",
          operator: "eq",
          value: paymentType,
        }
      );

      return filters;
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
      </Col>
    </Row>
  );
};
