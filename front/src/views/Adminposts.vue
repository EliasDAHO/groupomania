<template>
    <div>
        <HeaderProfile />
        
            <article >
                <table>
                    <tr>
                        <th>username</th>
                        <th>Message du post</th>
                        <th>Image du post</th>
                    </tr>
                    <tr v-bind:key="index" v-for="(post, index) in posts">
                        <td><input type="text" v-model="post.user.nom" required aria-label="Nom de l'auteur du post" disabled></td>
                        <td><input type="text" v-model="post.user.prenom" required aria-label="Prénom de l'auteur du post" disabled></td>
                        <td><input type="text" v-model="post.title" required aria-label="Titre du post" disabled></td>
                        <td><textarea type="text" v-model="post.content" required aria-label="Message du post" disabled></textarea></td>
                        <td><img v-if="post.image" :src="post.image" alt="Image du post"></td>
                        <button @click="deletePost(index)" aria-label="Supprimer ce post"><i class="far fa-trash-alt"></i></button>
                    </tr>
                </table>
                <router-link to="/allposts" class="button" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
            </article>
        <Footer />
    </div>
</template>

<script>
import HeaderProfile from "../components/HeaderProfile";

import Footer from "../components/Footer";

export default {
    name: 'AdminPosts',
    components: {
        HeaderProfile,
        
        Footer
    },
    data () {
        return {
            posts: [],
        }
    },
    methods : {

        getPosts() {
            const token = JSON.parse(localStorage.getItem("userToken"))

            fetch('http://localhost:3000/api/posts/', {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            
            .then(response => response.json())
            .then(data => (this.posts = data))
            .catch(alert)
        },
        deletePost(index) {
            const token = JSON.parse(localStorage.getItem("userToken"))

            if (confirm("Voulez-vous vraiment supprimer le post") === true) {

                fetch(`http://localhost:3000/api/posts/${this.posts[index].id}`, {
                    method: "DELETE",
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body : JSON.stringify(this.posts[index])
                })
                .then(response => response.json())
                .then(data => (this.posts[index] = data))
                .then(() => {
                    this.$router.go()
                })
                .catch(alert)
            }
        }
    },
    mounted(){
        this.getPosts()
    }
}
</script>

<style scoped>


</style>