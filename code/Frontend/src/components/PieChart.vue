<template>
  <Pie
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
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale} from 'chart.js'
import http from "../http-common";

ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale);

export default {
  extends: Pie,
  name: 'PieChart',
  components: { Pie },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
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
    //votant //non votants
    return {
      chartData: {
        labels: [
          'Has Voted',
          'Has not Voted'
        ],
        datasets: [{
          label: 'Dataset',
          data: [0, 0],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(128, 128, 128)',
          ],
          hoverOffset: 4
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },
  methods: {
    getAllVotes(){
      http
          .get("user/getAllUser")
          .then((users => {
            let allIdElection = [];
            users.data.forEach(u => allIdElection.push(this.idElect(u.autorisedElections)));
            const nombreTot = allIdElection.flat().filter(id => id === this.$store.state.actualElection._id).length
            this.$store.state.nombreTotVotants = nombreTot;
            const reducer = (accumulator, curr) => accumulator + curr;
            const nombreVote = this.$store.state.actualElection.resultats.reduce(reducer);
            this.chartData.datasets[0].data[0] = nombreVote;
            this.chartData.datasets[0].data[1] = nombreTot - nombreVote;
            // this.chartData.datasets[0].data.push(nombreVote, nombreTot - nombreVote)
            // console.log(this.chartData)
          }))
    },
    idElect(arrObj){
      let test = []
      arrObj.forEach(o => test.push(o.election))
      return test
    },
  },
  mounted() {
      this.$nextTick(this.getAllVotes);
  }
  /* // old do not use, do not delete either still useful
  extends: Pie,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  mounted() {
    const voted = this.chartData.map(d => d.voted);
    const notVoted = this.chartData.map(d => d.notVoted);

    this.renderChart(
      {
        labels: [
          'Has Voted',
          'Has not Voted'
        ],
        datasets: [{
          label: this.label,
          data: [voted, notVoted],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        }]
      },
      this.options
    );
  }
  */
};
</script>
