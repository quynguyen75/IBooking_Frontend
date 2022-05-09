import { TextField, FormControl } from "@mui/material";

import styles from "./CustomerAmount.module.css";

type Props = {
  id: number;
  tabActive: number;
};

function CustomerAmount({ id, tabActive }: Props) {
  const isDisplay = id === tabActive;

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
                    min: 0,
                    defaultValue: 1,
                  },
                }}
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
              />
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomerAmount;
