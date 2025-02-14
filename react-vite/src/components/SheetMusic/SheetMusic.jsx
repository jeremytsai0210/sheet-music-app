import React, { useEffect } from "react";
import VexFlow from "react-vexflow";

const SheetMusic = () => {
  useEffect(() => {
    // You can add additional setup here if needed.
  }, []);

  return (
    <div>
      <h1>Sheet Music</h1>
      <VexFlow
        width={500}
        height={200}
        notes={[
          { keys: ["c/4"], duration: "q" }, // Quarter note on C4
          { keys: ["d/4"], duration: "q" }, // Quarter note on D4
          { keys: ["e/4"], duration: "q" }, // Quarter note on E4
          { keys: ["f/4"], duration: "q" }, // Quarter note on F4
        ]}
      />
    </div>
  );
};

export default SheetMusic;
