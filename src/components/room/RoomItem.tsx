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

type Props = {};

function RoomItem({}: Props) {
  const min600px = useMediaQuery("(min-width:600px)");
  return (
    <Link to="/room/1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <RoomItemImage />
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
                <span>5,0(7{min600px ? " đánh giá" : ""})</span>
              </div>

              <div>
                <span>Phòng riêng</span> - <span>Thành phố Hồ Chí Minh</span>
              </div>

              <div className={styles["roomItem__title"]}>
                <span>Home away from home. Clean and modern studio.</span>
              </div>

              <div className={styles["roomItem__roomCount"]}>
                <span>2 khách</span>
                <span>1 phòng ngủ</span>
                <span>1 giường</span>
                <span>1 phòng tắm</span>
              </div>

              <div className={styles["roomItem__amenities"]}>
                <span>Wifi</span>
                <span>Bếp</span>
                <span>Máy giặt</span>
              </div>

              <div className={styles["roomItem__price_container"]}>
                <span className={styles["roomItem__price"]}>100,000đ</span> /
                <span>đêm</span>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}

export default RoomItem;
