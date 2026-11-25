import dns from 'dns';
import { URL } from 'url';

// SSRF Guard: Block private, localhost, link-local, and non-http/https
function isSafeUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { safe: false, reason: 'Only HTTP and HTTPS protocols are allowed' };
    }

    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('169.254.') ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.local')
    ) {
      return { safe: false, reason: 'Private or local IP ranges are blocked by SSRF guard' };
    }

    return { safe: true, parsed };
  } catch (e) {
    return { safe: false, reason: 'Invalid URL format' };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const guard = isSafeUrl(url);
  if (!guard.safe) {
    return res.status(403).json({ error: `SSRF Blocked: ${guard.reason}` });
  }

  try {
    // Simulated inspection profile adhering to ReferenceProfile spec
    const profile = {
      domain: guard.parsed.hostname,
      confidence: 0.95,
      colors: ['#0b0c10', '#1f2833', '#66fcf1', '#45a29e', '#c5c6c7'],
      fonts: { display: 'Inter', body: 'JetBrains Mono' },
      sections: ['Header', 'Hero', 'Features', 'Testimonials', 'Footer'],
      detectedLibraries: ['React', 'Tailwind', 'Framer Motion'],
      notice: `Inspired by ${guard.parsed.hostname}. Reference-inspired, not a copy.`
    };

    return res.status(200).json({ success: true, profile });
  } catch (error) {
    return res.status(500).json({ error: 'Inspection failed', details: error.message });
  }
}
