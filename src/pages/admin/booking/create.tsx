import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  useForm,
  Create,
  Form,
  Input,
  Row,
  Select,
  Col,
  InputNumber,
  Typography,
  DatePicker,
} from "@pankod/refine-antd";

import { IBooking, IRoom, IUser } from "interfaces";
import {
  BOOKING_API,
  BOOKING_STATUS_API,
  PAYMENT_STATUS_API,
  PAYMENT_TYPE_API,
  ROOM_API,
  USER_API,
} from "constant/resource";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { formatMoney } from "utils/money";
import { dateToYMD } from "utils/date";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";

const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export const BookingCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IBooking>();

  const [userFetchStatus, userOptions] = useFetch(USER_API);
  const [roomFetchStatus, roomOptions] = useFetch(ROOM_API);
  const [_, bookingStatus] = useFetch(BOOKING_STATUS_API);
  const [__, paymentStatus] = useFetch(PAYMENT_STATUS_API);
  const [paymentTypeFetchStatus, paymentType] = useFetch(PAYMENT_TYPE_API);

  const [currentRoom, setCurrentRoom] = useState<null | IRoom>(null);

  const [bookingDates, setBookingDate] = useState({
    checkInDate: "",
    checkOutDate: "",
    nightCount: 0,
  });

  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  const roomChangeHandler = (roomID: string) => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(ROOM_API + `/${roomID}`);
        const roomData = await response.json();

        setCurrentRoom({
          id: roomData.data.id,
          ...roomData.data.attributes,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoom();
  };

  const dateChangeHandler = (dates: any) => {
    if (dates) {
      const nightCount = Math.floor(
        (dates[1].$d - dates[0].$d) / (1000 * 60 * 60 * 24)
      );

      console.log(dates);

      const checkInDate = dateToYMD(dates[0].$d);
      const checkOutDate = dateToYMD(dates[1].$d);

      setBookingDate({
        checkInDate,
        checkOutDate,
        nightCount,
      });
    }
  };

  const disabledDatesHandler = (current: any) => {
    if (current.isBefore(moment().subtract(1, "day"))) {
      return true;
    }

    let index = disabledDates.findIndex(
      (date) => date === moment(current.$d).format("YYYY-MM-DD")
    );
    return index !== -1;
  };

  useEffect(() => {
    if (bookingStatus) {
      formProps.form?.setFields([
        {
          name: "bookingStatus",
          value: bookingStatus.data[0].id,
        },
      ]);
    }
  }, [bookingStatus]);

  useEffect(() => {
    if (paymentStatus) {
      formProps.form?.setFields([
        {
          name: "paymentStatus",
          value: paymentStatus.data[0].id,
        },
      ]);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (paymentType) {
      formProps.form?.setFields([
        {
          name: "paymentType",
          value: paymentType.data[0].id,
        },
      ]);
    }
  }, [paymentType]);

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

      formProps.form?.setFields([
        {
          name: "bookingDates",
          value: null,
        },
      ]);
    }
  }, [currentRoom]);

  return (
    <Create saveButtonProps={saveButtonProps}>
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
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={1}
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
                {bookingStatus &&
                  bookingStatus.data.map((status: any) => (
                    <Option key={status.id} value={status.id}>
                      {status.attributes.name}
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
                {paymentStatus &&
                  paymentStatus.data.map((status: any) => (
                    <Option key={status.id} value={status.id}>
                      {status.attributes.name}
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
                {paymentType &&
                  paymentType.data.map((type: any) => (
                    <Option key={type.id} value={type.id}>
                      {type.attributes.name}
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
                  bookingDates.checkInDate &&
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
                disabled={currentRoom ? false : true}
                format={dateFormat}
                onChange={dateChangeHandler}
                disabledDate={disabledDatesHandler}
              />
            </Form.Item>
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
    </Create>
  );
};
