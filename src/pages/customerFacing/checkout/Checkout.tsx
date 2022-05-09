import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";

type Props = {};

function Checkout({}: Props) {
  const min768px = useMediaQuery("(min-width:768px)");

  return (
    <>
      {min768px && <Header />}
      {min768px || (
        <div
          style={{
            padding: "12px 0",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <Stack direction="row" alignItems="center">
            <IconButton>
              <ChevronLeft />
            </IconButton>
            <Typography
              variant="h1"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                flex: 1,
                textAlign: "center",
              }}
            >
              Xác nhận và thanh toán
            </Typography>
          </Stack>
        </div>
      )}

      <Container
        sx={{
          paddingTop: min768px ? "100px" : "64px",
          fontSize: min768px ? "16px" : "14px",
        }}
        className="colorBlack"
      >
        <Grid container spacing={min768px ? 6 : 0}>
          <Grid item xs={12} md={6}>
            {min768px && (
              <Typography
                variant="h1"
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                Xác nhận và thanh toán
              </Typography>
            )}

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "24px",
                    }}
                    component="img"
                    alt="The house from the offer."
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                  />
                </Grid>

                <Grid item xs={8}>
                  <div>Phòng riêng tại nhà</div>
                  <div
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    ♥Staycious Balcony* Near Ben Thanh Market* 1A♥
                  </div>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <span className="checkout__title">Chuyến đi của bạn</span>
              <Stack>
                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div>
                      <div className="colorBlack textBold mb-4">Ngày</div>
                      <div>12/05/2022 - 13/05/2022</div>
                    </div>

                    <div>
                      <span className="textBold textUnderline cursorPointer colorBlack">
                        Chỉnh sửa
                      </span>
                    </div>
                  </Stack>
                </div>

                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div>
                      <div className="colorBlack textBold mb-4">Khách</div>
                      <div>1 Khách</div>
                    </div>

                    <div>
                      <span className="textBold textUnderline cursorPointer colorBlack">
                        Chỉnh sửa
                      </span>
                    </div>
                  </Stack>
                </div>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Divider />

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <span className="checkout__title">Chi tiết giá</span>
              <Stack>
                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div>đ 300,000 x 1 đêm</div>

                    <div>đ 300,000</div>
                  </Stack>
                </div>

                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div>Phí dọn dẹp</div>

                    <div>đ 20,000</div>
                  </Stack>
                </div>

                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <div className="textBold">Tổng</div>

                    <div className="textBold">đ 320,000</div>
                  </Stack>
                </div>
              </Stack>
            </Box>

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <span className="checkout__title">Thanh toán bằng</span>
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemText>Paypal</ListItemText>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <ListItemText>Google Pay</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>

            <Box
              sx={{
                padding: "16px 0",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  padding: "10px 0",
                }}
              >
                Xác nhận và thanh toán
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Checkout;
