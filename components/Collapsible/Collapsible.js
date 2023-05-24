"use client";

import React, { useState, useRef } from "react";

import styles from "./Collapsible.module.css";

import SearchForm from "./SearchForm";
import SearchResults from "../GetSearchResults/GetSearchResults";

export default function Collapsible(props) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  //Scroll to submitButton
  const paraRef = useRef(null);
  const scrollHandler = () => {
    paraRef.current &&
      paraRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div>
      <button
        onClick={toggle}
        onClickCapture={scrollHandler}
        className={styles.button}
        type="button"
      >
        <div className={styles.buttonText}>Search</div>
      </button>
      <div ref={paraRef} className={styles.searchForm}>
        {open && (
          <div>
            <SearchForm />
          </div>
        )}
      </div>
      {/* Show SearchResults if a search has been done: */}
      {/* {SearchResults && (
        <div>
          <SearchResults />
        </div>
      )} */}
    </div>
  );
}
