<template>
  <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
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
      chartData: {
        labels: [
          ''
        ],
        datasets: [
            // {
        //   label: 'Kupata',
        //   data: [65],
        //   backgroundColor: 'rgba(255, 099, 132, 0.2)',
        //   borderColor: 'rgb(255, 099, 132)',
        //   borderWidth: 1
        // },
        // {
        //   label: 'Roro',
        //   data: [59],
        //   backgroundColor: 'rgba(255, 159, 064, 0.2)',
        //   borderColor: 'rgb(255, 159, 064)',
        //   borderWidth: 1
        // },
        //   {
        //     label: 'Tonio',
        //     data: [80],
        //     backgroundColor: 'rgba(255, 205, 086, 0.2)',
        //     borderColor: 'rgb(255, 205, 086)',
        //     borderWidth: 1
        //   },
        //   {
        //     label: 'Franco',
        //     data: [37],
        //     backgroundColor: 'rgba(075, 192, 192, 0.2)',
        //     borderColor: 'rgb(075, 192, 192)',
        //     borderWidth: 1
        //   },
        //   {
        //     label: 'Benji',
        //     data: [56],
        //     backgroundColor: 'rgba(054, 162, 235, 0.2)',
        //     borderColor: 'rgb(054, 162, 235)',
        //     borderWidth: 1
        //   },
        //   {
        //     label: 'Hermanno',
        //     data: [55],
        //     backgroundColor: 'rgba(153, 102, 255, 0.2)',
        //     borderColor: 'rgb(153, 102, 255)',
        //     borderWidth: 1
        //   }

          /*
        label: 'Dataset',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          'rgba(255, 099, 132, 0.2)',
          'rgba(255, 159, 064, 0.2)',
          'rgba(255, 205, 086, 0.2)',
          'rgba(075, 192, 192, 0.2)',
          'rgba(054, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgb(255, 099, 132)',
          'rgb(255, 159, 064)',
          'rgb(255, 205, 086)',
          'rgb(075, 192, 192)',
          'rgb(054, 162, 235)',
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }
      */
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
      for(let i = 0; i < this.$store.state.actualElection.resultats.length; i++){
        let match = [this.getRandomInt(256), this.getRandomInt(256), this.getRandomInt(256), 0.2];
        this.chartData.datasets.push(
            {label: this.$store.state.actualElection.choix[i].value,
              data: [this.$store.state.actualElection.resultats[i]],
              image: this.$store.state.actualElection.choix[i].img,
              backgroundColor: 'rgba(' + [match[0],match[1],match[2],match[3]].join(',') + ')',
              borderColor: 'rgb(' + [match[0],match[1],match[2]].join(',') + ')',
              borderWidth: 1
        })
      }
      this.chartData.datasets.sort(function (a, b){
        return b.data[0] - a.data[0]
      });
      this.$store.state.actualResult = this.chartData.datasets;
    }
  },
  mounted() {
    this.$nextTick(this.getData)
  }
};
</script>
