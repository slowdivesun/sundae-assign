import InstaSection from "../../components/InstaSection";
import styles from "./insta.module.css";

const InstaPage = () => {
  return (
    <div className={styles["bg-insta"]}>
      <h1>Welcome</h1>
      <div>
        <InstaSection />
      </div>
    </div>
  );
};

export default InstaPage;
