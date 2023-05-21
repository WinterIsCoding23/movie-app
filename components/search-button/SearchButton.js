"use client";

import React, { useState } from "react";

import styles from "./SearchButton.module.css";

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className={styles.button} type="button">
        <div className={styles.buttonText}>Search</div>
      </button>
      {open && <div>toggle me</div>}
    </div>
  );
}
