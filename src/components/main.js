

import React, { useState, useRef, useEffect, useCallback } from "react";
import useFetch from "../hooks/fetchImages";
import RenderImageList from "./body";
import { Container ,Grid,TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';


function Homepage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list , suggestion } = useFetch(query, page);
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
      <Grid container >
        <Grid item lg = {4} xs = {0}></Grid>
        <Grid item lg = {4} xs = {12}>
        <Autocomplete
          options={suggestion}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
              onChange = {handleChange}
            />
          )}
        />
        </Grid>
        <Grid item  lg = {4} xs = {0}></Grid>
      </Grid>


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
