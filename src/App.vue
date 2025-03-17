<script setup>
// Kullanılmayan importlar kaldırıldı
</script>

<template>
  <div class="app">
    <header>
      <nav>
        <div class="container">
          <div class="nav-content">
            <div class="logo">
              <router-link to="/">Görev Yönetimi</router-link>
            </div>
            <div class="nav-links">
              <router-link to="/">Ana Sayfa</router-link>
              <router-link to="/about">Hakkında</router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <div class="container">
        <router-view />
      </div>
    </main>

    <footer>
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Görev Yönetimi Uygulaması</p>
      </div>
    </footer>
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  padding: 15px 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: var(--gray-200);
}

.nav-links a.router-link-active {
  color: var(--primary-color);
  font-weight: 500;
}

main {
  flex: 1;
  padding: 30px 0;
  background-color: #f0f2f5;
}

footer {
  background-color: white;
  padding: 15px 0;
  border-top: 1px solid var(--gray-300);
  text-align: center;
  color: var(--gray-600);
  font-size: 14px;
}

@media (max-width: 576px) {
  .nav-content {
    flex-direction: column;
    gap: 10px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style>
