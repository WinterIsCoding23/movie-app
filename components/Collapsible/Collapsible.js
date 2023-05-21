"use client";

import React, { useState } from "react";

import styles from "./Collapsible.module.css";

import SearchForm from "./SearchForm";

export default function Collapsible(props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={toggle} className={styles.button} type="button">
        <div className={styles.buttonText}>Search</div>
      </button>
      <div className={styles.searchForm}>
        {open && (
          <div>
            <SearchForm />
          </div>
        )}
      </div>
    </div>
  );
}
