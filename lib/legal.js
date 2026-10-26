// Yasal metinlerde kullanılan bilgiler. Hukuki inceleme yapılmadan "uyumlu"
// olduğu iddia edilmemelidir. Veri sorumlusunun tam adı/unvanı ve adresi
// KVKK aydınlatma metni için gereklidir; ortam değişkeninden verilir.

export const legal = {
  // Şahıs işletmesi ise ad soyad, şirket ise ticari unvan
  controllerName: process.env.NEXT_PUBLIC_LEGAL_NAME || null,
  controllerAddress: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || null,
  // Sonuçlanmayan teklif taleplerinin ve dosyaların saklama süresi (ay) — işletme tarafından doğrulanmalı
  quoteRetentionMonths: 6,
  lastUpdated: '26 Ekim 2026',
};
