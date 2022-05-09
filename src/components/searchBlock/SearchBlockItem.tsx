import React from "react";

import styles from "./SearchBlockItem.module.css";

type Props = {
  id: number;
  children: JSX.Element;
  tabActive: number;
  setTabActive: (tab: number) => void;
};

type itemStatusTypes = "default" | "inactive" | "active";

let itemStatus: itemStatusTypes = "default";

function SearchBlockItem({ id, children, tabActive, setTabActive }: Props) {
  if (tabActive === 0) itemStatus = "default";
  else if (tabActive === id) itemStatus = "active";
  else itemStatus = "inactive";

  const clickOnHandler = () => setTabActive(id);

  return (
    <div
      className={styles[itemStatus]}
      style={{
        borderRadius: "32px",
      }}
      onClick={clickOnHandler}
    >
      {children}
    </div>
  );
}

export default SearchBlockItem;
