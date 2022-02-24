<template>
  <header class="nav">
    <a href="/"><img src="../assets/images/logo-groupomania.png" alt="Logo Groupomania" /></a>
    <nav>
      <router-link to="/signup" class="link" aria-label="Inscription">Inscription</router-link>
      <router-link to="/login" class="link" aria-label="Connection">Se connecter</router-link>
    </nav>
  </header>
</template>


<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  height: 80px;
}

.link {
  padding-left: 5vw;
  font-size: 1.2rem;
  text-decoration: none;
}

.link:hover {
  color: #fd2d01;

}
.nav {
  padding: 20px 5vw;
  font-size: 1vw;
}

.nav a {
  font-weight: bold;
  color: #000000;
}

.nav a.router-link-exact-active {
  color: #fd2d01;
}




</style>