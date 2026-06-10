import React from "react";

import StandardButton from "../../components/buttons/ButtonStandard";

export default function Test() {
  return (
    <div>
      <h1>Test Page</h1>
      <StandardButton title={"Go Home"} linkTo={""} />
    </div>
  );
}