<template>
  <section id="start" class="max-width">
    <!-- landing -->
    <Landing />

    <div class="cards">
      <FeatureCard
        v-for="(featureCard, index) in featureCards"
        :key="index"
        :content="featureCard"
      />
    </div>

    <div id="about" style="height: 100vh">
      <h2 class="pt-16">About</h2>
    </div>
    <div id="contact" style="height: 100vh">
      <h2 class="pt-16">Contact</h2>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Landing from "@/components/home/Landing.component.vue";
import FeatureCard from "@/components/home/FeatureCard.component.vue";
import { FeatureCardContent } from "@/components/home/FeatureCard.component.vue";

@Component({
  components: { Landing, FeatureCard },
})
export default class Home extends Vue {
  featureCards = [
    {
      title: "Transaction Tracking",
      text:
        "Track and categorize all your incomes and expenses. Track your spending history " +
        "Improve your financial health and learn saving money and budgeting.",
      icon: "mdi-cash-multiple",
    },
    {
      title: "Multiple Accounts",
      text:
        "Create multiple accounts for different purposes like Current account, Saving " +
        "accounts, Investments, Cash...",
      icon: "mdi-bank-outline",
    },
    {
      title: "Analyze data",
      text:
        "Analyze financial reports of your incomes, expenses and cashflow. Visualize balance " +
        "evolution sor spending by category and more...",
      icon: "mdi-finance",
    },
  ] as FeatureCardContent[];
}
</script>

<style scoped>
.cards {
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5rem;
}
</style>
