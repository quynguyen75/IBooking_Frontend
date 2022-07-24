import {
  Box,
  Button,
  Container,
  Grid,
  MobileStepper,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "store/store";

import CreateRoomType from "../../../components/createRoom/CreateRoomType";
import ChooseAddress from "../../../components/createRoom/ChoseAddress";
import ChooseGuestCount from "../../../components/createRoom/ChooseGuestCount";
import ChooseAmenities from "../../../components/createRoom/ChooseAmenities";
import UploadImages from "../../../components/createRoom/UploadImages";
import CreateTitle from "../../../components/createRoom/CreateTitle";
import CreateDescription from "../../../components/createRoom/CreateDescription";
import SetPrice from "../../../components/createRoom/SetPrice";
import { ROOM_API } from "constant/resource";
import { UserContext } from "context/UserContext";
import Loading from "components/loading/Loading";
import { reset } from "slice/createRoomSlice";
import useUser from "hooks/useUser";
import useScrollToTop from "hooks/useScrollToTop";

type Props = {};

const CREATE_ROOM_STEPS = [
  {
    title: "Điều nào sau đây mô tả chính xác nhất về nơi ở của bạn?",
    component: <CreateRoomType />,
  },
  {
    title: "Chỗ của bạn nằm ở đâu",
    component: <ChooseAddress />,
  },
  {
    title: "Bạn muốn chào đón bao nhiêu khách?",
    component: <ChooseGuestCount />,
  },
  {
    title: "Cho khách biết chỗ ở của bạn có những gì",
    component: <ChooseAmenities />,
  },
  {
    title: "Tiếp theo, hãy thêm một số ảnh chụp chỗ ở của bạn",
    component: <UploadImages />,
  },
  {
    title: "Hãy đặt tên cho chỗ ở của bạn",
    component: <CreateTitle />,
  },
  {
    title: "Bây giờ, hãy mô tả chỗ ở của bạn",
    component: <CreateDescription />,
  },

  {
    title: "Đặt giá cho thuê",
    component: <SetPrice />,
  },
];

function CreateRoom({}: Props) {
  useUser();

  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const createRoomState = useSelector((state: RootState) => state.createRoom);

  const isDisableNextButton = useSelector(
    (state: RootState) => state.createRoom.isDisableButton
  );

  useScrollToTop();

  const maxSteps = CREATE_ROOM_STEPS.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      const finalRoomData = {
        ...createRoomState.address,
        ...createRoomState.amenities,
        guestCount: createRoomState.count.guest,
        bedCount: createRoomState.count.bed,
        bedRoomCount: createRoomState.count.bedroom,
        bathRoomCount: createRoomState.count.bathroom,
        livingRoomCount: createRoomState.count.livingroom,
        cleanlinessFee: createRoomState.cleanlinessFee,
        desc: createRoomState.desc,
        nightPrice: createRoomState.nightPrice,
        roomType: createRoomState.roomType,
        title: createRoomState.title,
        user: userContext.user.id,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(finalRoomData));
      createRoomState.imageFiles.forEach((file) =>
        formData.append("files.images", file)
      );

      const postData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(ROOM_API, {
            method: "POST",

            body: formData,
          });

          if (response.ok) {
            dispatch(reset());
            toast.success("Tạo phòng thành công");
            history.push("/host/manage");
          } else toast.error("Tạo phòng thất bại");
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      postData();

      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return history.goBack();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            background:
              "linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%)",
            minHeight: {
              sm: "100vh",
            },
          }}
        >
          <Box
            sx={{
              padding: "32px 0",
              alignItems: "center",
            }}
          >
            <Container>
              <Typography
                typography="h1"
                sx={{
                  fontSize: {
                    xs: "22px",
                    md: "32px",
                  },
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {CREATE_ROOM_STEPS[activeStep]?.title}
              </Typography>
            </Container>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              paddingBottom: "60px",
              height: "100%",
            }}
          >
            <Container
              sx={{
                height: "100%",
              }}
            >
              {CREATE_ROOM_STEPS[activeStep]?.component}

              <MobileStepper
                variant="text"
                sx={{
                  position: {
                    xs: "fixed",
                    sm: "absolute",
                  },
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  // p: {
                  //   xs: "8px 0",
                  //   sm: "24px 0",
                  // },
                }}
                steps={maxSteps}
                activeStep={activeStep}
                nextButton={
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={isDisableNextButton}
                  >
                    Tiếp theo
                  </Button>
                }
                backButton={<Button onClick={handleBack}>Quay lại</Button>}
              />
            </Container>
          </Box>
        </Grid>
      </Grid>

      {isLoading && <Loading />}
    </>
  );
}

export default CreateRoom;
