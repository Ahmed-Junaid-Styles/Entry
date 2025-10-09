import { promises as fs } from "fs";
import path from "path";
import React from "react";

const Tafri = async () => {
  // Build the absolute path to tafri.json
  const filePath = path.join(process.cwd(),"src", "app", "tafri", "tafri.json");

  // Read and parse JSON
  const jsonData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);

  return (
    <div>
      <h1 className="text-xl font-bold">Tafri Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Tafri;
