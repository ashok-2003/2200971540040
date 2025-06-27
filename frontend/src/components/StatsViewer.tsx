import { useState } from "react";
import { getShortUrlStats } from "../api";

export const StatsViewer = () => {
  const [code, setCode] = useState("");
  const [data, setData] = useState<any>(null);

  const fetchStats = async () => {
    try {
      const res = await getShortUrlStats(code);
      setData(res);
    } catch {
      alert("Shortcode not found or expired.");
    }
  };

  return (
    <div>
      <h2>URL Statistics</h2>
      <input placeholder="Enter Shortcode" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={fetchStats}>Get Stats</button>
      {data && (
        <div>
          <p><b>Short URL:</b> {data.shortLink}</p>
          <p><b>Original URL:</b> {data.originalUrl}</p>
          <p><b>Created At:</b> {data.createdAt}</p>
          <p><b>Expiry:</b> {data.expiry}</p>
          <p><b>Total Clicks:</b> {data.totalClicks}</p>
          <h4>Click Data:</h4>
          <ul>
            {data.clickData.map((click: any, idx: number) => (
              <li key={idx}>
                {click.clickedAt} | Referrer: {click.referrer || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
