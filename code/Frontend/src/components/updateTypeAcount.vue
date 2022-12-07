<template>
  <div class="main-container">
  <Header2 v-if="$store.state.actualClient !== null"></Header2>
  <h1 class="h1 slide-in-right">Choose your type of acount :</h1>
    <br><h4 class="slide-in-right">You could change it in the futur</h4>
  <div class="flex slide-in-right">
  <section class="page-contain slide-in-right" v-for="type in typeAccounts" v-bind:key="type.id">
    <a href="#" class="data-card" @click="chooseOffer(type)">
      <h3>{{type.titre}}</h3>
      <h4>Advantages</h4>
      <p>{{type.avantage1}}
        <br>{{type.avantage2}}
        <br>{{type.avantage3}}
      </p>
      <br><br><p class="price">{{type.prix}}</p>
      <span class="link-text">
      Purchase
      <i class='bx bx-right-arrow-alt'></i>
    </span>
    </a>
  </section>
  </div>
</div>
</template>

<script>
import http from "@/http-common";
import Header2 from "./Header2.vue";

export default {
    name: "DifferentAcount",
    data() {
        return {
            typeAccounts: [
                {
                    id: 1,
                    titre: "Free",
                    avantage1: "Classic account",
                    avantage2: "Can create vote of only 10 participants maximum",
                    avantage3: "Can create only 2 votes at the same time",
                    prix: "0.0 $ by months"
                },
                {
                    id: 2,
                    titre: "Premium",
                    avantage1: "Best offer",
                    avantage2: "Can create vote of 100 participants maximum",
                    avantage3: "Can create 10 votes at the same time",
                    prix: "5.0 $ by months"
                },
                {
                    id: 3,
                    titre: "Super",
                    avantage1: "Beast offer",
                    avantage2: "Can create vote of 500 participants maximum",
                    avantage3: "Can create 50 votes at the same time",
                    prix: "10.0 $ by months"
                }
            ]
        };
    },
    methods: {
        chooseOffer(type) {
            if (type.id === 1) {
                this.$store.state.actualClient.subscription = "free";
            }
            if (type.id === 2) {
                this.$store.state.actualClient.subscription = "premium";
            }
            if (type.id === 3) {
                this.$store.state.actualClient.subscription = "super-premium";
            }
          if (this.$store.state.actualClient.mail === 'admin@gmail.com'){
            this.$store.state.actualClient.subscription = 'admin'
          }
            http
                .put("/user/chooseTypeAccount", this.$store.state.actualClient)
                .then(response => {
                console.log(response.data);
                  this.$router.push('/HomePageVue');
            })
                .catch(e => {
                if (e.response.status === 404) {
                    alert("Can't update your account");
                }
                console.log(e);
            });
        },
    },
    mounted: function () {
        this.$nextTick();
    },
    components: { Header2 }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700&display=swap");


.main-container {
  margin-top: 60px;
}

.flex{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

h1{
  text-align: center;
  font-family: "Open Sans", sans-serif;
}

h4{
  text-align: center;
}

.page-contain {
  /*display: flex;
  align-items: center;
  justify-content: center;*/
  /*height: 540px;*/
  border: 12px solid white;
  /*padding: 32px;*/
  font-family: "Open Sans", sans-serif;
}

.main-container {
  display: flex;
  flex-direction: column;
}

.data-card {
  display: flex;
  flex-direction: column;
  height: 540px;
  width: 332px;
  min-height: 332px;
  overflow: hidden;
  border-radius: 14px;
  text-decoration: none;
  background: #212d63;
  /*margin: 16px;*/
  /*margin-top: -200px;*/
  padding: 44px 40px;
  box-shadow: 0 24px 40px -8px rgba(0, 0, 0, 0.1);
  transition: transform 0.45s ease, background 0.45s ease;
}
.data-card h3 {
  text-align: center;
  color: whitesmoke;
  font-size: 56px;
  font-weight: 600;
  line-height: 1;
  padding-bottom: 8px;
  margin: 0 0 15px;
  border-bottom: 2px solid antiquewhite;
  transition: color 0.45s ease, border 0.45s ease;
}
.data-card h4 {
  color: #697386;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
  line-height: 2px;
  letter-spacing: 2px;
  margin: 0 0 29px;
  transition: color 0.45s ease;
}
.data-card p {
  opacity: 1;
  color: #7fd3ed;
  font-weight: 600;
  line-height: 1.8;
  margin: 0 0 20;
  transform: translateY(-16px);
  transition: opacity 0.45s ease, transform 0.5s ease;
}
.data-card .link-text {
  display: block;
  color: floralwhite;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  margin: auto 0 0;
  transition: color 0.45s ease;
}
.data-card .link-text svg {
  margin-left: 8px;
  transition: transform 0.6s ease;
}
.data-card .link-text svg path {
  transition: fill 0.45s ease;
}
.data-card:hover {
  background: #5469d4;
  transform: scale(1.02);
}
.data-card:hover h3 {
  color: #ffffff;
  border-bottom-color: #1a1f36;
}
.data-card:hover h4 {
  color: #ffffff;
}
.data-card:hover p {
  opacity: 1;
  transform: none;
}
.data-card:hover .link-text {
  color: #ffffff;
}
.data-card:hover .link-text svg {
  -webkit-animation: point 1.25s infinite alternate;
  animation: point 1.25s infinite alternate;
}
.data-card:hover .link-text svg path {
  fill: #ffffff;
}

@-webkit-keyframes point {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(2px);
  }
}

@keyframes point {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(2px);
  }
}

.data-card .price{
  color: indianred;
  font-size: 25px;
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