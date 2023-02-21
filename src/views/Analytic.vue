<template>
  <section class="max-width main">
    <h1 class="main mb-8">Analytic</h1>
    <div class="row">
      <!--spending-->
      <v-card class="card">
        <TotalAnalyticComponent />
      </v-card>

      <!--pi chart-->
      <v-card class="card">
        <CategoryAnalyticPiChart />
      </v-card>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CategoryAnalyticPiChart from "@/components/analytic/CategoryAnalyticPiChart.component.vue";
import TotalAnalyticComponent from "@/components/analytic/TotalAnalytic.component.vue";

@Component({
  components: { CategoryAnalyticPiChart, TotalAnalyticComponent },
})
export default class Analytic extends Vue {
  created(): void {
    this.createdOrActivated();
  }

  activated(): void {
    this.createdOrActivated();
  }

  createdOrActivated(): void {
    //
  }
}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.card {
  width: 50%;
  height: 400px;
}

@media only screen and (max-width: 1200px) {
  .row {
    flex-direction: column;
  }

  .card {
    width: 100%;
  }
}

@media only screen and (max-width: 550px) {
  .card {
    height: auto;
  }
}
</style>
