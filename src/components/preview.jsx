import axios from "axios";
import React, { useEffect, useState } from "react";

const Preview = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:8000/api/applicants/");
      setData(response);
    };
    fetch();
  }, []);

  return (
    <div>
      <h2>Preview</h2>
      <p>This is the preview page.</p>
      {data && <div></div>}
    </div>
  );
};

export default Preview;
