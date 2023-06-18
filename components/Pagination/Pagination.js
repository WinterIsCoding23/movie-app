"use client";

import { useState } from "react";

import styles from "./Pagination.module.css";
import Image from "next/image"; 

export default function Pagination({ data, isLoading, page, totalPages, onPageChange }) {
// const [isLoading, setIsLoading] = useState(false);

    function backwards() {
      if (page > 1) {
        onPageChange(page - 1);
      }
      isLoading = true; 
    }
  
    function forward() {
      if (page < totalPages) {
        onPageChange(page + 1);
      }
    }
    console.log("data: ", data);
  
    return (      
        <div className={styles.container}>
            <button className={styles.backButton} disabled={isLoading} onClick={backwards}>{            
                <Image
                src={"/../public/previous.png"}
                width={20}
                height={20}
                alt={"previous"}
                />}</button>
            <p>{page}/{totalPages}</p>
            <button className={styles.forwardButton} disabled={isLoading} onClick={forward}>{            
                <Image
                src={"/../public/next.png"}
                width={20}
                height={20}
                alt={"next"}
                />}</button>
                {isLoading && <p>Loading data...</p>}
        </div>        
    );
  }
  