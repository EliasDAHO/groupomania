<template>
  <router-view/>
</template>

<style>
*{
    margin: 0px;
    font-size: 1em;
    color: #091F43;
}
#app {
    font-family: Verdana;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
body {
    background: rgb(255,255,255);
}

nav {
    width: 100%;
    max-width: 700px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 25px;
}
h2 {
    font-size: 20px;
}
.main-box {
    width: 90%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: #BFBBB4;
    border: 1px solid #D1515A;
    border-radius: 25px;
    box-shadow: 5px 5px 10px #D1515A;
    padding: 10px 2px 20px 5px;
    margin: 25px;
}
.backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(128, 128, 128, 0.233);
}
form, .login, .username-input, .password, .email {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0 10px 0;
}
.upper-text-bloc {
    padding: 15px 0 8px 0;
}
.username a {
    color: #091F43;
    text-decoration: none;
}
.username {
    align-self: center;
    font-weight: bold;
}
.post-buttons {
    display: flex;
    justify-content: space-around;
    font-size: 15px;
}
.close-button {
    align-self: center;
}
.text-box{
    max-height: 600px;
    overflow-y: scroll;
    margin: 15px 0 0 0;
}
img {
    max-height: 200px;
    width: fit-content;
    margin: 20px;
    align-self: center;

}
.text {
    display: inline-block;
    width: 90%;
    background: white;
    border: 1px solid #091F43;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0 10px 0;
    align-self: center;
    overflow-wrap: break-word;
}
.text-bloc {
    display: flex;
    flex-direction: column;
    border: 1px solid #091F43;
    border-radius: 10px;
    padding: 10px 0 10px 0;
    margin: 5px 0 5px 0;
}
.text-input {
    width: 90%;
    height: 30%;
    background: white;
    border-radius: 5px;
    padding: 10px 0 10px 0;
    margin: 10px 0 10px 0;
    text-align: left;
}
label {
    display: flex;
    flex-direction: column;
    align-items: center;
}
label input {
    width: 220px;
}
form button {
    background: BFBBB4;
    margin-top: 20px;
}
button {
    width: fit-content;
    background: #BFBBB4;
    border: solid 1px #091F43;
    padding: 5px 10px;
    margin: 8px;
    border-radius: 20px;
    box-shadow: 0px 2px 6px #D1515A;
    cursor: pointer;
    transition: ease-in-out 75ms;
}
button:active {
    transform: scale(0.95);
}
input.file-input {
    margin: 0 auto 0 auto;
    align-self: center;
}

::-webkit-scrollbar{
    width: 3px;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #D1515A;
}
</style>
