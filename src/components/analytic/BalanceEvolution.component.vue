<template>
  <div class="container" :style="'min-height:' + height + 'px;'">
    <h2 v-if="!balanceEvolutionLoading" class="main">Balance</h2>

    <!--line chart-->
    <apexchart
      v-if="!balanceEvolutionLoading"
      :options="chartData.options"
      :series="chartData.series"
      :height="height"
      :width="width"
    />

    <!--skeleton loader-->
    <v-skeleton-loader v-else type="image" class="skeleton" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import userApi, { TimeSeriesEntry } from "@/api/userApi";
import { Action } from "vuex-class";
import errorMessage from "@/services/errorMessage";
import getDateIntervalApiParameters from "@/utils/dateIntervalApiParameters";

@Component
export default class BalanceEvolution extends Vue {
  @Prop({ default: () => [] }) dateInterval!: string[];
  @Prop({ default: 1300 }) width!: number;
  @Prop({ default: 500 }) height!: number;
  balanceEvolutionLoading = false;

  chartData = {
    options: {
      chart: {
        id: "balance evolution",
        width: 1300,
      },
      xaxis: {
        type: "datetime",
        categories: [] as string[],
      },
      stroke: {
        curve: "smooth",
      },
      responsive: this.responsive,
    },
    series: [
      {
        name: "Balance evolution",
        data: [] as TimeSeriesEntry[],
      },
    ],
  };

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.getBalanceEvolution();
  }

  //get balance evolution (time series) from api
  getBalanceEvolution() {
    this.balanceEvolutionLoading = true;
    userApi
      .getBalanceEvolution(getDateIntervalApiParameters(this.dateInterval))
      .then((response) => (this.chartData.series[0].data = response.data))
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.balanceEvolutionLoading = false));
  }

  //when date interval changes, reload data
  @Watch("dateInterval")
  onDateIntervalChange(): void {
    if (this.dateInterval.length === 2) {
      this.getBalanceEvolution();
    }
  }

  //responsive breakpoint for chart
  get responsive(): {
    breakpoint: number;
    options: { chart: { width: number; height: number } };
  }[] {
    const start = {
      breakpoint: 1450,
      options: {
        chart: {
          width: 1200,
        },
      },
    };
    const result = [] as {
      breakpoint: number;
      options: { chart: { width: number; height: number } };
    }[];
    for (let i = 0; i < (start.options.chart.width - 300) / 45; i++) {
      result.push({
        breakpoint: start.breakpoint - i * 50,
        options: {
          chart: {
            width: start.options.chart.width - i * 45,
            height: 500,
          },
        },
      });
    }
    result.push({
      breakpoint: 400,
      options: {
        chart: {
          width: 300,
          height: 400,
        },
      },
    });
    return result;
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

apexchart {
  padding: 0 2rem 2rem 2rem;
}

h2 {
  text-align: center;
  padding: 1rem 0;
}

.skeleton {
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 550px) {
  h2 {
    text-align: start;
    padding-left: 1em;
    align-self: flex-start;
  }
}
</style>
