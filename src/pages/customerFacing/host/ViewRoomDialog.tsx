import { Close } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Dialog,
  Grid,
  IconButton,
  Rating,
  Toolbar,
  Typography,
} from "@mui/material";
import { List, Space, Table } from "@pankod/refine-antd";
import React from "react";
import { formatDate } from "utils/date";

type Props = {
  open: boolean;
  onClose: () => void;
  room: any;
};

function ViewRoomDialog({ open, onClose, room }: Props) {
  const dataSource = room
    ? room.reviews.data.map((item: any) => {
        const starKeys = Object.keys(item).filter((key) =>
          key.includes("Star")
        );
        const avaverageStar = starKeys.reduce(
          (acc, value) => acc + +(item[value] / starKeys.length).toFixed(1),
          0
        );

        return {
          user: item.user.username,
          content: item.content,
          star: avaverageStar,
          updatedAt: formatDate(item.updatedAt),
        };
      })
    : [];

  return (
    <Dialog open={open} fullScreen onClose={onClose}>
      <AppBar sx={{ position: "relative", mb: 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            //   onClick={handleClose}
            aria-label="close"
            onClick={onClose}
          >
            <Close />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Reviews
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <List>
              <Table rowKey="id" dataSource={dataSource}>
                <Table.Column dataIndex="user" title="User" />

                <Table.Column dataIndex="content" title="Nội dung" />

                <Table.Column
                  dataIndex="star"
                  title="Rating"
                  render={(text, record) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">{text}</Typography>
                      <Rating value={text} readOnly />
                    </div>
                  )}
                />

                <Table.Column dataIndex="updatedAt" title="Sửa đổi lần cuối" />
              </Table>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default ViewRoomDialog;
