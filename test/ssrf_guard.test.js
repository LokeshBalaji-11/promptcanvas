import test from 'node:test';
import assert from 'node:assert';

// Import or replicate isSafeUrl logic for unit testing
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

test('SSRF Guard: blocks localhost', () => {
  const res = isSafeUrl('http://localhost:3000/admin');
  assert.strictEqual(res.safe, false);
});

test('SSRF Guard: blocks loopback IP 127.0.0.1', () => {
  const res = isSafeUrl('http://127.0.0.1/secret');
  assert.strictEqual(res.safe, false);
});

test('SSRF Guard: blocks link-local 169.254.x.x', () => {
  const res = isSafeUrl('http://169.254.169.254/latest/meta-data/');
  assert.strictEqual(res.safe, false);
});

test('SSRF Guard: blocks private range 10.x.x.x', () => {
  const res = isSafeUrl('http://10.0.0.1/internal');
  assert.strictEqual(res.safe, false);
});

test('SSRF Guard: blocks file:// protocol', () => {
  const res = isSafeUrl('file:///etc/passwd');
  assert.strictEqual(res.safe, false);
});

test('SSRF Guard: allows legitimate external HTTPS URL', () => {
  const res = isSafeUrl('https://stripe.press/about');
  assert.strictEqual(res.safe, true);
});
