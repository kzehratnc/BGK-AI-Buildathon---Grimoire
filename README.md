# 📖 Grimoire — Odaklanmayı Maceraya Dönüştür

> *"Her dakika, karanlık dünyanı genişletir."*

#Canlı Demo Linki:
https://ai-buildathon-grimoire.vercel.app/
---

## Problem

Kalkülüs, fizik gibi yoğun analitik derslere uzun süre odaklanmak zordur. Geleneksel Pomodoro sayaçları sıkıcıdır ve çalışmayı ödüllendirmez. Sonuç: erken bırakma, düşük motivasyon, verimsiz çalışma seansları.

---

## Çözüm

**Grimoire**, çalışma sürelerini karanlık bir fantezi dünyasının keşfine dönüştüren, yapay zeka destekli bir odaklanma uygulamasıdır.

Kullanıcı mod seçer, çalışır — seans bitince Gemini AI atmosferik bir hikaye bölümü üretir. Hikayenin sonunda 2 seçenekli karar noktası çıkar, seçim bir sonraki seansta hikayeye yansır. Her seans XP kazandırır; 50 seviye, 100 eşya, 50 lokasyonlu Umbra dünyası ve 100 başarım sistemiyle uzun vadeli motivasyon sağlar.

---

## Özellikler

- **🍅 Pomodoro Modu** — Özelleştirilebilir çalışma/mola süresi. Her tur sonunda hikaye gelir.
- **⏱️ Geri Sayım Modu** — Sabit süre belirle, bitince hikaye al.
- **⏲️ Kronometre Modu** — Ne kadar çalışırsan o kadar XP.
- **🔔 Bildirim Sesi** — Her süre dolduğunda Do-Mi-Sol akoru.
- **📖 AI Hikaye Motoru** — Gemini API ile üretilen, tamamlanma oranına, seçimlere ve kazanılan eşyalara göre uyarlanan hikayeler.
- **⚔️ İnteraktif Seçimler** — Her seans sonunda 2 seçenek, bir sonraki seansta hikayeye yansır.
- **⚡ 50 Seviye Sistemi** — Çırak'tan Grimoire Ustası'na karma unvanlar.
- **🎒 100 Eşya Envanteri** — 7 kategoride eşyalar (Işık, Bilgi, Simya, Savaş, Karanlık, Doğa, Ejderha).
- **🗺️ Umbra Haritası** — 50 lokasyon, hikaye seçimleriyle açılır.
- **🏆 100 Başarım** — 6 kategoride başarımlar, gizli sürpriz başarımlar dahil.
- **🎧 7 Ortam Sesi** — Lo-fi, Şömine, Yağmur, Okyanus, Orman, Büyü, İksir. Web Audio API ile tarayıcıda üretilir, dosya yok.
- **📋 Seans Geçmişi** — Tüm seanslar, süreler ve hikaye önizlemeleri.

---

## Kullanılan Teknolojiler

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Gemini API (OpenRouter üzerinden)
- Web Audio API (bildirim sesleri + ortam sesleri)
- localStorage (XP, envanter, harita, geçmiş, başarımlar)

---

## Nasıl Çalıştırılır?

### Gereksinimler
- Node.js 18+
- OpenRouter API anahtarı → https://openrouter.ai

### Kurulum

```bash
git clone https://github.com/kzehratnc/BGK-AI-Buildathon---Grimoire.git
cd BGK-AI-Buildathon---Grimoire
npm install
```

### Ortam Değişkenleri

`.env.local` dosyası oluştur:

```env
GEMINI_API_KEY=openrouter_api_anahtarin
```

### Çalıştır

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.
