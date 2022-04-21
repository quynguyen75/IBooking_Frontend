import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  useForm,
  Create,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Switch,
  Button,
  Select,
} from "@pankod/refine-antd";

import { IGeneral, IRoom, IUser } from "interfaces";
import useFetch from "hooks/useFetch";
import { ROOM_TYPE_API, USER_API } from "constant/resource";

const { TextArea } = Input;
const { Option } = Select;

export const RoomCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IRoom>();

  const [fetchUserStatus, users] = useFetch(USER_API);
  const [fetchRoomTypeStatus, roomTypes] = useFetch(ROOM_TYPE_API);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          wrapperCol={{ span: 14 }}
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14 }} label="Description" name="desc">
          <TextArea
            style={{
              minHeight: "5rem",
            }}
          />
        </Form.Item>

        <Row>
          <Col span={6}>
            <Form.Item
              label="User"
              name="user"
              wrapperCol={{ span: 14 }}
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
                {users &&
                  users.map((user: IUser) => (
                    <Option key={user.id} value={user.id}>
                      {user.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Room Type"
              name="roomType"
              wrapperCol={{ span: 14 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a Room type">
                {roomTypes &&
                  roomTypes.data.map((type: any) => (
                    <Option key={type.id} value={type.id}>
                      {type.attributes.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              wrapperCol={{ span: 16 }}
              label="Night Price"
              name="nightPrice"
              initialValue={0}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
                min={0}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              wrapperCol={{ span: 16 }}
              label="Cleanliness Fee"
              name="cleanlinessFee"
              initialValue={0}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Guest"
              name="guestCount"
              initialValue={0}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Bed"
              name="bedCount"
              initialValue={0}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Living Room"
              name="livingRoomCount"
              initialValue={0}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              wrapperCol={{ span: 14 }}
              label="Bed Room"
              name="bedRoomCount"
              initialValue={0}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item label="Accept Pet" name="acceptPet">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Has Pool" name="hasPool">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Has Wifi" name="hasWifi">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Has Gym" name="hasGym">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Form.Item label="Has Conditioning" name="hasConditioning">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Has Kitchen" name="hasKitchen">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Has Washing Machine" name="hasWashingMachine">
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Has Dedicated Workspace"
              name="hasDedicatedWorkspace"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                },
              ]}
              label="Street"
              name="street"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                },
              ]}
              label="City"
              name="city"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              wrapperCol={{
                span: 16,
              }}
              rules={[
                {
                  required: true,
                },
              ]}
              label="Country"
              name="country"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
