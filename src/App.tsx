import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/search?q=coldplay`);
      const data = await res.json();
      console.log(data);
    }

    fetchData();
  }, []);

  return <h1>Music Player</h1>;
}

