import { Container, Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { List, Table, Space } from "@pankod/refine-antd";
import useFetch from "hooks/useFetch";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";

import { ROOM_API } from "constant/resource";
import { formatMoney } from "utils/money";
import { formatDate } from "utils/date";
import EditRoomDialog from "./EditRoomDialog";
import ViewRoomDialog from "./ViewRoomDialog";

import useDialog from "hooks/useDialog";

type Props = {};

const FAKE_DATA = [
  {
    title: "Nhà có Khách",
    status: "Active",
    city: "Ho Chi Minh",
    roomType: "Chung cư",
    nightPrice: "300,000đ",
    updatedAt: formatDate(Date()),
  },
];

function ManageRoom({}: Props) {
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

  const [roomFetchStatus, room] = useFetch(ROOM_API + "?populate=*");

  const formatedData = room?.data.map((item: any) => ({
    id: item.id,
    ...item.attributes,
    roomType: item.attributes.roomType.data.attributes.name,
    nightPrice: formatMoney(item.attributes.nightPrice),
    updatedAt: formatDate(item.attributes.updatedAt),
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
            dataSource={FAKE_DATA}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
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
      </Container>

      <EditRoomDialog open={isOpenEditDialog} onClose={closeEditDialog} />

      <ViewRoomDialog open={isOpenViewDialog} onClose={closeViewDialog} />

      <Footer />
    </>
  );
}

export default ManageRoom;
