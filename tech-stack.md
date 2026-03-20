# ⚙️ Grimoire — Teknoloji Yığını

---

## Mimari

```
[Kullanıcı Tarayıcısı]
        │
        ▼
[Next.js 14 Frontend + API Routes]
        │
        ▼
[OpenRouter API → Gemini 2.0 Flash Lite]
        │
        ▼
[localStorage + Web Audio API]
        │
        ▼
[Vercel Deploy]
```

---

## Teknolojiler

### Next.js 14 (App Router)
Hem frontend hem backend tek projede. API Route'ları sayesinde API anahtarı tarayıcıya çıkmaz. Vercel'e tek tıkla deploy edilir.

### TypeScript
Tip güvenli kod. Geliştirirken hata yakalamayı kolaylaştırır.

### Tailwind CSS
Karanlık tema için hızlı stil yönetimi. Gotik tasarım öğeleri ve özel animasyonlar.

### Gemini API (OpenRouter üzerinden)
**Neden OpenRouter?** Google AI Studio'nun Türkiye'deki free tier kısıtlaması nedeniyle OpenRouter üzerinden Gemini modeline erişildi.

**Model:** `google/gemini-2.0-flash-lite-001`

**AI'ın ürettiği içerik:**
- Tamamlanma oranına göre farklı uzunlukta hikaye bölümleri
- Her bölümün sonunda 2 seçenekli karar noktası
- Önceki seanstaki kararı bağlam olarak alır
- Kullanıcının kazandığı eşyaları hikayeye yansıtır

### Web Audio API
İki farklı amaçla kullanılır:

**1. Bildirim sesi** — Seans bitiminde Do-Mi-Sol akoru

**2. Ortam sesleri** — 7 farklı ses, tamamen procedural olarak tarayıcıda üretilir, hiç dosya yok:
- 🎵 Lo-fi: Brown noise + pentatonik triangle wave notalar
- 🔥 Şömine: Brown/pink noise katmanları + bandpass filtreli odun çıtırtısı
- 🌧️ Yağmur: Pink noise + bandpass (cama çarpan his) + damla tınıları + akan su
- 🌊 Okyanus: Brown noise + LFO modülasyonu (dalga ritmi)
- 🌲 Orman: Pink noise rüzgar + nadir kuş cıvıltıları
- ✨ Büyü: Sine drone + kristal frekanslar (528, 639, 741 Hz...)
- ⚗️ İksir: Brown noise kazan + yükselen frekanslı kabarcıklar + karıştırma

### localStorage
Veritabanı gerektirmeden kalıcı veri:

| Anahtar | İçerik |
|---------|--------|
| `grimoire_xp` | Toplam XP |
| `grimoire_last_choice` | Son hikaye seçimi |
| `grimoire_sessions` | Tüm seans geçmişi |
| `grimoire_total_choices` | Toplam seçim sayısı |

---

## Proje Yapısı

```
grimoire/
├── app/
│   ├── page.tsx              # Ana sayfa
│   ├── session/page.tsx      # Seans ekranı
│   ├── history/page.tsx      # Seans geçmişi
│   ├── map/page.tsx          # Harita sayfası
│   └── api/chapter/route.ts  # Gemini API route
├── components/
│   ├── XPBar.tsx             # XP ve seviye barı (50 seviye)
│   ├── Inventory.tsx         # 100 eşyalık envanter (7 kategori)
│   ├── Map.tsx               # 50 lokasyonlu harita paneli
│   ├── AmbientPlayer.tsx     # 7 ortam sesi
│   └── Achievements.tsx      # 100 başarım paneli (6 kategori)
├── lib/
│   ├── items.ts              # 100 eşya tanımları
│   ├── locations.ts          # 50 lokasyon tanımları
│   └── achievements.ts       # 100 başarım tanımları
├── .env.local                # API anahtarı
└── package.json
```

---

## Oyunlaştırma Sistemleri

### 50 Seviye
Çırak → Gölge Öğrencisi → Arkanist → Umbra Efendisi → Grimoire Tanrısı → Grimoire Ustası

### 100 Eşya (7 Kategori)
| Kategori | Adet | XP Aralığı |
|----------|------|------------|
| 🕯️ Işık | 14 | 50 → 60K |
| 📜 Bilgi | 14 | 100 → 80K |
| ⚗️ Simya | 14 | 150 → 90K |
| ⚔️ Savaş | 14 | 250 → 100K |
| 👁️ Karanlık | 14 | 400 → 160K |
| 🌿 Doğa | 15 | 75 → 100K |
| 🐉 Ejderha | 15 | 500 → 250K |

### 50 Lokasyon (6 Bölge)
Başlangıç → Bilgi → Simya → Gölge → Kale → Öteki Dünya

### 100 Başarım (6 Kategori)
| Kategori | Adet |
|----------|------|
| ⏱️ Zaman & Seans | 17 |
| ⚡ XP & Seviye | 17 |
| 🎒 Envanter | 17 |
| 🗺️ Harita | 16 |
| 📖 Hikaye & Seçim | 17 |
| 🔮 Gizli | 16 |

---

## Ortam Değişkenleri

```env
GEMINI_API_KEY=sk-or-...  # OpenRouter API anahtarı
```

---

## Paket Listesi

| Paket | Amaç |
|-------|------|
| next@14 | Framework |
| typescript | Tip güvenliği |
| tailwindcss | Stil |
| @google/generative-ai | Kurulu (OpenRouter fetch ile kullanılıyor) |
