# 💡 Grimoire — Fikir & Vizyon Belgesi

---

## Problem

Üniversite öğrencileri kalkülüs, fizik, kimya gibi yüksek bilişsel yük gerektiren derslere çalışırken uzun süre odaklanmakta zorlanır. Mevcut çözümler (Pomodoro sayaçları, yapılacaklar listeleri) çalışmayı ödüllendirmez ve motivasyon sağlamaz. Çalışmanın hiçbir anlık karşılığı yoktur.

---

## Kullanıcı

**Birincil kullanıcı:** Üniversite öğrencileri (18–26 yaş), özellikle mühendislik, fen ve matematik bölümlerinde okuyanlar.

**İkincil kullanıcı:** Uzun süreli odaklanma gerektiren herhangi bir işi olan, oyunlaştırmaya ilgi duyan bireyler.

---

## AI'ın Rolü

Grimoire'daki AI motoru **Google Gemini** modelini (OpenRouter üzerinden) kullanır:

- Her odaklanma seansının ardından kullanıcının çalıştığı derse, geçen süreye ve tamamlanma oranına göre **özgün bir hikaye bölümü** üretir
- Seansın **tamamlanma oranına** göre hikaye uzunluğunu ayarlar:
  - %50 altı → kısa, yarım hikaye ("kahraman yolculuğunu tamamlayamadı")
  - %50–99 arası → orta uzunlukta hikaye
  - %100 → tam ve tatmin edici hikaye bölümü
- Hikayenin sonunda **2 seçenekli karar noktası** üretir — kullanıcının seçimi bir sonraki seansta hikayeye yansır
- Kullanıcının **kazandığı eşyaları** bağlam olarak alır, hikayede o eşyalara doğal atıflar yapar
- Önceki seanstaki kararı bağlam olarak alır, hikayeyi tutarlı şekilde sürdürür
- Pomodoro modunda her çalışma turunun ardından ayrı bir hikaye bölümü üretir

---

## Rakip Durum

| Uygulama | Ne yapıyor | Eksiği |
|----------|-----------|--------|
| Forest | Odaklanma sayacı, ağaç büyütme | Hikaye yok, AI yok |
| Habitica | Görev tabanlı RPG | Gerçek zamanlı AI hikayesi yok |
| Focusmate | Canlı hesap verebilirlik | Oyunlaştırma yok |
| Notion AI | Genel AI asistanı | Odaklanma/motivasyon odaklı değil |

**Grimoire'ın farkı:** AI tarafından üretilen, kullanıcının kararlarıyla şekillenen, kazandığı eşyaların hikayeye yansıdığı ve çalışılan derse göre uyarlanan interaktif bir hikaye deneyimi. 3 farklı zamanlayıcı modu, 50 seviye, 100 eşya, 50 lokasyon ve 100 başarımla derin bir oyunlaştırma sistemi sunar.

---

## Başarı Kriteri

- Kullanıcı ortalama seans süresi ≥ 25 dakika
- Kullanıcılar hikaye seçimlerini yapıyor ve bir sonraki seans için geri dönüyor
- Envanter, harita ve başarım sistemleri uzun vadeli motivasyon sağlıyor
- "Çalışmak için heyecanlandım" geri bildirimi alınıyor
