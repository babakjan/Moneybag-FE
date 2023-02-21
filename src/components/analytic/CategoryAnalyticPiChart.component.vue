<template>
  <div class="container">
    <h2 v-if="!recordsAnalyticByCategoryLoading" class="main">Categories</h2>
    <apexchart
      v-if="!recordsAnalyticByCategoryLoading"
      type="donut"
      :width="width"
      :options="piChartData.options"
      :series="piChartData.series"
      class="pi-chart"
    />
    <v-skeleton-loader v-else type="image" class="skeleton" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import categoryApi, { CategoryAnalytic } from "@/api/categoryApi";
import errorMessage from "@/services/errorMessage";

@Component
export default class CategoryAnalyticPiChart extends Vue {
  @Prop({ default: 500 }) width!: number;
  categoryAnalytics = [] as CategoryAnalytic[];
  recordsAnalyticByCategoryLoading = false;
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

  getPiChartData() {
    this.recordsAnalyticByCategoryLoading = true;
    categoryApi
      .getAnalytic()
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
      .finally(() => (this.recordsAnalyticByCategoryLoading = false));
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
