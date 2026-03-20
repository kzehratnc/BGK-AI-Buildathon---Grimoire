# 🗺️ Grimoire — Kullanıcı Akışı

---

## Genel Akış

```
[Ana Sayfa]
  ├── Seansa Başla → [Seans Ekranı]
  ├── 📋 Seans Geçmişi → [Geçmiş Sayfası]
  └── 🗺️ Harita → [Harita Sayfası]

Sağ alt köşede her zaman:
  ⚡ XP Barı | 🎒 Envanter | 🗺️ Harita | 🔇 Ses | 🏆 Başarımlar
```

---

## Seans Akışı

### Mod Seçimi
```
[Mod Seç]
  ├── 🍅 Pomodoro → Çalışma + Mola süresi gir
  ├── ⏱️ Geri Sayım → 25/45/60 dk veya özel süre
  └── ⏲️ Kronometre → Süre yok, istediğinde bitir
```

### Pomodoro Akışı
```
[Başlat]
    ↓
[🧠 Çalışma sayacı]
    ↓ (dolar → ses çalar)
[📖 Hikaye + Seçimler]
    ├── [☕ Molaya Geç] → Mola sayacı → [✅ Hazır] → [⚔️ N. Tura Geç]
    └── [⚔️ N. Tura Geç] → Direkt yeni tur
```

### Geri Sayım Akışı
```
[Başlat] → [Sayaç] → (dolar) → [📖 Hikaye + Seçimler] → [Ana Sayfaya Dön]
                ↘ "Seansı Bitir" → Kısa/Orta hikaye + Az XP
```

### Kronometre Akışı
```
[Başlat] → [Yukarı sayan sayaç] → "Seansı Bitir" → [📖 Hikaye] → [Ana Sayfaya Dön]
```

---

## Ekranlar

### Ana Sayfa
- Gotik "Grimoire" başlığı, karanlık mor arka plan
- "Seansa Başla" butonu
- Seans Geçmişi ve Harita linkleri
- Sağ altta 5 sabit buton

### Seans Ekranı
- Mod seçici (Pomodoro / Geri Sayım / Kronometre)
- Konu metin kutusu
- Moda göre ayar alanı
- Büyük sayaç
- Başlat / Vazgeç / Seansı Bitir butonları

### Hikaye Ekranı
- AI üretimi hikaye metni (italik, atmosferik)
- XP kazanımı
- 2 interaktif seçenek butonu
- Ana Sayfaya Dön

### Seans Geçmişi (/history)
- Toplam istatistikler (seans, süre, XP)
- Her seans: konu, tarih, süre, XP, tamamlanma, hikaye önizlemesi

### Harita Sayfası (/map)
- 6 bölgede 50 lokasyon
- Açılanlar parlak, kilitliler gri
- Hover ile açıklama
- Sonraki lokasyon için gereken seçim sayısı

---

## İlerleme Sistemleri

| Sistem | Detay |
|--------|-------|
| XP | Dakika × 10, min 5 XP |
| Seviye | 50 seviye, Çırak → Grimoire Ustası |
| Envanter | 100 eşya, 7 kategori, XP ile açılır |
| Harita | 50 lokasyon, hikaye seçimleriyle açılır |
| Başarımlar | 100 başarım, 6 kategori (16 gizli) |

---

## Sağ Köşe Panelleri

| Buton | Konum | İçerik |
|-------|-------|--------|
| ⚡ XPBar | Sabit alt | Seviye, XP barı |
| 🎒 Envanter | bottom-28 | 100 eşya, 7 kategori |
| 🗺️ Harita | bottom-44 | 50 lokasyon paneli |
| 🔇 Ses | bottom-60 | 7 ortam sesi + ses seviyesi |
| 🏆 Başarımlar | bottom-[19rem] | 100 başarım, 6 kategori |
