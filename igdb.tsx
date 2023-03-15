import { useState, useEffect } from "react";
import axios from "axios";

function useIGDB(endpoint:any) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "POST",
        url: "https://api.igdb.com/v4/" + endpoint,
        headers: {
          Accept: "application/json",
          "Client-ID": "hlearexfpaklsnmqpj4n06zx3ibqi9",
          Authorization: "Bearer sqem5h1eoai5lhv5kos7qgltyyscbr",
        },
        data: "fields *; limit 10;",
      });
      setData(result.data);
    };
    fetchData();
  }, [endpoint]);

  return data;
}

export default useIGDB;