import express from 'express';
import dotenv from 'dotenv';
// import { log } from 'middleware';
import { urlStore, } from './store';
import { generateCode } from './utils';

dotenv.config();
const app = express();
app.use(express.json());

// 1) Create Short URL
app.post('/shorturls', async (req : any, res : any) => {
  const { url, validity = 30, shortcode } = req.body as {
    url: string;
    validity?: number;
    shortcode?: string;
  };

  // basic validation
  if (!url || !/^https?:\/\//.test(url)) {
    // await log('backend','error','controller','Invalid URL');
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let code = shortcode || generateCode(6);
  if (urlStore[code]) {
    // await log('backend','warn','controller',`Code collision: ${code}`);
    return res.status(409).json({ error: 'Shortcode already in use' });
  }

  urlStore[code] = {
    originalUrl: url,
    createdAt : Date.now(),
    expiresAt: Date.now() + validity * 60000,
    clicks: []
  };

//   await log('backend','info','controller',`Created ${code}`);
  res.status(201).json({
    shortLink: `${req.protocol}://${req.get('host')}/${code}`,
    expiry: new Date(urlStore[code].expiresAt).toISOString()
  });
});

// 2) Redirect
app.get('/:code', async (req: any, res : any) => {
  const { code } = req.params;
  const record = urlStore[code];

  if (!record || record.expiresAt < Date.now()) {
    // await log('backend','error','route',`Not found/expired: ${code}`);
    return res.status(404).json({ error: 'Not found or expired' });
  }

  record.clicks.push({ at: Date.now(), referrer: req.get('referer') || undefined });
//   await log('backend','info','route',`Redirect ${code}`);

  return res.redirect(record.originalUrl);
});

// 3) Stats
app.get('/shorturls/:code', async (req: any, res: any) => {
  const { code } = req.params;
  const record = urlStore[code];
  if (!record) {
    // await log('backend','error','controller',`Stats not found: ${code}`);
    return res.status(404).json({ error: 'Not found' });
  }

//   await log('backend','info','controller',`Stats retrieved: ${code}`);
  res.json({
    shortLink: `${req.protocol}://${req.get('host')}/${code}`,
    originalUrl: record.originalUrl,
    createdAt: new Date(record.createdAt).toISOString,
    expiry: new Date(record.expiresAt).toISOString(),
    totalClicks: record.clicks.length,
    clickData: record.clicks.map(c => ({ clickedAt: new Date(c.at).toISOString(), referrer: c.referrer }))
  });
});

// Start on port 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
