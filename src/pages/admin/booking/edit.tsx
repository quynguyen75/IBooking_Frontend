import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  useNavigation,
  useNotification,
} from "@pankod/refine-core";
import {
  Edit,
  Form,
  Input,
  useForm,
  useSelect,
  Select,
  Row,
  Col,
  InputNumber,
  Typography,
  Button,
} from "@pankod/refine-antd";

import { IBooking, IGeneral, IRoom, IUser } from "interfaces";
import { BOOKING_API, ROOM_API, USER_API } from "constant/resource";
import useFetch from "hooks/useFetch";
import { DatePicker } from "antd";
import moment from "moment";
import { formatMoney } from "utils/money";
import { dateToYMD } from "utils/date";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const { Option } = Select;

const dateFormat = "YYYY-MM-DD";

export const BookingEdit: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();
  const { open } = useNotification();

  const bookingID = window.location.pathname.split("/").slice(-1).join("");
  const {
    formProps,
    saveButtonProps,
    queryResult: bookingData,
  } = useForm<IBooking>({
    metaData: {
      populate: [
        "bookingStatus",
        "user",
        "room",
        "paymentStatus",
        "paymentType",
      ],
    },
  });

  const { queryResult: bookingStatus } = useSelect<IGeneral>({
    resource: "booking-statuses",
  });

  const { queryResult: paymentStatus } = useSelect<IGeneral>({
    resource: "payment-statuses",
  });

  const { queryResult: paymentType } = useSelect<IGeneral>({
    resource: "payment-types",
  });

  const [userFetchStatus, userOptions] = useFetch(USER_API);
  const [roomFetchStatus, roomOptions] = useFetch(ROOM_API);

  const [currentRoom, setCurrentRoom] = useState<null | IRoom>(null);
  const [changedRoomID, setChangedRoomID] = useState<null | string>(null);

  const [bookingDates, setBookingDate] = useState({
    checkInDate: "",
    checkOutDate: "",
    nightCount: 0,
  });

  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  // get Current Room
  useEffect(() => {
    if (bookingData?.data?.data) {
      setCurrentRoom(bookingData.data.data.room);
    }
  }, [bookingData?.data?.data]);

  // Initial Form Value
  useEffect(() => {
    if (bookingData?.data?.data) {
      formProps.form?.setFields([
        {
          name: "user",
          value: bookingData.data.data.user.id,
        },
        {
          name: "room",
          value: bookingData.data.data.room.id,
        },
        {
          name: "bookingStatus",
          value: bookingData.data.data.bookingStatus.id,
        },
        {
          name: "paymentStatus",
          value: bookingData.data.data.paymentStatus.id,
        },

        {
          name: "paymentType",
          value: bookingData.data.data.paymentType.id,
        },
      ]);
    }
  }, [bookingData]);

  const dateChangeHandler = (dates: any) => {
    if (dates) {
      const nightCount = Math.floor(
        (dates[1]._d - dates[0]._d) / (1000 * 60 * 60 * 24)
      );

      const checkInDate = dateToYMD(dates[0]._d);
      const checkOutDate = dateToYMD(dates[1]._d);

      setBookingDate({
        checkInDate,
        checkOutDate,
        nightCount,
      });
    }
  };

  const roomChangeHandler = (roomID: string) => {
    setChangedRoomID(roomID);
  };

  const disabledDatesHandler = (current: any) => {
    if (current.isBefore(moment().subtract(1, "day"))) {
      return true;
    }

    let index = disabledDates.findIndex(
      (date) => date === moment(current._d).format("YYYY-MM-DD")
    );

    return index !== -1;
  };

  // change room handler
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(ROOM_API + `/${changedRoomID}`);
        const responseData = await response.json();

        const changedRoom = {
          id: responseData.data.id,
          ...responseData.data.attributes,
        };

        setCurrentRoom(changedRoom);
      } catch (error) {
        console.log(error);
      }
    };

    if (changedRoomID) {
      fetchRoom();
    }
  }, [changedRoomID]);

  // default booking date
  useEffect(() => {
    if (bookingData?.data?.data) {
      const checkInDate = new Date(bookingData.data.data.checkInDate);
      const checkOutDate = new Date(bookingData.data.data.checkOutDate);
      const nightCount = Math.floor(
        (+checkOutDate - +checkInDate) / (1000 * 60 * 60 * 24)
      );

      setBookingDate({
        checkInDate: dateToYMD(checkInDate),
        checkOutDate: dateToYMD(checkOutDate),
        nightCount,
      });
    }
  }, [bookingData?.data?.data]);

  // Current room change
  useEffect(() => {
    if (currentRoom) {
      const fetchBookingOfRoom = async () => {
        const disabledDatesList: string[] = [];
        try {
          const response = await fetch(
            BOOKING_API + `?filters[room][id][$eq]=${currentRoom.id}`
          );
          const responseData = await response.json();

          responseData.data.forEach((booking: any) => {
            const bookingData = booking.attributes;

            for (
              let date = new Date(bookingData.checkInDate);
              date <= new Date(bookingData.checkOutDate);
              date.setDate(date.getDate() + 1)
            ) {
              disabledDatesList.push(dateToYMD(date));
            }
          });

          setDisabledDates(disabledDatesList);
        } catch (error) {
          console.log(error);
        }
      };

      fetchBookingOfRoom();

      changedRoomID &&
        formProps.form?.setFields([
          {
            name: "bookingDates",
            value: null,
          },
        ]);

      changedRoomID &&
        setBookingDate({
          checkInDate: "",
          checkOutDate: "",
          nightCount: 0,
        });
    }
  }, [currentRoom]);

  const saveHandler = () => {
    const save = async () => {
      try {
        const formData = formProps.form?.getFieldsValue(true);
        const response = await fetch(BOOKING_API + `/${bookingID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...formData,
              nightPrice: currentRoom?.nightPrice,
              cleanlinessFee: currentRoom?.cleanlinessFee,
              totalPrice:
                currentRoom &&
                currentRoom.nightPrice * bookingDates.nightCount +
                  currentRoom.cleanlinessFee,
              checkInDate: bookingDates.checkInDate,
              checkOutDate: bookingDates.checkOutDate,
            },
          }),
        });

        if (response.ok) {
          open({
            type: "success",
            message: "Update Booking successfull",
          });

          list("bookings");
        }
      } catch (error) {
        console.log(error);
      }
    };

    save();
  };

  return (
    <Edit
      actionButtons={
        <Button
          style={{
            backgroundColor: "#67be23",
            color: "white",
          }}
          onClick={saveHandler}
        >
          Save
        </Button>
      }
    >
      <Form {...formProps} layout="vertical">
        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="User"
              name="user"
              rules={[
                {
                  required: true,
                },
              ]}
            >
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
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Room"
              name="room"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a room"
                optionFilterProp="children"
                onChange={roomChangeHandler}
              >
                {roomOptions &&
                  roomOptions.data.map((room: any) => (
                    <Option key={room.id} value={room.id}>
                      {room.attributes.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Guest Count"
              name="guestCount"
            >
              <InputNumber max={currentRoom?.guestCount} min={1} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Booking Status"
              name="bookingStatus"
            >
              <Select>
                {bookingStatus.data?.data &&
                  bookingStatus.data?.data.map((status) => (
                    <Option key={status.id} value={status.id}>
                      {status.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Payment Status"
              name="paymentStatus"
            >
              <Select>
                {paymentStatus.data?.data &&
                  paymentStatus.data?.data.map((status) => (
                    <Option key={status.id} value={status.id}>
                      {status.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Payment Type"
              name="paymentType"
            >
              <Select>
                {paymentType.data?.data &&
                  paymentType.data?.data.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item label="Night Price">
              <Title type="secondary" level={5}>
                {currentRoom && formatMoney(currentRoom.nightPrice)}
              </Title>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Cleanliness Fee">
              <Title type="secondary" level={5}>
                {currentRoom && formatMoney(currentRoom.cleanlinessFee)}
              </Title>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Total Price">
              <Title type="secondary" level={5}>
                {currentRoom &&
                  bookingDates.nightCount > 0 &&
                  formatMoney(
                    currentRoom.nightPrice * bookingDates.nightCount +
                      currentRoom.cleanlinessFee
                  )}
              </Title>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            {bookingData?.data?.data && (
              <Form.Item
                label="Check In/Out"
                name="bookingDates"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <RangePicker
                  defaultValue={[
                    moment(bookingData.data.data.checkInDate, dateFormat),
                    moment(bookingData.data.data.checkOutDate, dateFormat),
                  ]}
                  disabledDate={disabledDatesHandler}
                  format={dateFormat}
                  onChange={dateChangeHandler}
                />
              </Form.Item>
            )}
          </Col>

          <Col span={10}>
            <Form.Item label="Night Count">
              <Title type="secondary" level={5}>
                {bookingDates.nightCount}
              </Title>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
