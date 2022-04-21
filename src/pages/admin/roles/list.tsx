import {
  List,
  Table,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";
import useFetch from "hooks/useFetch";
import { IRole } from "interfaces";
import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { formatDate } from "utils/date";

ChartJS.register(ArcElement, Tooltip, Legend);

export const RoleList: React.FC = () => {
  const [status, roleData] = useFetch(
    "http://localhost:1337/api/users-permissions/roles"
  );

  const formatedData =
    roleData &&
    roleData.roles
      .filter((role: IRole) => role.name !== "Public")
      .map((role: IRole) => ({
        ...role,
        createdAt: formatDate(role.createdAt),
        updatedAt: formatDate(role.updatedAt),
      }));

  return (
    <List>
      <Table dataSource={formatedData} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />

        <Table.Column dataIndex="createdAt" title="CreatedAt" />

        <Table.Column dataIndex="updatedAt" title="UpdatedAt" />
      </Table>
    </List>
  );
};
