export type Location = {
    id: string;
    name: string;
    emoji: string;
    region: "baslangic" | "bilgi" | "simya" | "golge" | "kale" | "oteki";
    description: string;
    unlockAtChoice: number; // kaçıncı seçimde açılır (0 = başlangıçta açık)
  };
  
  export const LOCATIONS: Location[] = [
    // BAŞLANGIÇ TOPRAKLARI
    { id: "loc_01", name: "Çırak Kulübesi", emoji: "🏚️", region: "baslangic", description: "Her büyücünün yolculuğu bu mütevazı kulübeden başlar. Duvarlar eski büyü kitaplarıyla kaplı.", unlockAtChoice: 0 },
    { id: "loc_02", name: "Sisli Çayır", emoji: "🌫️", region: "baslangic", description: "Sabah sisinin hiç dağılmadığı gizemli bir çayır. Yerde tuhaf izler var.", unlockAtChoice: 1 },
    { id: "loc_03", name: "Eski Köprü", emoji: "🌉", region: "baslangic", description: "İki dünyanın sınırında duran köprü. Geçenler bir daha aynı kişi olarak dönemez.", unlockAtChoice: 2 },
    { id: "loc_04", name: "Kara Pazar", emoji: "🏪", region: "baslangic", description: "Her türlü büyü malzemesinin alınıp satıldığı karanlık bir pazar yeri.", unlockAtChoice: 3 },
    { id: "loc_05", name: "Terk Edilmiş Değirmen", emoji: "⚙️", region: "baslangic", description: "Yıllardır kimsenin girmediği bu değirmen içinde hâlâ sesler duyulur.", unlockAtChoice: 4 },
    { id: "loc_06", name: "Mezarlık Kapısı", emoji: "⛪", region: "baslangic", description: "Ölülerin dinlendiği yer. Ama bazıları uyumaz.", unlockAtChoice: 5 },
    { id: "loc_07", name: "Büyücü Tavernası", emoji: "🍺", region: "baslangic", description: "Yorgun büyücülerin sırlarını paylaştığı loş bir meyhane.", unlockAtChoice: 6 },
    { id: "loc_08", name: "Kadim Çınar", emoji: "🌳", region: "baslangic", description: "Bin yıllık bu ağacın gövdesinde rünler kazılı. Geceleri parıldar.", unlockAtChoice: 7 },
  
    // BİLGİ DİYARI
    { id: "loc_09", name: "Karanlık Kütüphane", emoji: "📚", region: "bilgi", description: "Yasak kitapların saklandığı devasa kütüphane. Raflar tavana kadar uzanır.", unlockAtChoice: 8 },
    { id: "loc_10", name: "Haritacılar Kulesi", emoji: "🗺️", region: "bilgi", description: "Bilinmeyen toprakların haritalarını çizen mistik haritacıların evi.", unlockAtChoice: 9 },
    { id: "loc_11", name: "Rün Akademisi", emoji: "🏛️", region: "bilgi", description: "Kadim rün dilinin öğretildiği prestijli akademi.", unlockAtChoice: 10 },
    { id: "loc_12", name: "Kehanet Odası", emoji: "🔮", region: "bilgi", description: "Geleceği görmek isteyenlerin kapısını çaldığı gizemli oda.", unlockAtChoice: 11 },
    { id: "loc_13", name: "Arşiv Mağarası", emoji: "🕯️", region: "bilgi", description: "Tarihin en eski belgelerinin saklandığı, mumlarla aydınlatılan mağara.", unlockAtChoice: 12 },
    { id: "loc_14", name: "Gözlem Kulesi", emoji: "🔭", region: "bilgi", description: "Yıldızları ve büyü akımlarını izlemek için inşa edilmiş yüksek kule.", unlockAtChoice: 13 },
    { id: "loc_15", name: "Bilge Baykuş Yuvası", emoji: "🦉", region: "bilgi", description: "Efsanevi bilge baykuşların yaşadığı, bilgeliğin simgesi olan orman köşesi.", unlockAtChoice: 14 },
    { id: "loc_16", name: "Kayıp Dil Tapınağı", emoji: "📜", region: "bilgi", description: "Artık kimsenin konuşmadığı eski bir dilin sırlarını barındıran tapınak.", unlockAtChoice: 15 },
  
    // SİMYA BÖLGESİ
    { id: "loc_17", name: "Simya Laboratuvarı", emoji: "⚗️", region: "simya", description: "Dumanlar ve kokular içindeki bu laboratuvarda imkânsız iksirler üretilir.", unlockAtChoice: 16 },
    { id: "loc_18", name: "Kristal Madenler", emoji: "💎", region: "simya", description: "Yer altında parlayan büyülü kristallerin çıkarıldığı derin madenler.", unlockAtChoice: 17 },
    { id: "loc_19", name: "Cıva Gölü", emoji: "🌊", region: "simya", description: "Yüzeyi ayna gibi parlayan bu gölün suyu içilmez ama büyü için değerlidir.", unlockAtChoice: 18 },
    { id: "loc_20", name: "Ateş Çukuru", emoji: "🔥", region: "simya", description: "Hiç sönmeyen kadim ateşin yaktığı bu çukurda metaller eritilir.", unlockAtChoice: 19 },
    { id: "loc_21", name: "Zehirli Bataklık", emoji: "🌿", region: "simya", description: "Tehlikeli ama değerli bitkilerin yetiştiği, dikkatle girilmesi gereken bataklık.", unlockAtChoice: 20 },
    { id: "loc_22", name: "Altın Damıtma Evi", emoji: "🏺", region: "simya", description: "En saf altının elde edildiği, duvarları is tutmuş eski yapı.", unlockAtChoice: 21 },
    { id: "loc_23", name: "Büyülü Fırın", emoji: "🌋", region: "simya", description: "Volkanik enerjiyle çalışan bu fırında sadece en nadir eşyalar şekillenir.", unlockAtChoice: 22 },
    { id: "loc_24", name: "Filozof Kulesi", emoji: "🔷", region: "simya", description: "Filozof taşını arayan simyacıların asırlardır çalıştığı efsanevi kule.", unlockAtChoice: 23 },
  
    // GÖLGE ORMANLARI
    { id: "loc_25", name: "Gölge Ormanı Girişi", emoji: "🌑", region: "golge", description: "Işığın neredeyse hiç girmediği bu ormanın girişinde tüyler ürperir.", unlockAtChoice: 24 },
    { id: "loc_26", name: "Hayalet Köyü", emoji: "👻", region: "golge", description: "Sakinleri çoktan gitmiş ama ruhları hâlâ dolaşan terk edilmiş köy.", unlockAtChoice: 25 },
    { id: "loc_27", name: "Karanlık Göl", emoji: "🖤", region: "golge", description: "Dibinin görünmediği bu gölün içinde kadim bir yaratık uyuduğu söylenir.", unlockAtChoice: 26 },
    { id: "loc_28", name: "Lanetli Harabe", emoji: "🏛️", region: "golge", description: "Eski bir uygarlığın kalıntıları. Lanet hâlâ aktif.", unlockAtChoice: 27 },
    { id: "loc_29", name: "Örümcek Mağarası", emoji: "🕸️", region: "golge", description: "Dev örümceklerin ağlarıyla kaplı bu mağarada değerli kristaller var.", unlockAtChoice: 28 },
    { id: "loc_30", name: "Kayıp Mezarlık", emoji: "💀", region: "golge", description: "Haritada gösterilmeyen bu mezarlığa yanlışlıkla girenler çıkamaz.", unlockAtChoice: 29 },
    { id: "loc_31", name: "Kan Ağacı", emoji: "🌲", region: "golge", description: "Kırmızı yaprakları olan bu ağacın özü en güçlü büyülerde kullanılır.", unlockAtChoice: 30 },
    { id: "loc_32", name: "Ruh Vadisi", emoji: "🌀", region: "golge", description: "Ölülerin ruhlarının geçiş yaptığı bu vadide zaman farklı akar.", unlockAtChoice: 31 },
    { id: "loc_33", name: "Karanlık Taht", emoji: "👑", region: "golge", description: "Ormanın merkezindeki bu taht yüzyıllardır boş bekliyor.", unlockAtChoice: 32 },
  
    // KARANLIK KALELER
    { id: "loc_34", name: "Sınır Kalesi", emoji: "🏰", region: "kale", description: "Işık ve karanlık diyarları arasındaki sınırı koruyan antik kale.", unlockAtChoice: 33 },
    { id: "loc_35", name: "Zindan Katları", emoji: "⛓️", region: "kale", description: "Derinlere indikçe daha güçlü mahkumların tutulduğu karanlık zindan.", unlockAtChoice: 34 },
    { id: "loc_36", name: "Silah Deposu", emoji: "⚔️", region: "kale", description: "Büyülü silahların depolandığı korunaklı oda. Girmek için izin gerekir.", unlockAtChoice: 35 },
    { id: "loc_37", name: "Kale Taht Odası", emoji: "🗡️", region: "kale", description: "Kötü büyücülerin hükmettiği görkemli ama ürkütücü taht odası.", unlockAtChoice: 36 },
    { id: "loc_38", name: "Gizli Tünel", emoji: "🕳️", region: "kale", description: "Kale altındaki bu tünel nereye çıkar? Kimse tam olarak bilmiyor.", unlockAtChoice: 37 },
    { id: "loc_39", name: "Büyücü Zindanı", emoji: "🔒", region: "kale", description: "Sadece büyücülerin hapsedildiği özel zindan. Büyü engelleyici bariyerlerle dolu.", unlockAtChoice: 38 },
    { id: "loc_40", name: "Kale Surları", emoji: "🧱", region: "kale", description: "Buradan tüm Umbra görünür. Bekçiler asla uyumaz.", unlockAtChoice: 39 },
    { id: "loc_41", name: "Karanlık Şapel", emoji: "⛩️", region: "kale", description: "Karanlık tanrılara adanmış bu şapelde yapılan ritüeller çok güçlüdür.", unlockAtChoice: 40 },
    { id: "loc_42", name: "Kale Arşivi", emoji: "📕", region: "kale", description: "Yasak büyülerin kayıt altına alındığı gizli arşiv.", unlockAtChoice: 41 },
  
    // ÖTEKİ DÜNYA
    { id: "loc_43", name: "Boyutlar Arası Kapı", emoji: "🌀", region: "oteki", description: "Farklı boyutlara açılan bu kapıdan geçmek için büyük güç gerekir.", unlockAtChoice: 42 },
    { id: "loc_44", name: "Zaman Kırığı", emoji: "⏳", region: "oteki", description: "Zamanın bükülüp kırıldığı bu noktada geçmiş ve gelecek iç içe geçer.", unlockAtChoice: 43 },
    { id: "loc_45", name: "Ruh Düzlemi", emoji: "👁️", region: "oteki", description: "Sadece ruhların var olabildiği bu düzleme bedeniyle giren nadiren döner.", unlockAtChoice: 44 },
    { id: "loc_46", name: "Kaos Girdabı", emoji: "🌪️", region: "oteki", description: "Tüm büyünün kaynağı olan bu girdap sonsuz güç ve sonsuz tehlike barındırır.", unlockAtChoice: 45 },
    { id: "loc_47", name: "Efsane Adası", emoji: "🏝️", region: "oteki", description: "Haritada gösterilmeyen bu ada sadece seçilmişlere görünür.", unlockAtChoice: 46 },
    { id: "loc_48", name: "Yıldız Kapısı", emoji: "⭐", region: "oteki", description: "Gökyüzündeki yıldızlara açılan bu kapıdan geçenler evrenin sırlarını öğrenir.", unlockAtChoice: 47 },
    { id: "loc_49", name: "Ölümsüzlük Tapınağı", emoji: "🫀", region: "oteki", description: "Ölümsüzlüğün sırrının saklandığı söylenen efsanevi tapınak.", unlockAtChoice: 48 },
    { id: "loc_50", name: "Grimoire'ın Kalbi", emoji: "📖", region: "oteki", description: "Tüm Umbra'nın merkezi. Buraya ulaşan büyücü artık efsane olmuştur.", unlockAtChoice: 49 },
  ];
  
  export const REGION_LABELS: Record<Location["region"], string> = {
    baslangic: "🏚️ Başlangıç",
    bilgi: "📚 Bilgi",
    simya: "⚗️ Simya",
    golge: "🌑 Gölge",
    kale: "🏰 Kale",
    oteki: "👁️ Öteki",
  };
  
  export const REGIONS = Object.keys(REGION_LABELS) as Location["region"][];
  
  export function getUnlockedLocations(totalChoices: number): Location[] {
    return LOCATIONS.filter((loc) => totalChoices >= loc.unlockAtChoice);
  }
  
  export function getNextLocation(totalChoices: number): Location | null {
    const locked = LOCATIONS.filter((loc) => totalChoices < loc.unlockAtChoice);
    if (locked.length === 0) return null;
    return locked.reduce((a, b) => (a.unlockAtChoice < b.unlockAtChoice ? a : b));
  }
  
  export function getTotalChoices(): number {
    try {
      const raw = window.localStorage.getItem("grimoire_total_choices");
      const parsed = raw ? Number(raw) : 0;
      return Number.isFinite(parsed) ? parsed : 0;
    } catch {
      return 0;
    }
  }
  
  export function incrementTotalChoices(): number {
    try {
      const current = getTotalChoices();
      const next = current + 1;
      window.localStorage.setItem("grimoire_total_choices", String(next));
      window.dispatchEvent(new CustomEvent("grimoire:choiceMade", { detail: { total: next } }));
      return next;
    } catch {
      return 0;
    }
  }