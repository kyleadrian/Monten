import React from "react";
import requireAuth from "../requireAuth";

export default requireAuth(() => {
  return <div>Knowledge Center Coming Soon!</div>;
});
