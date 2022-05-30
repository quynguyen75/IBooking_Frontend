import { useContext, useState } from "react";
import { Container, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { List, Table, Space } from "@pankod/refine-antd";
import useFetch from "hooks/useFetch";

import Footer from "components/layout/Footer";
import Header from "components/layout/Header";

import { BOOKING_API, ROOM_API } from "constant/resource";
import { formatMoney } from "utils/money";
import { formatDate } from "utils/date";
import EditRoomDialog from "./EditRoomDialog";
import ViewRoomDialog from "./ViewRoomDialog";

import useDialog from "hooks/useDialog";
import { formatDataStrapi } from "utils/data";
import { UserContext } from "context/UserContext";

type Props = {};

function ManageRoom({}: Props) {
  const userContext = useContext(UserContext);

  const {
    isOpen: isOpenEditDialog,
    open: openEditDialog,
    close: closeEditDialog,
  } = useDialog();

  const {
    isOpen: isOpenViewDialog,
    open: openViewDialog,
    close: closeViewDialog,
  } = useDialog();

  const [dialogData, setDialogData] = useState<{ edit: any; reviews: any }>({
    edit: null,
    reviews: null,
  });

  const [roomFetchStatus, room] = useFetch(
    ROOM_API +
      `?filters[user][id]=${userContext.user.id}&populate[0]=images&populate[1]=roomType&populate[2]=user&populate[3]=bookings&populate[4]=reviews&populate[5]=reviews.user`
  );

  const [bookingFetchStatus, bookings] = useFetch(
    BOOKING_API +
      `?filters[room][user][id][$eq]=${userContext.user.id}&filters[bookingStatus][id][$eq]=2&populate=*`
  );

  const formatedData = formatDataStrapi(room);

  const dataSource = formatedData
    ? formatedData.data.map((item: any) => ({
        ...item,
        roomType: item.roomType.label,
        nightPrice: formatMoney(item.nightPrice),
        updatedAt: formatDate(item.updatedAt),
      }))
    : [];

  const formatedBookings = formatDataStrapi(bookings);

  const bookingDatasource = formatedBookings?.data.map((booking: any) => ({
    ...booking,
    room: booking.room.title,
    user: booking.user.username,
    totalPrice: formatMoney(booking.totalPrice),
    bookedAt: formatDate(booking.bookedAt),
  }));

  return (
    <>
      <Header />

      <Container
        sx={{
          p: "80px 0",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "32px",
            fontWeight: 500,
          }}
        >
          Các phòng bạn đang cho thuê
        </Typography>
        <List>
          <Table
            rowKey="id"
            dataSource={dataSource}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setDialogData((data) => ({
                    ...data,
                    reviews: record,
                  }));
                  openViewDialog();
                }, // click row
              };
            }}
          >
            <Table.Column dataIndex="title" title="Tiêu đề" />

            <Table.Column dataIndex="status" title="Trạng thái" />

            <Table.Column dataIndex="city" title="Thành phố" />

            <Table.Column dataIndex="roomType" title="Loại phòng" />

            <Table.Column dataIndex="nightPrice" title="Giá" />

            <Table.Column dataIndex="updatedAt" title="Sửa đổi lần cuối" />

            <Table.Column<{ id: string }>
              dataIndex="actions"
              render={(_: any, record: any) => (
                <Space>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setDialogData((data) => ({
                        ...data,
                        edit: record,
                      }));
                      openEditDialog();
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Space>
              )}
            />
          </Table>
        </List>

        <Typography
          variant="h2"
          sx={{
            fontSize: "32px",
            fontWeight: 500,
          }}
        >
          Các đơn đặt phòng
        </Typography>
        <List>
          <Table rowKey="id" dataSource={bookingDatasource}>
            <Table.Column dataIndex="user" title="User" />

            <Table.Column dataIndex="room" title="Phòng" />

            <Table.Column dataIndex="checkInDate" title="Ngày nhận phòng" />

            <Table.Column dataIndex="checkOutDate" title="Ngày trả phòng" />

            <Table.Column dataIndex="totalPrice" title="Giá" />

            <Table.Column dataIndex="bookedAt" title="Ngày đặt phòng" />
          </Table>
        </List>
      </Container>

      <EditRoomDialog
        open={isOpenEditDialog}
        onClose={closeEditDialog}
        room={dialogData.edit}
      />

      <ViewRoomDialog
        open={isOpenViewDialog}
        onClose={closeViewDialog}
        room={dialogData.reviews}
      />

      <Footer />
    </>
  );
}

export default ManageRoom;
