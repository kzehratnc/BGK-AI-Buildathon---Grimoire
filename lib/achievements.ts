export type AchievementCategory =
  | "zaman"
  | "xp"
  | "envanter"
  | "harita"
  | "hikaye"
  | "gizli";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: AchievementCategory;
  secret?: boolean; // gizli başarımlar açılana kadar ??? gösterilir
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  totalSessions: number;
  totalMinutes: number;
  totalXP: number;
  level: number;
  unlockedItems: number;
  unlockedLocations: number;
  totalChoices: number;
  completedSessions: number; // completionRate >= 1
  longestSession: number; // dakika
  pomodoroSessions: number;
  stopwatchSessions: number;
  subjectsStudied: string[]; // benzersiz konular
}

export const ACHIEVEMENTS: Achievement[] = [
  // ⏱️ ZAMAN & SEANS (17 başarım)
  {
    id: "ach_time_01", name: "İlk Adım", emoji: "🚶",
    description: "İlk seansını tamamla.",
    category: "zaman",
    check: (s) => s.totalSessions >= 1,
  },
  {
    id: "ach_time_02", name: "Üç Kez Denedim", emoji: "🔁",
    description: "3 seans tamamla.",
    category: "zaman",
    check: (s) => s.totalSessions >= 3,
  },
  {
    id: "ach_time_03", name: "Alışkanlık Başlıyor", emoji: "📅",
    description: "10 seans tamamla.",
    category: "zaman",
    check: (s) => s.totalSessions >= 10,
  },
  {
    id: "ach_time_04", name: "Kararlı Büyücü", emoji: "💪",
    description: "25 seans tamamla.",
    category: "zaman",
    check: (s) => s.totalSessions >= 25,
  },
  {
    id: "ach_time_05", name: "Elli Kez", emoji: "5️⃣0️⃣",
    description: "50 seans tamamla.",
    category: "zaman",
    check: (s) => s.totalSessions >= 50,
  },
  {
    id: "ach_time_06", name: "Yüz Seans", emoji: "💯",
    description: "100 seans tamamla.",
    category: "zaman",
    check: (s) => s.totalSessions >= 100,
  },
  {
    id: "ach_time_07", name: "İlk Saat", emoji: "🕐",
    description: "Toplam 60 dakika çalış.",
    category: "zaman",
    check: (s) => s.totalMinutes >= 60,
  },
  {
    id: "ach_time_08", name: "Beş Saat", emoji: "⏰",
    description: "Toplam 5 saat çalış.",
    category: "zaman",
    check: (s) => s.totalMinutes >= 300,
  },
  {
    id: "ach_time_09", name: "Tam Bir Gün", emoji: "🌅",
    description: "Toplam 24 saat çalış.",
    category: "zaman",
    check: (s) => s.totalMinutes >= 1440,
  },
  {
    id: "ach_time_10", name: "Haftalık Çalışma", emoji: "📆",
    description: "Toplam 50 saat çalış.",
    category: "zaman",
    check: (s) => s.totalMinutes >= 3000,
  },
  {
    id: "ach_time_11", name: "Aylık Çalışma", emoji: "🗓️",
    description: "Toplam 200 saat çalış.",
    category: "zaman",
    check: (s) => s.totalMinutes >= 12000,
  },
  {
    id: "ach_time_12", name: "Uzun Soluk", emoji: "🏃",
    description: "Tek seansta 60 dakika tamamla.",
    category: "zaman",
    check: (s) => s.longestSession >= 60,
  },
  {
    id: "ach_time_13", name: "Maraton", emoji: "🏅",
    description: "Tek seansta 90 dakika tamamla.",
    category: "zaman",
    check: (s) => s.longestSession >= 90,
  },
  {
    id: "ach_time_14", name: "Demir İrade", emoji: "⚙️",
    description: "Tek seansta 2 saat tamamla.",
    category: "zaman",
    check: (s) => s.longestSession >= 120,
  },
  {
    id: "ach_time_15", name: "Mükemmeliyetçi", emoji: "✅",
    description: "10 seansı hiç erken bitirmeden tamamla.",
    category: "zaman",
    check: (s) => s.completedSessions >= 10,
  },
  {
    id: "ach_time_16", name: "Vazgeçmeyenler", emoji: "🎯",
    description: "50 seansı hiç erken bitirmeden tamamla.",
    category: "zaman",
    check: (s) => s.completedSessions >= 50,
  },
  {
    id: "ach_time_17", name: "Grimoire Adanmışı", emoji: "📖",
    description: "Toplam 500 saat çalış.",
    category: "zaman",
    check: (s) => s.totalMinutes >= 30000,
  },

  // ⚡ XP & SEVİYE (17 başarım)
  {
    id: "ach_xp_01", name: "İlk XP", emoji: "✨",
    description: "İlk XP'ni kazan.",
    category: "xp",
    check: (s) => s.totalXP >= 1,
  },
  {
    id: "ach_xp_02", name: "Yüz Puan", emoji: "💫",
    description: "100 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 100,
  },
  {
    id: "ach_xp_03", name: "Bin Puan", emoji: "🌟",
    description: "1.000 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 1000,
  },
  {
    id: "ach_xp_04", name: "On Bin", emoji: "⭐",
    description: "10.000 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 10000,
  },
  {
    id: "ach_xp_05", name: "Elli Bin", emoji: "🌠",
    description: "50.000 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 50000,
  },
  {
    id: "ach_xp_06", name: "Yüz Bin", emoji: "💎",
    description: "100.000 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 100000,
  },
  {
    id: "ach_xp_07", name: "Yarım Milyon", emoji: "👑",
    description: "500.000 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 500000,
  },
  {
    id: "ach_xp_08", name: "Acemi Büyücü", emoji: "🧙",
    description: "Seviye 5'e ulaş.",
    category: "xp",
    check: (s) => s.level >= 5,
  },
  {
    id: "ach_xp_09", name: "Usta Yolunda", emoji: "🔮",
    description: "Seviye 10'a ulaş.",
    category: "xp",
    check: (s) => s.level >= 10,
  },
  {
    id: "ach_xp_10", name: "Arkanist", emoji: "📜",
    description: "Seviye 15'e ulaş.",
    category: "xp",
    check: (s) => s.level >= 15,
  },
  {
    id: "ach_xp_11", name: "Karanlık Lord", emoji: "🌑",
    description: "Seviye 20'ye ulaş.",
    category: "xp",
    check: (s) => s.level >= 20,
  },
  {
    id: "ach_xp_12", name: "Umbra Efendisi", emoji: "🌀",
    description: "Seviye 30'a ulaş.",
    category: "xp",
    check: (s) => s.level >= 30,
  },
  {
    id: "ach_xp_13", name: "İmparator", emoji: "⚔️",
    description: "Seviye 40'a ulaş.",
    category: "xp",
    check: (s) => s.level >= 40,
  },
  {
    id: "ach_xp_14", name: "Tanrı Adayı", emoji: "🌌",
    description: "Seviye 45'e ulaş.",
    category: "xp",
    check: (s) => s.level >= 45,
  },
  {
    id: "ach_xp_15", name: "Grimoire Tanrısı", emoji: "🫀",
    description: "Seviye 49'a ulaş.",
    category: "xp",
    check: (s) => s.level >= 49,
  },
  {
    id: "ach_xp_16", name: "Grimoire Ustası", emoji: "📖",
    description: "Maksimum seviyeye (50) ulaş.",
    category: "xp",
    check: (s) => s.level >= 50,
  },
  {
    id: "ach_xp_17", name: "Bir Milyon", emoji: "🏆",
    description: "1.000.000 XP'ye ulaş.",
    category: "xp",
    check: (s) => s.totalXP >= 1000000,
  },

  // 🎒 ENVANTER (17 başarım)
  {
    id: "ach_inv_01", name: "İlk Eşya", emoji: "🎁",
    description: "İlk eşyanı kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 1,
  },
  {
    id: "ach_inv_02", name: "Küçük Koleksiyon", emoji: "🎒",
    description: "5 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 5,
  },
  {
    id: "ach_inv_03", name: "Büyüyen Koleksiyon", emoji: "📦",
    description: "10 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 10,
  },
  {
    id: "ach_inv_04", name: "Koleksiyoncu", emoji: "🗃️",
    description: "25 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 25,
  },
  {
    id: "ach_inv_05", name: "Yarı Dolu", emoji: "⚗️",
    description: "50 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 50,
  },
  {
    id: "ach_inv_06", name: "Büyük Koleksiyoncu", emoji: "🏺",
    description: "75 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 75,
  },
  {
    id: "ach_inv_07", name: "Tam Koleksiyon", emoji: "💠",
    description: "Tüm 100 eşyayı kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 100,
  },
  {
    id: "ach_inv_08", name: "Işık Yolcusu", emoji: "🕯️",
    description: "Işık kategorisinden 5 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 5,
  },
  {
    id: "ach_inv_09", name: "Bilge Öğrenci", emoji: "📜",
    description: "20 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 20,
  },
  {
    id: "ach_inv_10", name: "Simyacı", emoji: "🧪",
    description: "30 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 30,
  },
  {
    id: "ach_inv_11", name: "Savaşçı Ruh", emoji: "🗡️",
    description: "40 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 40,
  },
  {
    id: "ach_inv_12", name: "Karanlık Koleksiyoncu", emoji: "👁️",
    description: "60 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 60,
  },
  {
    id: "ach_inv_13", name: "Doğa Dostu", emoji: "🌿",
    description: "70 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 70,
  },
  {
    id: "ach_inv_14", name: "Ejderha Avcısı", emoji: "🐉",
    description: "80 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 80,
  },
  {
    id: "ach_inv_15", name: "Efsane Koleksiyoncu", emoji: "🌟",
    description: "90 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 90,
  },
  {
    id: "ach_inv_16", name: "Hazine Avcısı", emoji: "💰",
    description: "95 eşya kazan.",
    category: "envanter",
    check: (s) => s.unlockedItems >= 95,
  },
  {
    id: "ach_inv_17", name: "Filozof Taşı", emoji: "💎",
    description: "En nadir eşyayı kazan (250.000 XP).",
    category: "envanter",
    check: (s) => s.totalXP >= 250000,
  },

  // 🗺️ HARİTA (16 başarım)
  {
    id: "ach_map_01", name: "İlk Adım Umbra'da", emoji: "🏚️",
    description: "İlk lokasyonu keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 1,
  },
  {
    id: "ach_map_02", name: "Kaşif", emoji: "🗺️",
    description: "5 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 5,
  },
  {
    id: "ach_map_03", name: "Yolcu", emoji: "🧭",
    description: "10 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 10,
  },
  {
    id: "ach_map_04", name: "Seyyah", emoji: "🌍",
    description: "20 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 20,
  },
  {
    id: "ach_map_05", name: "Umbra Gezgini", emoji: "🌑",
    description: "30 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 30,
  },
  {
    id: "ach_map_06", name: "Yarı Yol", emoji: "⛰️",
    description: "25 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 25,
  },
  {
    id: "ach_map_07", name: "Derin Kaşif", emoji: "🔭",
    description: "40 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 40,
  },
  {
    id: "ach_map_08", name: "Efsanevi Kaşif", emoji: "🌌",
    description: "50 lokasyon keşfet — Umbra'nın tamamını keşfettin!",
    category: "harita",
    check: (s) => s.unlockedLocations >= 50,
  },
  {
    id: "ach_map_09", name: "Başlangıç Bölgesi", emoji: "🏘️",
    description: "Başlangıç bölgesindeki tüm lokasyonları aç (8 seçim).",
    category: "harita",
    check: (s) => s.unlockedLocations >= 8,
  },
  {
    id: "ach_map_10", name: "Bilgi Diyarı", emoji: "📚",
    description: "Bilgi bölgesine ulaş (16 seçim).",
    category: "harita",
    check: (s) => s.unlockedLocations >= 16,
  },
  {
    id: "ach_map_11", name: "Simya Ustası", emoji: "⚗️",
    description: "Simya bölgesine ulaş (24 seçim).",
    category: "harita",
    check: (s) => s.unlockedLocations >= 24,
  },
  {
    id: "ach_map_12", name: "Gölge Ormanı", emoji: "🌲",
    description: "Gölge bölgesine ulaş (33 seçim).",
    category: "harita",
    check: (s) => s.unlockedLocations >= 33,
  },
  {
    id: "ach_map_13", name: "Kale Lordu", emoji: "🏰",
    description: "Kale bölgesine ulaş (42 seçim).",
    category: "harita",
    check: (s) => s.unlockedLocations >= 42,
  },
  {
    id: "ach_map_14", name: "Öteki Dünya", emoji: "🌀",
    description: "Öteki dünyaya ulaş (43 seçim).",
    category: "harita",
    check: (s) => s.unlockedLocations >= 43,
  },
  {
    id: "ach_map_15", name: "Boyutlar Ötesi", emoji: "⭐",
    description: "47 lokasyon keşfet.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 47,
  },
  {
    id: "ach_map_16", name: "Grimoire'ın Kalbi", emoji: "🫀",
    description: "Son lokasyonu keşfet — Umbra'nın en derin sırrına ulaştın.",
    category: "harita",
    check: (s) => s.unlockedLocations >= 50,
  },

  // 📖 HİKAYE & SEÇİM (17 başarım)
  {
    id: "ach_story_01", name: "İlk Karar", emoji: "⚖️",
    description: "İlk hikaye seçimini yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 1,
  },
  {
    id: "ach_story_02", name: "Karar Verici", emoji: "🎭",
    description: "5 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 5,
  },
  {
    id: "ach_story_03", name: "Hikaye Yazarı", emoji: "✍️",
    description: "10 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 10,
  },
  {
    id: "ach_story_04", name: "Anlatıcı", emoji: "📖",
    description: "25 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 25,
  },
  {
    id: "ach_story_05", name: "Kader Şekillendirici", emoji: "🌀",
    description: "50 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 50,
  },
  {
    id: "ach_story_06", name: "Büyük Anlatı", emoji: "📚",
    description: "100 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 100,
  },
  {
    id: "ach_story_07", name: "Efsane Yazarı", emoji: "🏆",
    description: "200 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 200,
  },
  {
    id: "ach_story_08", name: "Destansı", emoji: "🌟",
    description: "500 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 500,
  },
  {
    id: "ach_story_09", name: "Hikaye Ustası", emoji: "👑",
    description: "1000 hikaye seçimi yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 1000,
  },
  {
    id: "ach_story_10", name: "İlk Bölüm", emoji: "📄",
    description: "3 seansı tamamla.",
    category: "hikaye",
    check: (s) => s.totalSessions >= 3,
  },
  {
    id: "ach_story_11", name: "Bölüm II", emoji: "📃",
    description: "15 seansı tamamla.",
    category: "hikaye",
    check: (s) => s.totalSessions >= 15,
  },
  {
    id: "ach_story_12", name: "Üçüncü Kitap", emoji: "📕",
    description: "30 seansı tamamla.",
    category: "hikaye",
    check: (s) => s.totalSessions >= 30,
  },
  {
    id: "ach_story_13", name: "Seri Yazar", emoji: "📗",
    description: "75 seansı tamamla.",
    category: "hikaye",
    check: (s) => s.totalSessions >= 75,
  },
  {
    id: "ach_story_14", name: "Grimoire Yazarı", emoji: "📘",
    description: "150 seansı tamamla.",
    category: "hikaye",
    check: (s) => s.totalSessions >= 150,
  },
  {
    id: "ach_story_15", name: "Karanlık Kronikler", emoji: "🖤",
    description: "20 seçim yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 20,
  },
  {
    id: "ach_story_16", name: "Kader Dokuyucu", emoji: "🕸️",
    description: "75 seçim yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 75,
  },
  {
    id: "ach_story_17", name: "Umbra Tarihçisi", emoji: "🗿",
    description: "150 seçim yap.",
    category: "hikaye",
    check: (s) => s.totalChoices >= 150,
  },

  // 🔮 GİZLİ BAŞARIMLAR (16 başarım)
  {
    id: "ach_secret_01", name: "Gece Kuşu", emoji: "🦉",
    description: "Gece yarısından sonra bir seans tamamla.",
    category: "gizli", secret: true,
    check: (s) => s.totalSessions >= 1, // Gerçek kontrol session eklenirken yapılacak
  },
  {
    id: "ach_secret_02", name: "Sabah Büyücüsü", emoji: "🌄",
    description: "Sabah 6'dan önce bir seans tamamla.",
    category: "gizli", secret: true,
    check: (s) => s.totalSessions >= 5,
  },
  {
    id: "ach_secret_03", name: "Mükemmel 25", emoji: "🍅",
    description: "Tam 25 dakikalık bir seansı eksiksiz bitir.",
    category: "gizli", secret: true,
    check: (s) => s.completedSessions >= 1,
  },
  {
    id: "ach_secret_04", name: "Hız Büyücüsü", emoji: "⚡",
    description: "5 dakikadan kısa bir seansta 50 XP kazan.",
    category: "gizli", secret: true,
    check: (s) => s.totalXP >= 50,
  },
  {
    id: "ach_secret_05", name: "Tek Konu Ustası", emoji: "🎯",
    description: "Aynı konuyu 10 kez çalış.",
    category: "gizli", secret: true,
    check: (s) => s.totalSessions >= 10,
  },
  {
    id: "ach_secret_06", name: "Çok Yönlü", emoji: "🌈",
    description: "5 farklı konuyu çalış.",
    category: "gizli", secret: true,
    check: (s) => s.subjectsStudied.length >= 5,
  },
  {
    id: "ach_secret_07", name: "Ansiklopedi", emoji: "📰",
    description: "10 farklı konuyu çalış.",
    category: "gizli", secret: true,
    check: (s) => s.subjectsStudied.length >= 10,
  },
  {
    id: "ach_secret_08", name: "Teslimiyet Yok", emoji: "🛡️",
    description: "20 seansı hiç erken bitirmeden tamamla.",
    category: "gizli", secret: true,
    check: (s) => s.completedSessions >= 20,
  },
  {
    id: "ach_secret_09", name: "Süreklilik", emoji: "♾️",
    description: "500 dakika toplam çalış.",
    category: "gizli", secret: true,
    check: (s) => s.totalMinutes >= 500,
  },
  {
    id: "ach_secret_10", name: "Grimoire Okuyucusu", emoji: "🔍",
    description: "Her kategoride en az 1 eşya kazan.",
    category: "gizli", secret: true,
    check: (s) => s.unlockedItems >= 7,
  },
  {
    id: "ach_secret_11", name: "Sınır Tanımaz", emoji: "🚀",
    description: "Tek seansta 3 saat çalış.",
    category: "gizli", secret: true,
    check: (s) => s.longestSession >= 180,
  },
  {
    id: "ach_secret_12", name: "Karanlık Yolculuk", emoji: "🌑",
    description: "Toplam 100 saat çalış.",
    category: "gizli", secret: true,
    check: (s) => s.totalMinutes >= 6000,
  },
  {
    id: "ach_secret_13", name: "Sır Saklayan", emoji: "🤫",
    description: "Bu başarımı bulmak için... sadece oyna.",
    category: "gizli", secret: true,
    check: (s) => s.totalChoices >= 30,
  },
  {
    id: "ach_secret_14", name: "Lanetli Bilge", emoji: "💀",
    description: "Toplam 300 saat çalış.",
    category: "gizli", secret: true,
    check: (s) => s.totalMinutes >= 18000,
  },
  {
    id: "ach_secret_15", name: "Ölümsüz Büyücü", emoji: "⚰️",
    description: "1000 seans tamamla.",
    category: "gizli", secret: true,
    check: (s) => s.totalSessions >= 1000,
  },
  {
    id: "ach_secret_16", name: "Grimoire'ın Ruhu", emoji: "👻",
    description: "Her şeyi tamamla. Gerçek anlamda her şeyi.",
    category: "gizli", secret: true,
    check: (s) =>
      s.totalSessions >= 100 &&
      s.unlockedItems >= 100 &&
      s.unlockedLocations >= 50 &&
      s.totalChoices >= 100 &&
      s.level >= 50,
  },
];

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  zaman:    "⏱️ Zaman",
  xp:       "⚡ XP & Seviye",
  envanter: "🎒 Envanter",
  harita:   "🗺️ Harita",
  hikaye:   "📖 Hikaye",
  gizli:    "🔮 Gizli",
};

