import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page ) {
  const [suggestion , setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [prevQuery , setPrevQuery] = useState(null);
  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      if(prevQuery !== query)
      {
          setList([]);
          setPrevQuery(query);
          setSuggestions((prev) => [
            ...new Set([...prev, query])
          ]); 
      }
      const url = query === "" ? 
      `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.photos.getRecent&page=${page}&per_page=99` :
      `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&method=flickr.photos.search&text=${query}&page=${page}&per_page=99`
      ; 
      const res = await axios.get(
        url
      );
      console.log(res.data)
      if(res.data && res.data.photos && res.data.photos.photo )
      await setList((prev) => [
        ...new Set([...prev, ...res.data.photos.photo])
      ]);
        //  await setList(res.data.photos.photo);

      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query , page , prevQuery]);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        sendQuery(query);
      }, 1500)
  
      return () => clearTimeout(delayDebounceFn)   


  }, [query, sendQuery , page]);




  return { loading, error, list , suggestion };
}

export default useFetch;
