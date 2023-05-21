"use client";

import React, { useState } from "react";

import styles from "./SearchButton.module.css";

export default function SearchButton() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={toggle} className={styles.button} type="button">
        <div className={styles.buttonText}>Search</div>
      </button>
      {open && <div className={styles.toggle}>toggle</div>}
    </div>
  );
}
