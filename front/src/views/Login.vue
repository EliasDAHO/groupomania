<template>
  <div>
    <Header />
    <div class="login">
      <h1>Se connecter</h1>
      <form>
        <ul>
         <li>
            <input type="username" v-model="username" placeholder="Username" size="50" required aria-label="Username de connection">
          </li>
          <li>
            <input type="email" v-model="email" placeholder="Email" size="50" required aria-label="Email de connection">
          </li>
          <li>
            <input type="password" v-model="password" placeholder="Password" size="50" required aria-label="Mot de passe de connection">
          </li>
        </ul>  
      </form>
      <button @click="login()" type="submit" aria-label="Se connecter">Se connecter</button>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: 'login',
  components: {
    Header,
    Footer
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },

  methods: {
    login() {
        
      let data = {
          username: this.username,
          email: this.email,
          password: this.password
      };

      fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      
      .then( response => {
        if(response.ok) {
          return response.json()
        } else {
          return response.text()
          .then((text) => {
            throw new Error(text)}
          )
        }
      })  
        
      .then((value) => {
        const token = JSON.stringify(value.token);
        const userId = JSON.stringify(value.userId);
        const role = JSON.stringify(value.role);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        this.$router.push("/allposts");
      })
      .catch(alert)
    }
  }
}
</script>

<style scoped>

h1 {
    margin: 30px 0 50px 0;
    width: 98%;
    font-size: 2rem;
    background: #ffd7d7;
    border: 2px solid #fd2d01;
    border-radius: 20px;
}

ul {
list-style: none;
padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 30px;
}

button {
  margin-top: 30px;
  padding: 5px 30px ;
  border: 2px solid #fd2d01;
  border-radius: 10px;
  background: #ffd7d7;
  font-size: 1rem;
  cursor: pointer;
}

input {
  font-size: 1.2rem;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

::placeholder {
  text-align: center;
}

@media screen and (max-width:1024px) {

    h1 {
        font-size: 1.5rem;
    }
    
    input,
    ::placeholder {
        font-size: 1rem;
    }


}

@media screen and (max-width:768px) {

    h1 {
        font-size: 1.2rem;
    }

    input,
    ::placeholder {
        font-size: 0.8rem;
    }
}
</style>