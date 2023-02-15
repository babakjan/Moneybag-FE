<template>
  <section class="max-width main">
    <AccountsSection class="mb-10" />
    <RecordsSection />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountsSection from "@/components/dahboard/AccountSection.component.vue";
import RecordsSection from "@/components/dahboard/RecordsSection.component.vue";

@Component({
  components: { AccountsSection: AccountsSection, RecordsSection },
})
export default class Dashboard extends Vue {}
</script>

<style scoped></style>
