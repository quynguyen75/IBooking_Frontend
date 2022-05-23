import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Star } from "@mui/icons-material";

import RoomItemImage from "./RoomItemImage";
import { yellow } from "@mui/material/colors";

import styles from "./RoomItem.module.css";
import { formatMoney } from "utils/money";

type Props = {
  room: any;
};

function RoomItem({ room }: Props) {
  const min600px = useMediaQuery("(min-width:600px)");

  const reviewCount = room.reviews.data.length;

  const averageStar =
    reviewCount &&
    (
      room.reviews.data.reduce((acc: number, value: any) => {
        const review = value.attributes;

        const star =
          (review.cleanlinessStar +
            review.accuracyStar +
            review.communicationStar +
            review.locationStar +
            review.checkInStar +
            review.valueStar) /
          6;

        return acc + star;
      }, 0) / reviewCount
    ).toFixed(1);

  return (
    <Link to={`/room/${room.id}`}>
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <RoomItemImage images={room.images.data} />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
            }}
          >
            <CardContent className={styles["roomItem__content"]}>
              <div className={styles["roomItem__star"]}>
                <Star
                  style={{
                    color: yellow["A700"],
                  }}
                />
                <span>
                  {averageStar}({reviewCount} {min600px ? " đánh giá" : ""})
                </span>
              </div>

              <div>
                <span>{room.roomType.data.attributes.label}</span> -{" "}
                <span>{room.county}</span>
              </div>

              <div className={styles["roomItem__title"]}>
                <span>{room.title}</span>
              </div>

              <div className={styles["roomItem__price_container"]}>
                <span className={styles["roomItem__price"]}>
                  {formatMoney(room.nightPrice)}
                </span>{" "}
                /<span>đêm</span>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}

export default RoomItem;
