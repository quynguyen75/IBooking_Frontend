import { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
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
import useUser from "hooks/useUser";
import useScrollToTop from "hooks/useScrollToTop";

type Props = {};

function ManageRoom({}: Props) {
  useUser();
  useScrollToTop();

  const isMin900px = useMediaQuery("(min-width: 900px)");

  const userContext = useContext(UserContext);

  const [rooms, setRooms] = useState(null);

  const [roomChangeFlag, setRoomChangeFlag] = useState(false);

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

  // const [roomFetchStatus, room] = useFetch(
  //   ROOM_API +
  //     `?filters[user][id]=${userContext.user.id}&populate[0]=images&populate[1]=roomType&populate[2]=user&populate[3]=bookings&populate[4]=reviews&populate[5]=reviews.user`
  // );

  const [bookingFetchStatus, bookings] = useFetch(
    BOOKING_API +
      `?filters[room][user][id][$eq]=${userContext.user.id}&filters[bookingStatus][id][$eq]=2&populate=*`
  );

  const changeRooms = () => setRoomChangeFlag((flag) => !flag);

  const formatedData = formatDataStrapi(rooms);

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

  useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await fetch(
          ROOM_API +
            `?filters[user][id]=${userContext.user.id}&populate[0]=images&populate[1]=roomType&populate[2]=user&populate[3]=bookings&populate[4]=reviews&populate[5]=reviews.user`
        );

        const data = await response.json();

        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    console.log("first");
  }, [roomChangeFlag]);

  if (!isMin900px) {
    return (
      <>
        <Header />
        <Container
          sx={{
            p: "100px 0",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
            }}
          >
            Xin l???i, giao di???n ch??a h??? tr??? ??i???n tho???i
          </Typography>
        </Container>
        <Footer />
      </>
    );
  }

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
          C??c ph??ng b???n ??ang cho thu??
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
            <Table.Column dataIndex="title" title="Ti??u ?????" />

            <Table.Column dataIndex="status" title="Tr???ng th??i" />

            <Table.Column dataIndex="city" title="Th??nh ph???" />

            <Table.Column dataIndex="roomType" title="Lo???i ph??ng" />

            <Table.Column dataIndex="nightPrice" title="Gi??" />

            <Table.Column dataIndex="updatedAt" title="S???a ?????i l???n cu???i" />

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
          C??c ????n ?????t ph??ng
        </Typography>
        <List>
          <Table rowKey="id" dataSource={bookingDatasource}>
            <Table.Column dataIndex="user" title="User" />

            <Table.Column dataIndex="room" title="Ph??ng" />

            <Table.Column dataIndex="checkInDate" title="Ng??y nh???n ph??ng" />

            <Table.Column dataIndex="checkOutDate" title="Ng??y tr??? ph??ng" />

            <Table.Column dataIndex="totalPrice" title="Gi??" />

            <Table.Column dataIndex="bookedAt" title="Ng??y ?????t ph??ng" />
          </Table>
        </List>
      </Container>

      <EditRoomDialog
        open={isOpenEditDialog}
        onClose={closeEditDialog}
        room={dialogData.edit}
        changeRooms={changeRooms}
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
