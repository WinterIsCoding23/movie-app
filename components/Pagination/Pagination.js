import styles from "./Pagination.module.css";
import Image from "next/image"; 

export default function Pagination({ page, totalPages, onPageChange }) {
    function backwards() {
      if (page > 1) {
        onPageChange(page - 1);
      }
    }
  
    function forward() {
      if (page < totalPages) {
        onPageChange(page + 1);
      }
    }
  
    return (
        

      <div className={styles.container}>
        <button className={styles.backButton} onClick={backwards}>{            <Image
              src={"/../public/previous.png"}
              width={20}
              height={20}
              alt={"previous"}
            />}</button>
        <p>{page}/{totalPages}</p>
        <button className={styles.forwardButton} onClick={forward}>{            <Image
              src={"/../public/next.png"}
              width={20}
              height={20}
              alt={"next"}
            />}</button>
      </div>
        
    );
  }
  