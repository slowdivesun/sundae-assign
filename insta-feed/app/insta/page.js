import { Typography } from "@mui/material";
import InstaSection from "../../components/InstaSection";
import styles from "./insta.module.css";

const InstaPage = () => {
  return (
    <div className={styles["bg-insta"]}>
      <Typography variant='h3' gutterBottom>
        Welcome
      </Typography>
      <div>
        <InstaSection />
      </div>
    </div>
  );
};

export default InstaPage;
