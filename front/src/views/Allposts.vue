<template>
    <div>
        <HeaderProfile />
        <h1>Fil d'actualité</h1>
        <button @click="createPost()" class="button" >Créer un post</button>
        <div>
            <input v-model="search" class="search" type="search" placeholder="Rechercher un post avec son auteur ..." size=50 aria-label="Barre de recherche d'un post avec le nom">
        </div>
        <article v-if="posts.length == 0">
            <p>Aucune publication... pour le moment...</p>
        </article>
        <article v-else v-bind:key="index" v-for="(post, index) in filterList">
            <router-link :to="`/post/${post.id}`" class="article">
               
                <div class="content">
                    <p class="message"></p><br>
                    <img class="image" v-if="post.image" :src="post.image" >
                    <p class="text">{{ post.content }}</p>
                    <p>{{post.comments.length}} <i class="fas fa-comments link"></i></p>
                </div>
            </router-link>
        </article>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'allposts',
    components: {
        HeaderProfile,
        Footer
    },
    data () {
        return {
            posts: [],
            search:''
        }
    },
    computed : {
        filterList() {
            return this.posts.filter((post) =>{
                return post.user.nom.toLowerCase().includes(this.search.toLowerCase());
            })
        }
    },
    methods : {
        
        getPosts() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch('http://localhost:3000/api/posts', {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            
            .then(response => response.json())
            .then(data => (this.posts = data))
            .catch(error => console.log(error))
        },
        dateFormat(createdDate) {
            const date = new Date(createdDate)
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
            return date.toLocaleDateString('fr-FR', options);
        },
        hourFormat(createdHour) {
            const hour = new Date(createdHour)
            const options = { hour: 'numeric', minute:'numeric', second:'numeric'};
            return hour.toLocaleTimeString('fr-FR', options);
        },
        createPost () {
            this.$router.push("/createpost")
        }
    },
    mounted(){
        this.getPosts()
    }
}
</script>

<style scoped>



</style>