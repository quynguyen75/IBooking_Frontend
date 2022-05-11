import { TextField, FormControl } from "@mui/material";
import React from "react";

import styles from "./CustomerAmount.module.css";

type Props = {
  id: number;
  tabActive: number;
  dispatch: React.Dispatch<any>;
};

function CustomerAmount({ id, tabActive, dispatch }: Props) {
  const isDisplay = id === tabActive;

  const guestCountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "GUESTCOUNT",
      payload: +e.target.value,
    });

  const petCountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "PETCOUNT",
      payload: +e.target.value,
    });

  return (
    <>
      <div className="searchBlock__item">
        <button>
          <span className="searchBlock__heading">Khách</span>
          <div>
            <span>Thêm khách</span>
          </div>
        </button>
      </div>

      {isDisplay && (
        <div className={styles.popover}>
          <div>
            <FormControl className={styles["form-control"]}>
              <label htmlFor="guestCount">Số lượng</label>
              <TextField
                type="number"
                id="guestCount"
                InputProps={{
                  inputProps: {
                    max: 20,
                    min: 1,
                    defaultValue: 1,
                  },
                }}
                onChange={guestCountChangeHandler}
              />
            </FormControl>
          </div>

          <div>
            <FormControl className={styles["form-control"]}>
              <label htmlFor="petCount">Thú cưng</label>
              <TextField
                type="number"
                id="petCount"
                InputProps={{
                  inputProps: {
                    max: 20,
                    min: 0,
                    defaultValue: 0,
                  },
                }}
                onChange={petCountChangeHandler}
              />
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerAmount;
