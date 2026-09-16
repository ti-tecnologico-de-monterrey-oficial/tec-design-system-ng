import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

/**
 * Corre Lighthouse `runs` veces contra una URL y devuelve un resumen con la
 * mediana de LCP (más estable que un solo run, ver recomendación oficial:
 * https://github.com/GoogleChrome/lighthouse/blob/main/docs/variability.md).
 */
export async function auditUrl({ name, url }, { runs = 3, formFactor = 'mobile' } = {}) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });

  const samples = [];
  try {
    for (let i = 0; i < runs; i++) {
      const result = await lighthouse(
        url,
        {
          port: chrome.port,
          onlyCategories: ['performance'],
          formFactor,
          screenEmulation:
            formFactor === 'mobile'
              ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75 }
              : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 },
        },
        undefined
      );

      const { audits, categories } = result.lhr;
      samples.push({
        run: i + 1,
        lcpMs: audits['largest-contentful-paint']?.numericValue ?? null,
        lcpElement: audits['largest-contentful-paint-element']?.details?.items?.[0]?.node?.snippet ?? null,
        fcpMs: audits['first-contentful-paint']?.numericValue ?? null,
        clsScore: audits['cumulative-layout-shift']?.numericValue ?? null,
        tbtMs: audits['total-blocking-time']?.numericValue ?? null,
        performanceScore: categories.performance?.score != null ? categories.performance.score * 100 : null,
      });
    }
  } finally {
    await chrome.kill();
  }

  return { name, url, samples, lcpMs: median(samples.map((s) => s.lcpMs)) };
}

function median(values) {
  const nums = values.filter((v) => typeof v === 'number').sort((a, b) => a - b);
  if (nums.length === 0) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 === 0 ? (nums[mid - 1] + nums[mid]) / 2 : nums[mid];
}
