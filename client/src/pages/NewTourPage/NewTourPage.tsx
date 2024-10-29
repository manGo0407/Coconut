import React, { useEffect } from "react";
import NewTourForm from "../../components/NewTourForm/NewTourForm";
import styles from "./NewTourForm.module.css";
import Footer from "../../components/Footer/Footer";
export default function NewTourPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <NewTourForm />
      </div>
      <Footer />
    </div>
  );
}
