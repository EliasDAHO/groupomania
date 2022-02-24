<template>
    <div>
        <HeaderProfile />
            <section>
                <h1>POST</h1>
                <form>
                    <ul>
                        <li>
                            <textarea v-model="contenu" placeholder="Contenu" rows="10" cols="60" required aria-label="Message du post"></textarea>
                        </li>
                        <li v-if="image">
                            <img :src="image" alt="Image du post" class="file">
                        </li>
                        <li>
                            <label v-if="!image" for="file" class="label-file" aria-label="Choisir une image pour ce post">Choisir une image</label>
                            <button v-else @click="deletefile()" class="label-file" aria-label="Supprimer cette image du post"> Supprimer cette image</button>
                            <input type="file" accept=".jpeg, .jpg, .png, .gif" v-on:change="uploadFile" id="file" class="input-file" aria-label="Image du post">
                        </li>
                        
                    </ul>
                </form>
                <button @click="createPost()" class="button" aria-label="Créer le post">Créer le post</button>
                <div>
                <router-link to="/allposts" class="button lien" aria-label="Retour au fil d'actualité">Retour aux posts</router-link>
                </div>
            </section>
        <Footer />
    </div>
</template>


<script>
import HeaderProfile from "../components/HeaderProfile";
import Footer from "../components/Footer";

export default {
    name: 'createpost',
    components: {
        HeaderProfile,
        Footer
    },
    data() {
        return {
            userId:'',
            content: '',
            image: '',
            preview: null
        }
    },
    methods: {
        createPost() {
            const Id = JSON.parse(localStorage.getItem("userId"))
            const fileField = document.querySelector('input[type="file"]');
            const token = JSON.parse(localStorage.getItem("userToken"))

          
            if (this.contenu === '')
                alert("Veuillez remplir le contenu du message")
            if (this.image === ''  && this.contenu != '') {
                let data = new FormData()
                data.append('content', this.contenu)
                data.append('userId', Id)

                fetch("http://localhost:3000/api/posts", {
                    method: "POST",
                    headers: {
                    'authorization': `Bearer ${token}`
                    },
                    body: data
                })
                .then((response) => {
                    return response.json();
                })
                .then(() => {
                    this.$router.push("/allposts");
                })
                .catch(alert)

            } else if (this.contenu != '') {

                var fileName = document.getElementById("file").value
                var idxDot = fileName.lastIndexOf(".") + 1;
                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                
                if (extFile === "jpg" || extFile === "jpeg" || extFile === "png" ||extFile === "gif"){
                    let data = new FormData()
                    data.append('image', fileField.files[0])
                    data.append('content', this.contenu)
                    data.append('user_id', Id)

                    fetch("http://localhost:3000/api/posts", {
                        method: "POST",
                        headers: {
                        'authorization': `Bearer ${token}`
                        },
                        body: data
                    })
                    .then((response) => response.json())
                    .then(() => {
                        this.$router.push("/allposts");
                    })
                    .catch(alert)
                } else {
                    alert("Uniquement les fichiers jpg, jpeg, png et gif sont acceptés!");
                }
            }
        },
        uploadFile(e) {
            if (e.target.files) {
                let reader = new FileReader()
                reader.onload = (event) => {
                    this.preview = event.target.result
                    this.image = event.target.result
                }
                reader.readAsDataURL(e.target.files[0])
            }
        },
        deletefile() {
            this.image = '';
        }
    }
}
</script>


<style scoped>
h1 {
    width: 100%;
    font-size: 2rem;
   color:#fd2d01;
    border: 2px solid #fd2d01;
    border-radius: 20px;
}

ul {
    padding: 0;
}

li {
    margin: 30px 0;
    list-style-type: none;
}

input {
    height: 30px;
    font-size: 1.5rem;
}

.file {
    width: 300px;
    height: 300px;
    margin-top: 10px;
    border: 2px solid #fd2d01;
    border-radius: 30px;
    padding: 5px;
}

.input-file {
    display: none;
}

textarea {
    font-size: 1.3rem;

}

.button,
.label-file {
    margin: 10px 0 30px 0;
    padding: 5px 30px ;
    border: 2px solid #fd2d01;
    border-radius: 10px;
    
    font-size: 1rem;
    cursor: pointer;
}

.lien {
    text-decoration: none;
    color: #000000;
}


</style>