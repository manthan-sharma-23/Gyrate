import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const [searchCode, setSearchCode] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    setSearchCode(code as string);
    // You can now use the code parameter for further processing (e.g., sending it to the server for authentication)
  }, [location]);
  return <div>{searchCode}</div>;
};

export default Callback;
