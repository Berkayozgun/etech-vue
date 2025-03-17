<template>
  <div class="about">
    <h1>Hakkında</h1>
    <p>
      Bu uygulama, görevlerinizi etkili bir şekilde yönetmenizi sağlayan bir Vue.js uygulamasıdır.
    </p>
    <p>Özellikler:</p>
    <ul>
      <li>Görev oluşturma ve düzenleme</li>
      <li>Görevleri kategorilere ayırma</li>
      <li>Görev durumlarını takip etme</li>
      <li>Sürükle-bırak ile görev sıralama</li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  margin: 10px 0;
  color: var(--text-color);
}
</style>
