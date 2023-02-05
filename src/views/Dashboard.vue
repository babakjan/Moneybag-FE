<template>
  <div class="pt-16"><h1>Dashboard</h1></div>
</template>

<script lang="ts">
import AccountApi from "@/api/accountApi";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Dashboard extends Vue {
  created(): void {
    AccountApi.getAllAccounts();
  }
}
</script>
