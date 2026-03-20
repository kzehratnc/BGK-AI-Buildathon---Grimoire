export type Item = {
  id: string;
  name: string;
  emoji: string;
  category: "isik" | "bilgi" | "simya" | "savas" | "karanlik" | "doga" | "ejderha";
  description: string;
  requiredXP: number;
};

export const ITEMS: Item[] = [
  // IŞIK BÜYÜLERİ (14 eşya)
  { id: "item_01", name: "Titrek Mum", emoji: "🕯️", category: "isik", description: "Karanlıkta yolu aydınlatan ilk büyü nesnesi.", requiredXP: 50 },
  { id: "item_02", name: "Kristal Fener", emoji: "🔮", category: "isik", description: "Mistik ışığı uzaklara taşır.", requiredXP: 200 },
  { id: "item_03", name: "Ateş Topu", emoji: "🔥", category: "isik", description: "Elinizde dans eden küçük bir alev.", requiredXP: 450 },
  { id: "item_04", name: "Güneş Taşı", emoji: "🌟", category: "isik", description: "Gündüzün gücünü geceye taşır.", requiredXP: 800 },
  { id: "item_05", name: "Işık Rünü", emoji: "✨", category: "isik", description: "Duvarlara kazınan kadim aydınlık işareti.", requiredXP: 1300 },
  { id: "item_06", name: "Fısıldayan Alev", emoji: "🌠", category: "isik", description: "Alevler bazen sırlar fısıldar.", requiredXP: 2000 },
  { id: "item_07", name: "Gökkuşağı Kristali", emoji: "💎", category: "isik", description: "Yedi rengin büyüsünü içinde barındırır.", requiredXP: 3000 },
  { id: "item_08", name: "Yıldız Tozu", emoji: "⭐", category: "isik", description: "Düşen yıldızlardan toplanan saf enerji.", requiredXP: 4500 },
  { id: "item_09", name: "Ay Işığı Şişesi", emoji: "🌙", category: "isik", description: "Dolunay ışığını hapseden nadir büyü.", requiredXP: 6500 },
  { id: "item_10", name: "Aurora Taşı", emoji: "🌈", category: "isik", description: "Kuzey ışıklarının enerjisini taşır.", requiredXP: 9000 },
  { id: "item_11", name: "Güneş Kristali", emoji: "☀️", category: "isik", description: "Güneş büyüsünün en saf formu.", requiredXP: 13000 },
  { id: "item_12", name: "Işık Zırhı", emoji: "🛡️", category: "isik", description: "Saf ışıktan örülmüş büyülü zırh.", requiredXP: 20000 },
  { id: "item_13", name: "Tanrısal Işık", emoji: "💫", category: "isik", description: "Tanrıların bıraktığı kutsal ışık parçası.", requiredXP: 35000 },
  { id: "item_14", name: "Güneş Tacı", emoji: "👑", category: "isik", description: "Işık büyücülerinin en yüksek nişanı.", requiredXP: 60000 },

  // BİLGİ & BİLGELİK (14 eşya)
  { id: "item_15", name: "Sararmış Parşömen", emoji: "📜", category: "bilgi", description: "Kadim bilgelerin notlarını taşır.", requiredXP: 100 },
  { id: "item_16", name: "Büyülü Kalem", emoji: "🖊️", category: "bilgi", description: "Kendiliğinden yazan gizemli bir kalem.", requiredXP: 300 },
  { id: "item_17", name: "Rün Taşı", emoji: "🪨", category: "bilgi", description: "Üzerindeki semboller bilgelik verir.", requiredXP: 600 },
  { id: "item_18", name: "Kehanet Aynası", emoji: "🪞", category: "bilgi", description: "Geleceğin bulanık görüntülerini yansıtır.", requiredXP: 1000 },
  { id: "item_19", name: "Antik Sözlük", emoji: "📖", category: "bilgi", description: "Unutulmuş dilleri çözümler.", requiredXP: 1600 },
  { id: "item_20", name: "Zaman Kumu", emoji: "⏳", category: "bilgi", description: "Geçmişi okumak için kullanılır.", requiredXP: 2500 },
  { id: "item_21", name: "Bilge Baykuş Tüyü", emoji: "🦉", category: "bilgi", description: "Bir bilge baykuşun bıraktığı kutsal tüy.", requiredXP: 3800 },
  { id: "item_22", name: "Kara Kütüphane Anahtarı", emoji: "🗝️", category: "bilgi", description: "Yasak bölümleri açan gizemli anahtar.", requiredXP: 5500 },
  { id: "item_23", name: "Zihin Kristali", emoji: "🔷", category: "bilgi", description: "Düşünceleri netleştirir ve odaklanmayı artırır.", requiredXP: 8000 },
  { id: "item_24", name: "Kehanet Kitabı", emoji: "📕", category: "bilgi", description: "Geleceği yazan efsanevi kitap.", requiredXP: 12000 },
  { id: "item_25", name: "Hafıza Kristali", emoji: "🔹", category: "bilgi", description: "Tüm öğrenilenleri kristalize eder.", requiredXP: 18000 },
  { id: "item_26", name: "Evren Haritası", emoji: "🗺️", category: "bilgi", description: "Bilinen tüm boyutların haritası.", requiredXP: 30000 },
  { id: "item_27", name: "Tanrısal Bilgelik", emoji: "🧠", category: "bilgi", description: "Tanrıların aktardığı sonsuz bilgelik.", requiredXP: 50000 },
  { id: "item_28", name: "Omnibus Codex", emoji: "📚", category: "bilgi", description: "Tüm bilgilerin sıkıştırıldığı efsanevi kitap.", requiredXP: 80000 },

  // SİMYA & İKSİRLER (14 eşya)
  { id: "item_29", name: "Boş Şişe", emoji: "🧪", category: "simya", description: "Her iksirin başlangıcı.", requiredXP: 150 },
  { id: "item_30", name: "Bakır Kazan", emoji: "🫕", category: "simya", description: "Temel simya karışımları için.", requiredXP: 350 },
  { id: "item_31", name: "Kükürt Tozu", emoji: "🌋", category: "simya", description: "Dönüşüm büyülerinin hammaddesi.", requiredXP: 700 },
  { id: "item_32", name: "Cıva Damlası", emoji: "💧", category: "simya", description: "Metalleri dönüştürür.", requiredXP: 1100 },
  { id: "item_33", name: "Şifa İksiri", emoji: "💊", category: "simya", description: "Yaraları anında iyileştirir.", requiredXP: 1800 },
  { id: "item_34", name: "Ejderha Otu", emoji: "🌿", category: "simya", description: "Nadir bulunan şifalı bir bitki.", requiredXP: 2800 },
  { id: "item_35", name: "Altın Eriten Asit", emoji: "⚗️", category: "simya", description: "Değerli metalleri çözer ve arıtır.", requiredXP: 4200 },
  { id: "item_36", name: "Simya Fırını", emoji: "🏺", category: "simya", description: "En yüksek sıcaklıkta bile yanmaz.", requiredXP: 6000 },
  { id: "item_37", name: "Gümüş Damıtıcı", emoji: "🌀", category: "simya", description: "Saf özleri ayıklar.", requiredXP: 8500 },
  { id: "item_38", name: "Hayat İksiri", emoji: "💚", category: "simya", description: "Yorgunluğu anında giderir.", requiredXP: 12500 },
  { id: "item_39", name: "Ölümsüzlük İksiri", emoji: "💜", category: "simya", description: "Efsanevi güçte bir iksidir.", requiredXP: 20000 },
  { id: "item_40", name: "Kaos İksiri", emoji: "🟣", category: "simya", description: "İçenin kaderini değiştirir.", requiredXP: 35000 },
  { id: "item_41", name: "Evren Özü", emoji: "🌌", category: "simya", description: "Evrenin temel yapı taşlarından damıtılmış.", requiredXP: 55000 },
  { id: "item_42", name: "Filozof Taşı", emoji: "💠", category: "simya", description: "Simyanın nihai amacı. Efsanevi güç.", requiredXP: 90000 },

  // SAVAŞ & SİLAHLAR (14 eşya)
  { id: "item_43", name: "Tahta Hançer", emoji: "🗡️", category: "savas", description: "Çırakların ilk silahı.", requiredXP: 250 },
  { id: "item_44", name: "Deri Kalkan", emoji: "🛡️", category: "savas", description: "Temel koruma sağlar.", requiredXP: 500 },
  { id: "item_45", name: "Büyülü Ok", emoji: "🏹", category: "savas", description: "Hedefini asla şaşırmaz.", requiredXP: 900 },
  { id: "item_46", name: "Demir Eldiven", emoji: "🥊", category: "savas", description: "Yumrukları büyüyle güçlendirir.", requiredXP: 1400 },
  { id: "item_47", name: "Rün Zırhı", emoji: "⚔️", category: "savas", description: "Büyü sembollerinin koruma sağladığı zırh.", requiredXP: 2200 },
  { id: "item_48", name: "Fırtına Kılıcı", emoji: "🌩️", category: "savas", description: "Şimşek büyüsü taşıyan parlak kılıç.", requiredXP: 3200 },
  { id: "item_49", name: "Ejderha Kalkanı", emoji: "🐉", category: "savas", description: "Ejderha derisinden yapılmış efsanevi kalkan.", requiredXP: 5000 },
  { id: "item_50", name: "Ruh Yakalayıcı", emoji: "💀", category: "savas", description: "Düşmanların enerjisini emer.", requiredXP: 7500 },
  { id: "item_51", name: "Kaos Baltası", emoji: "🪓", category: "savas", description: "Kontrolsüz güç, kontrolsüz yıkım.", requiredXP: 11000 },
  { id: "item_52", name: "Ateş Kılıcı", emoji: "🔥", category: "savas", description: "Alev büyüsüyle kaplanmış kadim kılıç.", requiredXP: 16000 },
  { id: "item_53", name: "Yıldırım Zırhı", emoji: "⚡", category: "savas", description: "Şimşeği emen ve yansıtan büyülü zırh.", requiredXP: 25000 },
  { id: "item_54", name: "Karanlık Kılıç", emoji: "🖤", category: "savas", description: "Karanlık enerjiden dövülmüş efsane silah.", requiredXP: 40000 },
  { id: "item_55", name: "Tanrı Katili", emoji: "☠️", category: "savas", description: "Tanrıları bile öldürebileceği söylenen silah.", requiredXP: 65000 },
  { id: "item_56", name: "Efsane Kılıç", emoji: "⚔️", category: "savas", description: "Yalnızca en güçlü savaşçılar taşıyabilir.", requiredXP: 100000 },

  // KARANLIK SANATLAR (14 eşya)
  { id: "item_57", name: "Gölge Pelerini", emoji: "🌑", category: "karanlik", description: "Sahibini karanlığa karıştırır.", requiredXP: 400 },
  { id: "item_58", name: "Fısıldayan Kafatası", emoji: "🕸️", category: "karanlik", description: "Ölülerin sırlarını aktarır.", requiredXP: 800 },
  { id: "item_59", name: "Karanlık Göz", emoji: "👁️", category: "karanlik", description: "Gizli şeyleri görür.", requiredXP: 1500 },
  { id: "item_60", name: "Kan Mühürü", emoji: "🔴", category: "karanlik", description: "Güçlü antlaşmalar için kullanılır.", requiredXP: 2400 },
  { id: "item_61", name: "Ruh Bağı", emoji: "⛓️", category: "karanlik", description: "İki varlığı birbirine bağlar.", requiredXP: 3600 },
  { id: "item_62", name: "Lanet Taşı", emoji: "🖤", category: "karanlik", description: "Düşmanlara lanet gönderir.", requiredXP: 5500 },
  { id: "item_63", name: "Karanlık Portal", emoji: "🌀", category: "karanlik", description: "Boyutlar arası geçiş kapısı.", requiredXP: 8000 },
  { id: "item_64", name: "Ölüm Maskesi", emoji: "🎭", category: "karanlik", description: "Giyen kişiyi tanınmaz hale getirir.", requiredXP: 12000 },
  { id: "item_65", name: "Ruh Tuzağı", emoji: "🕯️", category: "karanlik", description: "Ruhları hapseden kadim nesne.", requiredXP: 18000 },
  { id: "item_66", name: "Kaos Mühürü", emoji: "🔮", category: "karanlik", description: "Kaosun kendini mühürleyen parça.", requiredXP: 28000 },
  { id: "item_67", name: "Karanlık Taç", emoji: "👿", category: "karanlik", description: "Karanlık güçlerin sembolü.", requiredXP: 45000 },
  { id: "item_68", name: "Ölümsüzlük Mühürü", emoji: "♾️", category: "karanlik", description: "Ölümsüzlüğü mühürleyen efsanevi nesne.", requiredXP: 70000 },
  { id: "item_69", name: "Kaos Büyüsü Kitabı", emoji: "📕", category: "karanlik", description: "En tehlikeli büyüleri içerir.", requiredXP: 110000 },
  { id: "item_70", name: "Grimoire'ın Kalbi", emoji: "🫀", category: "karanlik", description: "Tüm karanlık sanatların özü. Efsanevi.", requiredXP: 160000 },

  // DOĞA & BİTKİLER (15 eşya)
  { id: "item_71", name: "Şifalı Ot", emoji: "🌿", category: "doga", description: "En basit büyü bitkisi ama işe yarar.", requiredXP: 75 },
  { id: "item_72", name: "Mantar Tozu", emoji: "🍄", category: "doga", description: "Mistik mantarlardan elde edilen toz.", requiredXP: 175 },
  { id: "item_73", name: "Çiçek Özü", emoji: "🌸", category: "doga", description: "Büyülü çiçeklerden damıtılmış öz.", requiredXP: 400 },
  { id: "item_74", name: "Meşe Palamudu", emoji: "🌰", category: "doga", description: "Kadim ormanların gücünü taşır.", requiredXP: 750 },
  { id: "item_75", name: "Yosun Taşı", emoji: "🪨", category: "doga", description: "Doğanın büyüsünü içinde barındırır.", requiredXP: 1200 },
  { id: "item_76", name: "Orman Ruhu", emoji: "🌲", category: "doga", description: "Yüzyıllık ağaçların ruhunu çağırır.", requiredXP: 2000 },
  { id: "item_77", name: "Deniz Kabuğu", emoji: "🐚", category: "doga", description: "Okyanusun sırlarını fısıldar.", requiredXP: 3000 },
  { id: "item_78", name: "Fırtına Yaprağı", emoji: "🍃", category: "doga", description: "Fırtınanın ortasından toplanan yaprak.", requiredXP: 4500 },
  { id: "item_79", name: "Toprak Kristali", emoji: "🟫", category: "doga", description: "Toprağın derinliklerinden çıkarılan kristal.", requiredXP: 6500 },
  { id: "item_80", name: "Su Ruhu Şişesi", emoji: "💧", category: "doga", description: "Saf bir su ruhunun hapsedildiği şişe.", requiredXP: 9500 },
  { id: "item_81", name: "Rüzgar Tüyü", emoji: "🪶", category: "doga", description: "Rüzgarın özgürlüğünü taşır.", requiredXP: 14000 },
  { id: "item_82", name: "Ateş Çiçeği", emoji: "🌺", category: "doga", description: "Yanardağ krateri içinde yetişen nadir çiçek.", requiredXP: 22000 },
  { id: "item_83", name: "Doğa Tacı", emoji: "🌿", category: "doga", description: "Doğanın ruhunu kontrol eder.", requiredXP: 38000 },
  { id: "item_84", name: "Dünya Ağacı Dalı", emoji: "🌳", category: "doga", description: "Efsanevi Dünya Ağacı'ndan kırılan dal.", requiredXP: 62000 },
  { id: "item_85", name: "Gaia Taşı", emoji: "🌍", category: "doga", description: "Dünyanın kalbinden gelen saf enerji.", requiredXP: 100000 },

  // EJDERHA & YARATIKLAR (15 eşya)
  { id: "item_86", name: "Ejderha Yumurtası Kırığı", emoji: "🥚", category: "ejderha", description: "Küçük bir ejderha yumurtasının kırığı bile güçlüdür.", requiredXP: 500 },
  { id: "item_87", name: "Canavar Pençesi", emoji: "🦅", category: "ejderha", description: "Güçlü bir yaratığın keskin pençesi.", requiredXP: 1000 },
  { id: "item_88", name: "Ejderha Pulu", emoji: "🐉", category: "ejderha", description: "Genç bir ejderhadan düşen pul.", requiredXP: 1800 },
  { id: "item_89", name: "Gorgon Gözü", emoji: "👁️", category: "ejderha", description: "Gorgon'un taşlaştırıcı gözü.", requiredXP: 2800 },
  { id: "item_90", name: "Sfenks Tüyü", emoji: "🦁", category: "ejderha", description: "Sfenks'in bilgeliğini taşır.", requiredXP: 4200 },
  { id: "item_91", name: "Feniks Külleri", emoji: "🔥", category: "ejderha", description: "Yeniden doğuşun sembolü.", requiredXP: 6500 },
  { id: "item_92", name: "Deniz Canavarı Dişi", emoji: "🦷", category: "ejderha", description: "Okyanusun derinliklerinden gelen korku.", requiredXP: 10000 },
  { id: "item_93", name: "Grifon Kanadı", emoji: "🦅", category: "ejderha", description: "Gökyüzünün efendisinin kanadı.", requiredXP: 15000 },
  { id: "item_94", name: "Ejderha Kalbi", emoji: "❤️", category: "ejderha", description: "Yetişkin bir ejderhanın kalbi.", requiredXP: 22000 },
  { id: "item_95", name: "Hydra Kanı", emoji: "🐍", category: "ejderha", description: "Dokuz başlı Hydra'nın zehirli kanı.", requiredXP: 33000 },
  { id: "item_96", name: "Ejderha Efendisi Tacı", emoji: "👑", category: "ejderha", description: "Tüm ejderhaları kontrol eder.", requiredXP: 50000 },
  { id: "item_97", name: "Tanrısal Ejderha Pulu", emoji: "✨", category: "ejderha", description: "Tanrısal bir ejderhadan düşen nadir pul.", requiredXP: 75000 },
  { id: "item_98", name: "Ejderha Ruhu", emoji: "🌟", category: "ejderha", description: "Kadim bir ejderhanın özgür ruhu.", requiredXP: 115000 },
  { id: "item_99", name: "Yaratık İmparatoru Mührü", emoji: "🔱", category: "ejderha", description: "Tüm yaratıkların imparatoru olduğunu kanıtlar.", requiredXP: 170000 },
  { id: "item_100", name: "Efsanevi Ejderha Kalbi", emoji: "💖", category: "ejderha", description: "Tarihin en güçlü ejderhasının kalbi.", requiredXP: 250000 },
];

export function getUnlockedItems(totalXP: number): Item[] {
  return ITEMS.filter((item) => totalXP >= item.requiredXP);
}

export function getNextItem(totalXP: number): Item | null {
  const locked = ITEMS.filter((item) => totalXP < item.requiredXP);
  if (locked.length === 0) return null;
  return locked.reduce((a, b) => (a.requiredXP < b.requiredXP ? a : b));
}