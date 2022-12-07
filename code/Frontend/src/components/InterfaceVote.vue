<template>
  <Header2 v-if="$store.state.actualClient !== null"></Header2>
  <!-- <div class="container"> -->
  <div class="login-root">
    <div class="box-root flex-flex flex-direction--column" style="min-height: 100vh;flex-grow: 1;">
      <div class="loginbackground box-background--white padding-top--64">
        <div class="loginbackground-gridContainer">
          <div class="box-root flex-flex" style="grid-area: top / start / 8 / end;">
            <div class="box-root" style="background-image: linear-gradient(white 0%, rgb(247, 250, 252) 33%); flex-grow: 1;">
            </div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 2 / auto / 5;">
            <div class="box-root box-divider--light-all-2 animationLeftRight tans3s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 6 / start / auto / 2;">
            <div class="box-root box-background--blue800" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 7 / start / auto / 4;">
            <div class="box-root box-background--blue animationLeftRight" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 8 / 4 / auto / 6;">
            <div class="box-root box-background--gray100 animationLeftRight tans3s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 2 / 15 / auto / end;">
            <div class="box-root box-background--cyan200 animationRightLeft tans4s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 3 / 14 / auto / end;">
            <div class="box-root box-background--blue animationRightLeft" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 4 / 17 / auto / 20;">
            <div class="box-root box-background--gray100 animationRightLeft tans4s" style="flex-grow: 1;"></div>
          </div>
          <div class="box-root flex-flex" style="grid-area: 5 / 14 / auto / 17;">
            <div class="box-root box-divider--light-all-2 animationRightLeft tans3s" style="flex-grow: 1;"></div>
          </div>
        </div>
      </div>
    <div class="formbg slide-in-right">
      <div class="title slide-in-right">
        <h1>Vote now</h1>
        <p>Nom de l'election : {{$store.state.actualElection.nom}}</p>
      </div>
      <div class="vote-container slide-in-right">
      <div class="vote-item closed" v-for="(choix, index) in $store.state.actualElection.choix" v-bind:key="index">
        <div class="main-data">
          <button class='bx bxs-right-arrow rotate' v-on:click="func($event)"></button>
          <img :src="choix.img">
          <label>{{choix.value}}</label>
          <input class="option-input radio" type="radio" value=choix1 name="choix" v-on:change="choice(index)">
        </div>
        <div class="description-data">
          <p v-if="choix.desc != ''">{{choix.desc}}</p>
          <p v-else>No description</p>
        </div>
      </div>
        <button id="vote-button" type="button" v-on:click="vote(choice(choix))">Vote</button>
    <!-- </div>
      <div class="vote-item" v-for="(choix, index) in $store.state.actualElection.choix" v-bind:key="index">
        <img :src="choix.urlImg">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTryVmt8i7VYR32xc0ByNgVQKnN-Pt0apuS0VWXP3rjCA&s">
        <label>{{ choix.value }}</label>
        <input class="option-input radio" type="radio" value={{choix.value}} name="choix" v-on:change="choice(index)">
      </div>
      <div>
        <input name="submit" type="submit" value="Vote" v-on:click="vote(choice(choix))" >
      </div> -->
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import http from "../http-common";
import Header2 from "./Header2.vue";

export default {
  name: "InterfaceVote",
  data() {
    return {
      idUser: Number,
      idElection: Number,
      choix: Number,
    };
  },
  computed: {},
  methods: {
    redirection() {
      if (this.$store.state.actualClient === null) {
        this.$router.push("/");
      }
    },
    vote(c) {
      let tab = [];
      const newVote = {
        idUser: this.$store.state.actualClient._id,
        idElection: this.$store.state.actualElection._id,
        choix: c,
      };
      http
        .post("/vote/createVote", newVote)
        .then((response) => {
          this.$store.state.actualVote = response.data;
          this.$store.state.actualClient.autorisedElections.find(e => e.election === this.$store.state.actualElection._id).bool = true;

          http
              .put("user/joinVote", this.$store.state.actualClient)
              .then((response) => {
                console.log("response :", response);
                this.$router.push("/HomePageVue");
              })
              .catch((error) => {
                if (error.response.status === 404) {
                  alert("Can't update your autorisedElections");
                }
                console.log(error);
              });

          http.get("election/getElection").then((r) => {
            tab = r.data;
            tab.forEach((res) => {
              if (res._id === this.$store.state.actualElection._id) {
                console.log(this.choix)
                res.resultats[this.choix] += 1;
                console.log("resulat:", res);
                http
                  .put("/election/updateElection", res)
                  .then((responseDuFutur) => {
                    console.log(responseDuFutur);
                    this.$router.push("HomePageVue");
                  })
                  .catch((errortamere) => {
                    if (errortamere.response.status === 404) {
                      alert("Can't update your account");
                    }
                    console.log(errortamere);
                  });
              }
            });
          });
        })
        .catch((e) => {
          if (e.response.status === 500) {
            alert("One or many values are already used");
          }
          console.log(e);
        });
        },
        choice(c) {
            return this.choix = c;
        },

        func(event) {
          // this.isOpened = !this.isOpened;
          event.target.classList.toggle("down");
          event.target.parentNode.parentNode.classList.toggle("closed")
        }
    },
    choice(c) {
      return (this.choix = c);
    },
  mounted: function () {
    this.$nextTick(this.redirection);
  },
  components: { Header2 },
};
</script>

<style scoped>
/* .container {
} */

* {
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
}

template
{
  overflow: hidden;
}

