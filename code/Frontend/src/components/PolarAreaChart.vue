<template>

  <div class="container">
    <div class="col mt-5">
      <div class="row mt-5">
        <h2> Country </h2>
        <PolarArea
            :chart-options="chartOptions"
            :chart-data="chartDataCountry"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        />
      </div>
      <div class="row mt-5">
        <h2> Region </h2>
        <PolarArea
            :chart-options="chartOptions"
            :chart-data="chartDataRegion"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        />
      </div>
      <div class="row mt-5">
        <h2> Department </h2>
        <PolarArea
            :chart-options="chartOptions"
            :chart-data="chartDataDepartement"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
        />
      </div>
    </div>
  </div>

</template>

<script>
import { PolarArea } from 'vue-chartjs'
import * as ChartJS from 'chart.js'
import http from "../http-common";

ChartJS.Chart.register.apply(null, Object.values(ChartJS).filter((chartClass) => (chartClass.id)));

export default {
  name: 'PolarAreaChart',
  components: { PolarArea },
  props: {
    chartId: {
      type: String,
      default: 'polar-area-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartDataCountry: {
        labels: [
        ],
        datasets: [
        ]
      },
      chartDataRegion: {
        labels: [
        ],
        datasets: [
        ]
      },
      chartDataDepartement: {
        labels: [
        ],
        datasets: [
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  methods:{
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getData(){
      let countryArr = [];
      let RegionyArr = [];
      let DepartementArr = [];
      http
          .get("user/getAllUser")
          .then((users => {
            const test = users.data.filter(u => this.idElect(u.autorisedElections).includes(this.$store.state.actualElection._id))
                test.forEach(u => {
                  countryArr.push({category: u.local[0]})
                  RegionyArr.push({category: u.local[1]})
                  DepartementArr.push({category: u.local[2]})
                })
            countryArr = this.indexFct(countryArr);
            RegionyArr = this.indexFct(RegionyArr);
            DepartementArr = this.indexFct(DepartementArr);
            var datCountry = []
            var backColoCountry = []
            var borderColoCountry = []
            var borderWidCountry = []

            var datRegion = []
            var backColoRegion = []
            var borderColoRegion = []
            var borderWidRegion = []

            var datDepartement = []
            var backDepartement = []
            var borderColoDepartement = []
            var borderDepartement = []

            for(const obj in countryArr){
              let match = [this.getRandomInt(256), this.getRandomInt(256), this.getRandomInt(256), 0.2];
              this.chartDataCountry.labels.push(obj)
              datCountry.push(countryArr[obj].length)
              backColoCountry.push('rgba(' + [match[0],match[1],match[2],match[3]].join(',') + ')')
              borderColoCountry.push('rgb(' + [match[0],match[1],match[2]].join(',') + ')')
              borderWidCountry.push(1)
            }

            for(const obj in RegionyArr){
              let match = [this.getRandomInt(256), this.getRandomInt(256), this.getRandomInt(256), 0.2];
              this.chartDataRegion.labels.push(obj)
              datRegion.push(RegionyArr[obj].length)
              backColoRegion.push('rgba(' + [match[0],match[1],match[2],match[3]].join(',') + ')')
              borderColoRegion.push('rgb(' + [match[0],match[1],match[2]].join(',') + ')')
              borderWidRegion.push(1)
            }

            for(const obj in DepartementArr){
              let match = [this.getRandomInt(256), this.getRandomInt(256), this.getRandomInt(256), 0.2];
              this.chartDataDepartement.labels.push(obj)
              datDepartement.push(DepartementArr[obj].length)
              backDepartement.push('rgba(' + [match[0],match[1],match[2],match[3]].join(',') + ')')
              borderColoDepartement.push('rgb(' + [match[0],match[1],match[2]].join(',') + ')')
              borderDepartement.push(1)
            }

            this.chartDataCountry.datasets.push(
                {
                  data: datCountry,
                  backgroundColor: backColoCountry,
                  borderColor: borderColoCountry,
                  borderWidth: borderWidCountry
                    })

            this.chartDataRegion.datasets.push(
                {
                  data: datRegion,
                  backgroundColor: backColoRegion,
                  borderColor: borderColoRegion,
                  borderWidth: borderWidRegion
                })

            this.chartDataDepartement.datasets.push(
                {
                  data: datDepartement,
                  backgroundColor: backDepartement,
                  borderColor: borderColoDepartement,
                  borderWidth: borderDepartement
                })
          }))
    },
    idElect(arrObj){
      let test = []
      arrObj.forEach(o => test.push(o.election))
      return test
    },
    indexFct(arr){
      const test = arr.reduce((group, product) => {
        const { category } = product;
        group[category] = group[category] ?? [];
        group[category].push(product);
        return group;
      }, {});
    return test}
  },
  mounted() {
    this.$nextTick(this.getData)
  }
}
</script>

<style scoped>
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
</style>
