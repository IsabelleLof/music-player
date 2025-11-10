import { useEffect, useState } from "react";
import { useAudio } from "react-use";
import "./App.css";

type DeezerTrack = {
  id: number;
  title: string;
  preview: string;         // 30s mp3
  duration: number;        // sekunder
  artist: { name: string };
  album: { cover: string };
};

export default function App() {
  const [track, setTrack] = useState<DeezerTrack | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/search?q=coldplay`);
      const json = await res.json();
      const first: DeezerTrack | undefined = json?.data?.[0];
      if (first?.preview) setTrack(first);
    }
    fetchData();
  }, []);

  const [audio, state, controls] = useAudio(
    track?.preview
      ? { src: track.preview, autoPlay: false, preload: "metadata" }
      : { src: "" }
  );

  const fmt = (s: number | undefined) => {
    if (!Number.isFinite(s)) return "0:00";
    const m = Math.floor((s as number) / 60);
    const sec = Math.floor((s as number) % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="app">
      <h1>Music Player</h1>

      {!track && <p>Söker låt…</p>}

      {track && (
        <div className="card">
          <div className="track">
            <img
              className="cover"
              src={track.album.cover}
              alt={track.title}
              width={64}
              height={64}
            />
            <div className="meta">
              <div className="title">{track.title}</div>
              <div className="artist">{track.artist.name}</div>
            </div>
          </div>

          <div className="status">
            Status: <strong>{state.paused ? "Pausad" : "Spelar"}</strong> · Tid:{" "}
            {fmt(state.time)} / {fmt(state.duration)}
          </div>

          <div className="controls">
            <button onClick={controls.play}>Play</button>
            <button onClick={controls.pause}>Pause</button>
          </div>

          {/* useAudio returnerar ett färdigt <audio>-element */}
          <div className="sr-only">{audio}</div>
        </div>
      )}
    </div>
  );
}


