# Studio 4.17 — Yayın ve Kurulum Notları

## 1. Ortam değişkenleri (Vercel → Settings → Environment Variables)

Tam liste ve açıklamalar: `.env.example`. Boş bırakılan iletişim kanalı sitede hiç gösterilmez.

| Değişken | Zorunlu mu | Ne işe yarar |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Evet (özel alan adı alınca) | Canonical, sitemap, Open Graph |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Önerilir | Tüm WhatsApp butonları (`905xxxxxxxxx`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Önerilir | Alt bilgi, iletişim, KVKK metni |
| `NEXT_PUBLIC_CONTACT_PHONE` | İsteğe bağlı | Telefon linki |
| `NEXT_PUBLIC_INSTAGRAM_URL` vb. | İsteğe bağlı | Sosyal linkler |
| `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_LEGAL_ADDRESS` | KVKK için gerekli | Veri sorumlusu bilgisi |
| `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` | **Teklif formu için gerekli** | Talepleri ekleriyle e-postayla iletir |
| `QUOTE_WEBHOOK_URL` (+ `QUOTE_WEBHOOK_SECRET`) | İsteğe bağlı | Talepleri Google Sheets / Make'e de kaydeder (dosyasız) |
| `NEXT_PUBLIC_GA_ID` | İsteğe bağlı | GA4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID`, `..._LABEL_QUOTE`, `..._LABEL_WHATSAPP` | İsteğe bağlı | Google Ads dönüşümleri |
| `NEXT_PUBLIC_META_PIXEL_ID` | İsteğe bağlı | Meta Pixel |

Teslim kanalı (Resend veya webhook) tanımlı değilse form **"iletilemedi"** hatası verir ve kullanıcıyı WhatsApp/e-postaya yönlendirir; sahte başarı göstermez.

Resend kurulumu: resend.com → alan adını doğrula (DNS kayıtları) → API anahtarı oluştur → `QUOTE_FROM_EMAIL` bu alan adından olmalı.

## 2. Yayın öncesi kontrol listesi

- [ ] Gerçek WhatsApp numarası, e-posta ve sosyal linkler girildi
- [ ] Resend (veya webhook) kuruldu; canlıda test talebi gönderildi, e-posta ve ek ulaştı
- [ ] Canlıda başarısız gönderim testi: geçici olarak yanlış API anahtarıyla form "iletilemedi" diyor
- [ ] `lib/pricing.js` fiyatları gerçek maliyetlerle güncellendi; `singlePieceWarnMm` yazıcı tablasına göre ayarlandı
- [ ] `data/services.js` yalnızca gerçekten verilen hizmetleri içeriyor (gerekirse `active: false`)
- [ ] Malzeme listesi (TPU, reçine vb.) gerçek ekipmanla uyumlu
- [ ] Portfolyoya en az 3 gerçek iş eklendi; örnek kayıtlar silindi (`data/projects.js`)
- [ ] Ana sayfa ve hizmet görselleri gerçek üretim/atölye fotoğraflarıyla değiştirildi
- [ ] `NEXT_PUBLIC_LEGAL_NAME/ADDRESS` girildi; KVKK, çerez ve şartlar metinleri bir hukukçuya okutuldu
- [ ] `lib/legal.js` içindeki saklama süresi (6 ay) işletmenin gerçek uygulamasıyla aynı
- [ ] Özel alan adı bağlandı, `NEXT_PUBLIC_SITE_URL` güncellendi, vercel.app adresi alan adına yönleniyor
- [ ] Google Search Console: alan adı doğrulandı, `sitemap.xml` gönderildi
- [ ] Google Business Profile: yalnızca gerçek adres/hizmet bölgesiyle açıldı

## 3. Google Ads ve Meta dönüşüm doğrulama

Olaylar (`lib/analytics.js`): `quote_form_start`, `quote_form_submit_success`, `quote_form_submit_error`, `whatsapp_click`, `phone_click`, `email_click`, `calculator_start`, `calculator_success`, `calculator_error`, `file_upload_success`. Kişisel veri gönderilmez. Harici araçlar yalnızca çerez onayından sonra yüklenir.

- **Birincil dönüşüm:** `quote_form_submit_success` → Google Ads "Teklif talebi" (etiket: `NEXT_PUBLIC_GOOGLE_ADS_LABEL_QUOTE`, `transaction_id` = referans no ile tekilleştirilir) ve Meta `Lead` (eventID = referans no).
- **İkincil dönüşüm:** `whatsapp_click` → Google Ads "WhatsApp tıklaması" (etiket: `..._LABEL_WHATSAPP`), Meta `Contact`. Bu bir satış değildir; Ads'te "ikincil" olarak işaretleyin.

Doğrulama adımları:
1. [ ] GA4 → Yönetici → DebugView; siteyi `?debug_mode=1` ile açın, çerezi kabul edin, formu gönderin → olaylar görünür.
2. [ ] GA4'te `quote_form_submit_success` ve `whatsapp_click` "Önemli etkinlik" olarak işaretlendi.
3. [ ] Google Ads → Hedefler → Dönüşümler: iki dönüşüm oluşturuldu, etiketler env'e girildi, Tag Assistant ile test edildi.
4. [ ] Meta Events Manager → Test Events: `PageView`, `Lead`, `Contact` görünüyor.
5. [ ] Çerezi **reddedince** ağ sekmesinde googletagmanager / facebook isteği **olmadığı** doğrulandı.
6. [ ] Reklam kampanyaları hizmet sayfalarına gönderiliyor (`/hizmetler/mimari-maket`, `/ogrenciler`, `/ofisler`), ana sayfaya değil.

## 4. Gerçek portfolyo işi eklemek

`data/projects.js` başındaki talimatlara bakın. Özet: fotoğrafları `public/images/portfolyo/<slug>/` altına koyun, `kind: 'musteri' | 'akademik' | 'kisisel'` olan yeni bir kayıt ekleyin; müşteri adı yalnızca yazılı izinle. Örnek olmayan kayıtlar otomatik olarak sitemap'e girer ve indekslenir.

## 5. Müşteri yorumu eklemek

`data/testimonials.js` — yalnızca gerçek ve yazılı izinli yorumlar. Liste boşken bölüm görünmez.
