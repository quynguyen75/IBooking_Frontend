import { useState } from "react";

import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
  Dialog,
  Link,
  Grid,
} from "@mui/material";

import AvatarImage from "assets/img/user.png";

type Props = {
  host: any;
};

function RoomDetailHost({ host }: Props) {
  const min768px = useMediaQuery("(min-width: 768px)");
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => setIsOpenDialog(true);

  const closeDialog = () => setIsOpenDialog(false);

  const createdAccountDate = new Date(host.createdAt);

  return (
    <Box
      sx={{
        padding: "16px 0",
        fontSize: "16px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <div>
          <Typography
            variant="h2"
            sx={{
              fontSize: "22px",
              fontWeight: 500,
              mb: "4px",
            }}
          >
            Chủ nhà {host.username}
          </Typography>
          <span
            style={{
              fontSize: "14px",
            }}
          >
            Đã tham gia vào tháng {createdAccountDate.getMonth() + 1} năm{" "}
            {createdAccountDate.getFullYear()}
          </span>
        </div>
        <Avatar
          sx={{
            width: "48px",
            height: "48px",
          }}
          alt="Host"
          src={AvatarImage}
        />
      </Stack>

      <div>
        <p>{host.about}</p>
      </div>

      <Stack
        sx={{
          padding: "8px ",
          alignItems: min768px ? "center" : "stretch",
        }}
      >
        <Button
          sx={{
            p: 1,
          }}
          variant="outlined"
          onClick={openDialog}
        >
          Liên hệ với chủ nhà
        </Button>
      </Stack>

      <Dialog open={isOpenDialog} onClose={closeDialog} fullWidth maxWidth="xs">
        <Box
          sx={{
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link
                sx={{
                  display: "block",
                  color: "#fff",
                }}
                href={`tel:${host.phoneNumber}`}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    p: 2,
                  }}
                >
                  Liên hệ qua số điện thoại
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12}>
              <Link
                sx={{
                  display: "block",
                  color: "#fff",
                }}
                href={`mailto:${host.email}`}
              >
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    p: 2,
                  }}
                >
                  Liên hệ qua email
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
}

export default RoomDetailHost;
