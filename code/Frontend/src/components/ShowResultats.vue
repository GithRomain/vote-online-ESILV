<template>
<Header2 v-if="$store.state.actualClient !== null"></Header2>


  <div class="slide-in-bottom" v-if="$store.state.actualResult.length != 0">
  <h1 style="display: flex; justify-content: center; margin-top: 50px">Elections results</h1>

    <div class="formbg">

      <div class="container podium">
        <div class="podium__item slide-in-bottom">
          <div class="choix slide-in-bottom">
            <label class="label-img">{{$store.state.actualResult[1].label}}</label>
            <div class="div-img">
              <img v-if="$store.state.actualResult[1].image" :src="$store.state.actualResult[1].image" class="img">
            </div>
            <p class="pourcentage">{{(($store.state.actualResult[1].data[0]*100)/$store.state.nombreTotVotants).toFixed(1)}}%</p>
          </div>
          <div class="podium__rank second slide-in-bottom">2</div>
        </div>
        <div class="podium__item slide-in-bottom">
          <div class="choix slide-in-bottom">
            <label class="label-img">{{$store.state.actualResult[0].label}}</label>
            <div class="div-img">
              <img v-if="$store.state.actualResult[0].image" :src="$store.state.actualResult[0].image" class="img">
            </div>
            <p class="pourcentage">{{(($store.state.actualResult[0].data[0]*100)/$store.state.nombreTotVotants).toFixed(1)}}%</p>
          </div>
          <div class="podium__rank first">
            <svg class="podium__number" viewBox="0 0 27.476 75.03" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 214.957736, -43.117417)">
                <path class="st8" d="M -198.928 43.419 C -200.528 47.919 -203.528 51.819 -207.828 55.219 C -210.528 57.319 -213.028 58.819 -215.428 60.019 L -215.428 72.819 C -210.328 70.619 -205.628 67.819 -201.628 64.119 L -201.628 117.219 L -187.528 117.219 L -187.528 43.419 L -198.928 43.419 L -198.928 43.419 Z" style="fill: #000;"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="podium__item slide-in-bottom" v-if="$store.state.actualResult.length > 2">
          <div class="choix slide-in-bottom">
            <label class="label-img">{{$store.state.actualResult[2].label}}</label>
            <div class="div-img">
              <img v-if="$store.state.actualResult[2].image" :src="$store.state.actualResult[2].image" class="img">
            </div>
            <p class="pourcentage">{{(($store.state.actualResult[2].data[0]*100)/$store.state.nombreTotVotants).toFixed(1)}}%</p>

          </div>
          <div class="podium__rank third slide-in-bottom">3</div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="col mt-5">
      <div class="row mt-5">
        <h2> Votes Cast </h2>
        <PieChart />
      </div>
      <div class="row mt-5">
        <h2> Complete Results </h2>
        <BarChart />
      </div>
    </div>
  </div>
  <PolarAreaChart />

</template>

<script>
import Header2 from "./Header2.vue";
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import PolarAreaChart from './PolarAreaChart.vue'

export default {
    name: "ShowResultats",
    data() {
        return {
          electionBrut: [],
          indexSorted: [],
          arrVoters: []
        };
    },
    // async created() {
    //   /*
    //   // affect data in the arrays here in forEach loop
    //   data
    //   data.forEach(d => {
    //     const {
    //       hasVoted,
    //       hasNotVoted
    //     } = d;
    //   })
    //   */
    //   this.arrVoters.push({voted: 60, notVoted: 40});
    //},
    computed: {},
    methods: {
      test(){
        this.$store.state.nombreTotVotants;
      },
      redirection() {
        if (this.$store.state.actualClient === null) {
          this.$router.push("/");
        }
      },

    },
    mounted: function () {
      this.$nextTick(this.redirection);
      this.$nextTick(this.miseEnFormeRes);
    },
    components: { Header2, PieChart, BarChart, PolarAreaChart }
}
</script>

<style scoped>

.entie{
  background: #1c57b5;
  min-height: 800px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
}

.podium{
  margin-top: 100px;
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  justify-content: center;
}
/*.podiume-deux{*/
/*  width:100px;*/
/*  height: 500px;*/
/*  background: green;*/

/*}*/

/*.podiume-un{*/
/*  width:150px;*/
/*  height: 800px;*/
/*  background: yellow;*/
/*  margin-top:;*/
/*}*/


body {
  font-family: sans-serif;
}

.container {
  display: flex;
  align-items: flex-end;
}

.podium__item {
  width: 200px;
}

.podium__rank {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: #fff;
}

.podium__city {
  text-align: center;
  padding: 0 .5rem;
}

.podium__number {
  width: 27px;
  height: 75px;
}

.podium .first {
  min-height: 300px;
  background: rgb(255,172,37);
  background:
      linear-gradient(333deg,
      rgba(255,172,37,1) 0%,
      rgba(254,207,51,1) 13%,
      rgba(254,224,51,1) 53%,
      rgba(255,172,37,1) 100%);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

}

.podium .second {
  min-height: 200px;
  background: silver;
  background:
      linear-gradient(333deg,
      #9D978F 0%,
      #C3BDB5 13%,
      #d5cfc7 53%,
      #A7A199 100%);
  border-top-left-radius: 5px;
}

.podium .third {
  min-height: 100px;
  background: #cf7234;
  background:
      linear-gradient(333deg,
      #a55c2a 0%,
      #bc7129 13%,
      #db7f3c 53%,
      #99502a 100%);
  border-top-right-radius: 5px;
}

.choix {
  background-color: #5469d4;
  min-height: 220px;
  margin: 20px auto;
  width: 170px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}

.slide-in-bottom {
  animation: slide-in-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.row {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin: 50px auto;
}

.col {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin: 50px auto;
}

@keyframes slide-in-bottom {
  0% {
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.label-img{
  display: block;
  text-align: center;
  color: white;
}

.div-img{
  margin: 0 auto;
  width: 100px;
  height: 100px;
}

.img{
  width: 100px;
  height: 100px;
}

.pourcentage{
  margin-top: 20px;
  display: block;
  font-size: 50px;
  text-align: center;
  color: white;
}
.formbg {
  margin: 0px auto;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px,
  rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
  border-radius: 10px;
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