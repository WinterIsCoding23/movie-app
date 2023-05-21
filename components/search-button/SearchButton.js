"use client";

import React, { useState } from "react";

import styles from "./SearchButton.module.css";

import SearchForm from "./SearchForm";

export default function SearchButton(props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={toggle} className={styles.button} type="button">
        <div className={styles.buttonText}>Search</div>
      </button>
      {open && (
        <div className={styles.toggle}>
          <SearchForm />
        </div>
      )}
    </div>
  );
}
