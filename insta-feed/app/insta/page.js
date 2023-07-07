import { Typography } from "@mui/material";
import InstaSection from "../../components/InstaSection";
import styles from "./insta.module.css";

const InstaPage = () => {
  return (
    <div className={styles["bg-insta"]}>
      <div>
        <InstaSection />
      </div>
    </div>
  );
};

export default InstaPage;
