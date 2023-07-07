import InstaSection from "../../components/InstaSection";
import styles from "./insta.module.css";
import InstaHeader from "@/components/InstaHeader";

const InstaPage = () => {
  return (
    <div className={styles["bg-insta"]}>
      <InstaHeader />
      <div>
        <InstaSection />
      </div>
    </div>
  );
};

export default InstaPage;
