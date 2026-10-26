// 3D baskı ön tahmin ayarları. Bütün fiyat ve oranlar yalnızca burada tutulur.
//
// DİKKAT: Bu değerler önceki sürümden taşınmıştır ve gerçek maliyetlerle
// doğrulanmalıdır (filament fiyatı, makine saat maliyeti, hazırlık ücreti).
// Hesaplama bir slicer değildir; model hacminden yaklaşık malzeme ve süre
// tahmini yapar. Bu nedenle sonuç her zaman bir aralık olarak gösterilir.

export const PRICING_VERSION = '2026-10-a';

export const pricing = {
  currency: 'TRY',
  // Hesaplanan tahminin altına/üstüne eklenen pay (aralık gösterimi için)
  rangeLow: 0.85,
  rangeHigh: 1.3,
  setupFee: 15, // ₺ / sipariş başına hazırlık
  machineRatePerMin: 0.15, // ₺ / dakika makine süresi
  minimumOrder: 0, // ₺, 0 = yok
  // Bu ölçüyü aşan parçalar tek parça basılamayabilir; uyarı gösterilir.
  // Kullandığınız yazıcının tabla ölçüsüyle güncelleyin.
  singlePieceWarnMm: 250,
  // Bundan büyük modeller otomatik tahmin yerine manuel teklife yönlendirilir.
  autoEstimateMaxMm: 600,
  maxQuantity: 50,
  filamentDiameterMm: 1.75,
  nozzleMm: 0.4,
  wallThicknessMm: 1.2,
};

// `auto: false` olan malzemeler için otomatik fiyat gösterilmez; teklif istenir.
export const materials = [
  { id: 'pla', name: 'PLA', density: 1.24, pricePerGram: 0.8, auto: true, note: 'Maket parçaları için en yaygın seçenek' },
  { id: 'petg', name: 'PETG', density: 1.27, pricePerGram: 1.0, auto: true, note: 'Daha dayanıklı, hafif esnek' },
  { id: 'abs', name: 'ABS', density: 1.04, pricePerGram: 0.9, auto: true, note: 'Isıya dayanıklı; zımpara ve boyaya uygun' },
  { id: 'tpu', name: 'TPU (esnek)', density: 1.21, pricePerGram: 1.5, auto: false, note: 'Uygunluk teklif aşamasında teyit edilir' },
  { id: 'resin', name: 'Reçine (SLA)', density: 1.1, pricePerGram: 2.0, auto: false, note: 'Uygunluk teklif aşamasında teyit edilir' },
];

export const qualities = [
  { id: 'draft', name: 'Taslak', layer: 0.3, speedMul: 1.3, priceMul: 0.8 },
  { id: 'normal', name: 'Standart', layer: 0.2, speedMul: 1.0, priceMul: 1.0 },
  { id: 'fine', name: 'İnce', layer: 0.1, speedMul: 0.65, priceMul: 1.4 },
];

export const formatTRY = (n) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

// Hacim tabanlı yaklaşık hesap (önceki sürümdeki formülün sadeleştirilmiş hali).
export function estimatePrint(modelData, { materialId, qualityId, infillPercent, quantity }) {
  const mat = materials.find((m) => m.id === materialId);
  const qual = qualities.find((q) => q.id === qualityId);
  if (!mat || !qual || !modelData || !(modelData.volume > 0)) return null;

  const { volume, surfaceArea, dimensions } = modelData;
  const volumeCm3 = volume / 1000;
  const surfaceAreaCm2 = surfaceArea / 100;

  // Dış kabuk ≈ yüzey alanı × duvar kalınlığı; içi dolgu oranı kadar dolu.
  const shellCm3 = Math.min(volumeCm3, surfaceAreaCm2 * (pricing.wallThicknessMm / 10));
  const innerCm3 = Math.max(0, volumeCm3 - shellCm3);
  const printedCm3 = shellCm3 + innerCm3 * (infillPercent / 100);
  const weightGrams = printedCm3 * mat.density;

  // Süre: basılan hacim / (nozul × katman × hız) + katman değişimleri
  const speedMmS = 45 * qual.speedMul;
  const flowMm3S = pricing.nozzleMm * qual.layer * speedMmS;
  const layers = Math.ceil(dimensions.z / qual.layer);
  const printMinutes = (printedCm3 * 1000) / flowMm3S / 60 + (layers * 1.5) / 60;

  const materialCost = weightGrams * mat.pricePerGram;
  const machineCost = printMinutes * pricing.machineRatePerMin;
  const unit = (materialCost + machineCost) * qual.priceMul;
  const qty = Math.max(1, Math.min(pricing.maxQuantity, quantity | 0));
  const total = Math.max(pricing.minimumOrder, unit * qty + pricing.setupFee);

  return {
    weightGrams,
    printMinutes,
    layers,
    qty,
    total,
    low: total * pricing.rangeLow,
    high: total * pricing.rangeHigh,
  };
}
