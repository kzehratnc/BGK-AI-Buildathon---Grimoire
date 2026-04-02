# 📋 Grimoire — Ürün Gereksinim Belgesi (PRD)

---

## 1. Ürün Özeti

**Ürün Adı:** Grimoire  
**Versiyon:** 1.0  
**Hedef Kitle:** Üniversite öğrencileri (18–26 yaş), özellikle mühendislik, fen ve matematik bölümleri  
**Platform:** Web uygulaması (masaüstü ve mobil tarayıcı)

---

## 2. Problem

Kalkülüs, fizik, kimya gibi yüksek bilişsel yük gerektiren derslere çalışırken uzun süre odaklanmak zordur. Mevcut çözümler:

- **Pomodoro sayaçları** — Sıkıcı, ödüllendirmiyor
- **Yapılacaklar listeleri** — Motivasyon sağlamıyor
- **Genel AI asistanlar** — Odaklanma odaklı değil

**Sonuç:** Erken bırakma, düşük motivasyon, verimsiz çalışma seansları.

---

## 3. Çözüm

Grimoire, çalışma sürelerini karanlık bir fantezi dünyasının keşfine dönüştüren, yapay zeka destekli bir odaklanma uygulamasıdır. Her seans sonunda Gemini AI atmosferik bir hikaye bölümü üretir; kullanıcının seçimleri hikayeyi şekillendirir ve oyunlaştırma sistemi uzun vadeli motivasyon sağlar.

---

## 4. Temel Özellikler

### 4.1 Zamanlayıcı Modları

| Mod | Açıklama |
|-----|----------|
| 🍅 Pomodoro | Özelleştirilebilir çalışma/mola süresi. Her tur sonunda hikaye gelir. |
| ⏱️ Geri Sayım | Sabit süre belirle (25/45/60 dk veya özel). Bitince hikaye al. |
| ⏲️ Kronometre | Yukarı sayan sayaç. Seansı bitirince XP kazan. |

### 4.2 AI Hikaye Motoru

- **Model:** Gemini 2.0 Flash Lite (OpenRouter üzerinden)
- **Girdi:** Çalışılan konu, geçen süre, tamamlanma oranı, önceki seçim, kazanılan eşyalar
- **Çıktı:** Atmosferik hikaye bölümü + 2 seçenekli karar noktası
- **Uyarlanabilirlik:**
  - %50 altı tamamlanma → Kısa, yarım hikaye
  - %50–99 → Orta uzunlukta hikaye
  - %100 → Tam ve tatmin edici hikaye

### 4.3 Oyunlaştırma Sistemi

| Sistem | Detay |
|--------|-------|
| XP | Dakika × 10, minimum 5 XP |
| Seviye | 50 seviye: Çırak → Grimoire Ustası |
| Envanter | 100 eşya, 7 kategori, XP ile açılır |
| Harita | 50 lokasyon, hikaye seçimleriyle açılır |
| Başarımlar | 100 başarım, 6 kategori (16 gizli) |

### 4.4 Ortam Sesleri

7 farklı ses, Web Audio API ile tarayıcıda procedural olarak üretilir:
Lo-fi, Şömine, Yağmur, Okyanus, Orman, Büyü, İksir

### 4.5 Seans Geçmişi

Tüm seanslar kaydedilir: konu, süre, XP, tamamlanma oranı, hikaye önizlemesi.

---

## 5. Kullanıcı Akışı

```
Ana Sayfa → Mod Seç → Konu Gir → Başlat → Çalış
    → Seans Biter → AI Hikaye Üretir → Seçim Yap
    → XP Kazan → Eşya/Lokasyon/Başarım Aç → Ana Sayfa
```

---

## 6. Teknik Gereksinimler

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Gemini API (OpenRouter üzerinden)

### Veri Depolama
- localStorage (XP, seanslar, seçimler, envanter durumu)
- Veritabanı gerektirmez

### Ses
- Web Audio API (harici dosya yok, tamamen procedural)

### Deploy
- Vercel (ücretsiz plan)

---

## 7. Ekranlar

| Ekran | Yol | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `/` | Karanlık landing, mod ve navigasyon |
| Seans | `/session` | Zamanlayıcı, hikaye, seçimler |
| Geçmiş | `/history` | Tüm seans kayıtları |
| Harita | `/map` | Umbra dünyası lokasyonları |

### Kalıcı UI Elemanları (tüm sayfalarda)
- ⚡ XPBar — Sağ alt, seviye ve XP barı
- 🎒 Envanter paneli — 100 eşya
- 🗺️ Harita paneli — 50 lokasyon
- 🔇 Ortam sesi — 7 ses + ses seviyesi
- 🏆 Başarımlar — 100 başarım

---

## 8. Başarı Kriterleri

| Metrik | Hedef |
|--------|-------|
| Ortalama seans süresi | ≥ 25 dakika |
| Hikaye seçim oranı | ≥ %80 |
| Geri dönüş oranı | ≥ %60 |
| Kullanıcı memnuniyeti | "Çalışmak için heyecanlandım" geri bildirimi |

---

## 9. Kapsam Dışı (v1.0)

- Kullanıcı hesabı / veritabanı (localStorage kullanılıyor)
- Çok kullanıcılı / sosyal özellikler
- Mobil uygulama (PWA olarak çalışır)
- Ödeme sistemi

---

## 10. Gelecek Versiyonlar

- Kullanıcı hesabı ve bulut senkronizasyon
- Arkadaş sistemi ve liderlik tablosu
- Haftalık istatistik özeti
- Farklı tema seçenekleri
- Mobil uygulama (React Native)
