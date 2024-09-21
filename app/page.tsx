"use client"
import { useState } from "react";
interface sa {
  name: string,
}
export default function Home() {
  const [data, setData] = useState<sa>({ name: "" });
  const loadData = async () => {
    const res = await fetch("/api");
    const d = await res.json();
    setData(d);
  }


  return (
    <div >
      <button onClick={loadData}> la</button>
      <div>
        {data.name}
      </div>
    </div>
  );
}