body {
  overflow: hidden;
  background-color: #ffffff;
}
h1 {
  letter-spacing: -1px;
}
a {
  color: #5469d4;
  text-decoration: unset;
}
.login-root {
  background: #fff;
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.loginbackground {
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 70px;
  z-index: 0;
  overflow: hidden;
}
.flex-flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.center-center {
  align-items: center;
  justify-content: center;
}
.box-root {
  box-sizing: border-box;
}
.flex-direction--column {
  -ms-flex-direction: column;
  flex-direction: column;
}
.loginbackground-gridContainer {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: [start] 1fr [left-gutter] (86.6px)[16] [left-gutter] 1fr [end];
  grid-template-columns: [start] 1fr [left-gutter] repeat(16,86.6px) [left-gutter] 1fr [end];
  -ms-grid-rows: [top] 1fr [top-gutter] (64px)[8] [bottom-gutter] 1fr [bottom];
  grid-template-rows: [top] 1fr [top-gutter] repeat(8,64px) [bottom-gutter] 1fr [bottom];
  justify-content: center;
  margin: 0 -2%;
  transform: rotate(-12deg) skew(-12deg);
}
.box-divider--light-all-2 {
  box-shadow: inset 0 0 0 2px #e3e8ee;
}
.box-background--blue {
  background-color: #5469d4;
}
.box-background--white {
  background-color: #ffffff;
}
.box-background--blue800 {
  background-color: #212d63;
}
.box-background--gray100 {
  background-color: #e3e8ee;
}
.box-background--cyan200 {
  background-color: #7fd3ed;
}
.padding-top--64 {
  padding-top: 64px;
}
.padding-top--24 {
  padding-top: 24px;
}
.padding-top--48 {
  padding-top: 48px;
}
.padding-bottom--24 {
  padding-bottom: 24px;
}
.padding-horizontal--48 {
  padding: 48px;
}
.padding-bottom--15 {
  padding-bottom: 15px;
}


.flex-justifyContent--center {
  -ms-flex-pack: center;
  justify-content: center;
}

.animationRightLeft {
  animation: animationRightLeft 2s ease-in-out infinite;
}
.animationLeftRight {
  animation: animationLeftRight 2s ease-in-out infinite;
}
.tans3s {
  animation: animationLeftRight 3s ease-in-out infinite;
}
.tans4s {
  animation: animationLeftRight 4s ease-in-out infinite;
}

@keyframes animationLeftRight {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes animationRightLeft {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0px);
  }
}

.slide-in-right {
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation-delay: 0.3s;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.formbg {
  margin: 0px auto;
  width: 100%;
  max-width: 70%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
    rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 20px 0px;
}

  .vote-container {
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vote-item {
    width: 70%;
    /* max-width: 400px;  */
    min-width: 250px;
    min-height: 60px;
    margin: auto;
    margin-bottom: 10px;
    background-color: #5469d4;
    border-radius: 5px;
    /* padding-right: 20px;
    padding-left: 5px; */
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    /* align-items: center; */
  }

  .vote-item .main-data {
    display: flex; 
    width : 100%;
    height: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color : #5469d4;
    align-items: center; 
    text-align: center;
    justify-content: center;
  }

  .vote-item .main-data label{
    margin: auto;
  }


  button {
    background-color: #5469d4;
    border : none;
    cursor : pointer;
  }

  #vote-button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    margin-top:30px ;
  }

  .vote-item .description-data {
    width: auto;
    border-radius: 5px;
    overflow-wrap: break-word;
    overflow: hidden;
    word-wrap: break-word;
    transition: 0.5s;
  }

.vote-item img {
  height: 90px;
  width: 90px;
  margin: 20px 0px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
  border-image-width: 5px;
  border: black;
}


.title {
  margin: auto;
}

.formbg label {
  color: #fff;
}

.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  /* position: relative; */
  /* top: 12px;  */
  /* right: 0;
  bottom: 0;
  left: 0; */
  height: 20px;
  width: 20px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  /* display: inline-block; */
  margin-right: 20px;
  outline: none;
  position: relative;
  z-index: 1000;
  /* margin-left: auto; */
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #40e0d0;
}
.option-input:checked::before {
  width: 20px;
  height: 20px;
  display: flex;
  /* content: '\f00c'; */
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  align-items: center;
  justify-content: center;
  /* font-family:'Font Awesome 5 Free'; */
}
.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #40e0d0;
  content: "";
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
}

input[name="submit"] {
  background-color: rgb(84, 105, 212);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(84, 105, 212) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  /* text-align: center; */
}

input[name="submit"] {
  font-size: 16px;
  line-height: 28px;
  display: flex;
  justify-content: center;
  width: 100px;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  margin: 10px auto 20px auto;
}



.vote-item.closed .description-data{
  display : none;
  /* transition: 0.5s */
}

.vote-item.closed .main-data{
  border-radius: 5px;
}

.vote-item .description-data {
  width: 100%;
  color: white;
  background-color: #212d63;
  display: flex;
}

.vote-item .description-data p {
  color: white;
  background-color: #212d63;
  margin: 0px 10px;
}

.rotate{
    -moz-transition: all 0.2s linear;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    margin: 0px 10px;
}

.rotate.down{
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
}


@keyframes click-wave {
  0% {
    height: 20px;
    width: 20px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    height: 200px;
    width: 200px;
    margin-left: -90px;
    margin-top: -90px;
    opacity: 0;
  }
}

.slide-in-right {
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

</style>