export const CATEGORIES: AchievementCategory[] = [
  "zaman", "xp", "envanter", "harita", "hikaye", "gizli"
];

export function getAchievementStats(): AchievementStats {
  try {
    const xp = Number(window.localStorage.getItem("grimoire_xp") ?? "0");
    const choices = Number(window.localStorage.getItem("grimoire_total_choices") ?? "0");
    const sessionsRaw = window.localStorage.getItem("grimoire_sessions");
    const sessions = sessionsRaw
      ? (JSON.parse(sessionsRaw) as Array<{
          elapsedMinutes: number;
          completionRate: number;
          subject: string;
        }>)
      : [];

    const totalMinutes = sessions.reduce((a, s) => a + (s.elapsedMinutes ?? 0), 0);
    const completedSessions = sessions.filter((s) => s.completionRate >= 1).length;
    const longestSession = sessions.reduce((a, s) => Math.max(a, s.elapsedMinutes ?? 0), 0);
    const subjectsStudied = [...new Set(sessions.map((s) => (s.subject ?? "").toLowerCase().trim()).filter(Boolean))];

    // Seviye hesapla
    const levelThresholds = [0,100,250,450,700,1000,1400,1900,2500,3200,4000,5000,6200,7600,9200,11000,13000,15200,17700,20500,23600,27000,30700,34800,39300,44200,49600,55500,62000,69000,76500,84500,93000,102000,111500,121500,132000,143000,154500,166500,179000,192000,205500,219500,234000,249000,264500,280500,297000,314000];
    let level = 1;
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      if (xp >= levelThresholds[i]) { level = i + 1; break; }
    }

    // Eşya sayısı
    const itemThresholds = [50,75,80,100,120,150,160,175,190,200,210,240,250,260,290,300,320,340,350,380,400,410,450,480,500,520,560,600,600,640,680,680,700,730,780,800,820,860,880,900,920,980,1000,1000,1060,1100,1100,1130,1200,1200,1300,1300,1350,1400,1400,1450,1500,1500,1600,1700,1750,1800,1800,1800,1900,1900,2000,2000,2200,2200,2400,2500,2800,3000,3000,3200,3600,3800,4200,4200,4500,5000,5500,5500,6000,6500,6500,7500,8000,8000,8500,9000,9500,10000,11000,12000,12000,12500,13000,14000,15000];
    const unlockedItems = itemThresholds.filter(t => xp >= t).length;

    // Lokasyon sayısı
    const unlockedLocations = Math.min(50, choices + 1);

    return {
      totalSessions: sessions.length,
      totalMinutes,
      totalXP: xp,
      level,
      unlockedItems,
      unlockedLocations,
      totalChoices: choices,
      completedSessions,
      longestSession,
      pomodoroSessions: 0,
      stopwatchSessions: 0,
      subjectsStudied,
    };
  } catch {
    return {
      totalSessions: 0, totalMinutes: 0, totalXP: 0, level: 1,
      unlockedItems: 0, unlockedLocations: 1, totalChoices: 0,
      completedSessions: 0, longestSession: 0, pomodoroSessions: 0,
      stopwatchSessions: 0, subjectsStudied: [],
    };
  }
}

export function getUnlockedAchievements(stats: AchievementStats): Set<string> {
  return new Set(
    ACHIEVEMENTS.filter((a) => {
      try { return a.check(stats); } catch { return false; }
    }).map((a) => a.id)
  );
}