<template>
  <div>
    <Header />
    <h1>Bienvenue sur le réseau social de notre entreprise </h1>
    <div class="image">
    <a href="/"><img src="../assets/images/photo de l'entreprise.jpg" alt="photo" /></a>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: 'home',
  components: {
    Header,
    Footer
  },
 
}

</script>

<style scoped>
h1 {
  color: #fd2d08;
  padding: 70px 0 50px 0;
  font-size: 2.5rem;
}


</style>