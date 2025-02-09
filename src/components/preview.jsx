import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../lib/utils";

const userID = getCookie("userID");

const Preview = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:8000/api/${userID}/fetch-data`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      setData(response);
    };
    fetch();
  }, [data]);

  return (
    <div>
      <h2>Preview</h2>
      <p>This is the preview page.</p>
      {data && <div></div>}
    </div>
  );
};

export default Preview;
