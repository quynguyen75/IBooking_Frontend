import React from "react";
import { Grid } from "@mui/material";
import TourItem from "./TourItem";

import TourItem1 from "../../assets/img/TourItem1.webp";
import TourItem2 from "../../assets/img/TourItem2.webp";
import TourItem3 from "../../assets/img/TourItem3.webp";
import TourItem4 from "../../assets/img/TourItem4.webp";
import { Link } from "react-router-dom";

const tourList = [
  {
    image: TourItem1,
    backgroundColor: "#bc1a6e",
    content: "Thành phố Hồ Chí Minh",
    link: `/search?county=Hồ+Chí+Minh`,
  },

  {
    image: TourItem2,
    backgroundColor: "#cc2d4a",
    content: "Thành phố Long Xuyên",
    link: `/search?county=Long+Xuyên`,
  },

  {
    image: TourItem3,
    backgroundColor: "#d93b30",
    content: "Thành phố Tân An",
    link: `/search?county=Tân+An`,
  },

  {
    image: TourItem4,
    backgroundColor: "#de3151",
    content: "Thành phố Đà Lạt",
    link: `/search?county=Đà+Lạt`,
  },
];

type Props = {};

function TourList({}: Props) {
  return (
    <Grid container direction="row" spacing={2}>
      {tourList.map((tour) => (
        <Grid item xs={12} sm={6} key={tour.content}>
          <Link to={tour.link}>
            <TourItem {...tour} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default TourList;
