<template>
  <div class="container">
    <h2 v-if="!categoryAnalyticLoading" class="main">Categories</h2>

    <!--no date from date interval-->
    <div class="no-records" v-if="categoryAnalytics.length === 0">
      No records between {{ formattedDateInterval }}
    </div>

    <!--pi chart-->
    <apexchart
      v-if="!categoryAnalyticLoading && categoryAnalytics.length > 0"
      type="donut"
      :width="width"
      :height="height"
      :options="piChartData.options"
      :series="piChartData.series"
      class="pi-chart"
    />

    <!--skeleton loader-->
    <v-skeleton-loader
      v-if="categoryAnalyticLoading"
      type="image"
      class="skeleton"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";
import categoryApi, { CategoryAnalytic } from "@/api/categoryApi";
import errorMessage from "@/services/errorMessage";
import { formatDate } from "@/utils/formatDate";
import getDateIntervalApiParameters from "@/utils/dateIntervalApiParameters";

@Component
export default class CategoryAnalyticPiChart extends Vue {
  @Prop({ default: () => [] }) dateInterval!: string[];
  @Prop({ default: 500 }) width!: number;
  @Prop({ default: 286 }) height!: number;
  categoryAnalytics = [] as CategoryAnalytic[];
  categoryAnalyticLoading = false;
  piChartData = {
    options: {
      labels: [] as string[],
      colors: [] as string[],
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 370,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: [] as number[],
  };

  get formattedDateInterval() {
    return (
      formatDate(this.dateInterval[0]) +
      " - " +
      formatDate(this.dateInterval[1])
    );
  }

  @Action("snackbar/showSnack") showSnack!: (text: string) => void;

  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    this.getPiChartData();
  }

  //get pi chart data from api
  getPiChartData() {
    this.categoryAnalyticLoading = true;
    categoryApi
      .getAnalytic(getDateIntervalApiParameters(this.dateInterval))
      .then((response) => {
        this.categoryAnalytics = response.data;
        this.piChartData.options.labels = this.categoryAnalytics.map(
          (c: CategoryAnalytic) => c.category.name
        );
        this.piChartData.series = this.categoryAnalytics.map(
          (c: CategoryAnalytic) => c.amount
        );
        this.piChartData.options.colors = this.categoryAnalytics.map(
          (c: CategoryAnalytic) => c.category.color
        );
      })
      .catch((error) => this.showSnack(errorMessage.get(error)))
      .finally(() => (this.categoryAnalyticLoading = false));
  }

  //when date interval changes, reload data
  @Watch("dateInterval")
  onDateIntervalChange(): void {
    if (this.dateInterval.length === 2) {
      this.getPiChartData();
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0 2rem 2rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.pi-chart {
  padding-bottom: 1rem;
  margin: auto;
}

h2 {
  text-align: center;
  padding: 1rem 0;
}

.skeleton {
  width: 100%;
  height: 100%;
}

.no-records {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 550px) {
  .container {
    padding: 0;
    align-items: flex-start;
  }

  h2 {
    text-align: start;
    padding-left: 1em;
  }
}
</style>
