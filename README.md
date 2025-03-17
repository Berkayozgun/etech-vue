# Görev Yönetimi Uygulaması

Bu proje, Vue 3 kullanılarak geliştirilmiş modern bir görev yönetimi uygulamasıdır. Kullanıcıların günlük görevlerini kolayca yönetmelerini sağlar.

## Özellikler

- 📝 Görev oluşturma ve düzenleme
- 📋 Görev listesi görüntüleme
- 🏷️ Görevleri öncelik ve duruma göre filtreleme
- 📊 Görevleri farklı kriterlere göre sıralama
- 💾 Local storage ile veri kalıcılığı
- 📱 Responsive tasarım

## Teknolojiler

- Vue 3 (Composition API)
- Vuex (State Management)
- Vue Router
- CSS3 (Modern özellikler ve animasyonlar)

## Kurulum

1. Projeyi klonlayın:

```bash
git clone [proje-url]
```

2. Proje dizinine gidin:

```bash
cd etech-vue
```

3. Bağımlılıkları yükleyin:

```bash
npm install
```

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

5. Tarayıcınızda `http://localhost:5173` adresini açın.

## Kullanım

### Görev Oluşturma

1. "Yeni Görev Ekle" butonuna tıklayın
2. Görev başlığı ve açıklamasını girin
3. Öncelik ve durum seçin
4. "Kaydet" butonuna tıklayın

### Görev Düzenleme

1. Görev kartındaki düzenleme ikonuna tıklayın
2. Gerekli değişiklikleri yapın
3. "Kaydet" butonuna tıklayın

### Görev Filtreleme ve Sıralama

- Durum filtresi: Görevleri durumlarına göre filtreleyin
- Öncelik filtresi: Görevleri önceliklerine göre filtreleyin
- Sıralama: Görevleri oluşturulma tarihi, başlık veya önceliğe göre sıralayın

## Tasarım Kararları

### 1. Modern ve Minimalist Arayüz

- Temiz ve sade bir tasarım
- Yeterli beyaz alan kullanımı
- Tutarlı renk paleti
- Okunabilir tipografi

### 2. Responsive Tasarım

- Mobile-first yaklaşım
- Esnek grid sistemi
- Dinamik bileşen boyutları
- Mobil cihazlarda optimize edilmiş görünüm

### 3. Kullanıcı Deneyimi

- Sezgisel navigasyon
- Anlık geri bildirimler
- Yumuşak animasyonlar
- Kolay erişilebilir kontroller

### 4. Performans Optimizasyonu

- Lazy loading
- Optimize edilmiş görseller
- Verimli state yönetimi
- Local storage kullanımı

## Geliştirme

### Proje Yapısı

```
src/
├── assets/         # Statik dosyalar
├── components/     # Yeniden kullanılabilir bileşenler
├── router/         # Vue Router yapılandırması
├── store/          # Vuex store modülleri
├── views/          # Sayfa bileşenleri
└── App.vue         # Ana uygulama bileşeni
```

### Bileşen Hiyerarşisi

- `App.vue`: Ana uygulama bileşeni
- `HomeView.vue`: Ana sayfa görünümü
- `TaskList.vue`: Görev listesi bileşeni
- `TaskItem.vue`: Tekil görev bileşeni
- `TaskFilter.vue`: Filtreleme ve sıralama bileşeni
- `TaskModal.vue`: Görev oluşturma/düzenleme modalı

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
