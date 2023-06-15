import React, { useContext } from "react";
import systemContext from "../context";

const DatesHeader = () => {
  const contextData = useContext(systemContext);
  return <div>لديك {contextData.system.dates.length} موعد اليوم</div>;
};

export default DatesHeader;
