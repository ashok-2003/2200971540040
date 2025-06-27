import { useState } from "react";
import { createShortUrl } from "../api";

type Form = {
  url: string;
  validity: string;
  shortcode: string;
};

type Result = {
  shortLink: string;
  expiry: string;
};

export const ShortenerForm = () => {
  const [forms, setForms] = useState<Form[]>([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState<Result[]>([]);

  const handleChange = (i: number, key: keyof Form, value: string) => {
    const updated = [...forms];
    updated[i][key] = value;
    setForms(updated);
  };

  const addForm = () => {
    if (forms.length >= 5) return;
    setForms([...forms, { url: "", validity: "", shortcode: "" }]);
  };

  const handleSubmit = async () => {
    const newResults: Result[] = [];
    for (const form of forms) {
      if (!form.url.startsWith("http")) {
        alert("Invalid URL. Must start with http or https.");
        return;
      }

      const payload: any = { url: form.url };
      if (form.validity) payload.validity = Number(form.validity);
      if (form.shortcode) payload.shortcode = form.shortcode;

      try {
        const res = await createShortUrl(payload);
        newResults.push(res);
      } catch (err) {
        alert("Failed to shorten URL");
      }
    }
    setResults(newResults);
  };

  return (
    <div>
      <h2>Shorten URLs</h2>
      {forms.map((form, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <input
            placeholder="Long URL"
            value={form.url}
            onChange={(e) => handleChange(i, "url", e.target.value)}
          />
          <input
            placeholder="Shortcode (optional)"
            value={form.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (min)"
            value={form.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
          />
        </div>
      ))}
      {forms.length < 5 && <button onClick={addForm}>Add More</button>}
      <br />
      <button onClick={handleSubmit}>Shorten</button>

      <hr />
      {results.map((r, i) => (
        <div key={i}>
          <p>
            Short URL: <a href={r.shortLink}>{r.shortLink}</a>
          </p>
          <p>Expires at: {r.expiry}</p>
        </div>
      ))}
    </div>
  );
};


