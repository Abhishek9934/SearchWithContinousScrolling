

import React, { useState, useRef, useEffect, useCallback } from "react";
import useFetch from "../hooks/fetchImages";
import RenderImageList from "./body";

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  input: {
    border: '1px solid black',
    marginLeft: theme.spacing(1),
    flex: 1,
    width: 500
  },


}));

function Homepage() {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page);
  const loader = useRef(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  console.log("app" ,list);
  return (
    <div className="App">
      <h1>Search Images</h1>      
       <InputBase
        type="text"
        className={classes.input}
        placeholder=" Search Images"
        inputProps={{ 'aria-label': 'search' }}
        value={query}
        onChange={handleChange}
      />

      <Container>
        <br>
        </br>
         <RenderImageList imageData={list} />
      </Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  );
}

export default Homepage;
