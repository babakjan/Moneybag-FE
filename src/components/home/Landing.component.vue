<template>
  <div class="row">
    <!-- left column -->
    <div class="column left">
      <h1 class="proposition">Manage your personal finance like a pro.</h1>

      <!-- details -->
      <p class="details">
        Get rid of your Exel spreadsheets and start managing your personal
        finance like a pro. Add records on the go, analyze your income and
        expenses, and more...
      </p>

      <!-- call to action -->
      <v-btn color="secondary" large class="cto" rounter to="/register">
        <v-icon left>mdi-account-plus-outline</v-icon>
        Sign up
      </v-btn>
    </div>

    <!-- right column -->
    <div class="column right">
      <img
        src="/landing.svg"
        alt="Image of person analyzing finance."
        class="landing-img"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Landing extends Vue {}
</script>

<style scoped>
.row {
  display: flex;
  height: calc(100vh - 4rem);
}

.column {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.column.left {
  margin-top: 10%;
}

.column.right {
  justify-content: center;
  align-items: center;
}

.proposition {
  font-size: 5rem;
  line-height: 1.3;
}

.details {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.cto {
  width: 12rem;
}

.landing-img {
  height: 35rem;
}

@media only screen and (max-width: 1200px) {
  .row {
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 4rem);
    justify-content: flex-end;
  }

  .column {
    width: 100%;
    margin-top: 3rem;
  }

  .column.left {
    margin-top: 4rem;
    order: 2;
  }

  .landing-img {
    height: 25rem;
  }

  .proposition {
    font-size: 4rem;
  }
}

@media only screen and (max-width: 800px) {
  .column.left {
    margin-top: 2rem;
  }

  .proposition {
    font-size: 4rem;
  }

  .details {
    font-size: 1.25rem;
    margin: 1rem auto;
  }

  .landing-img {
    height: 21rem;
  }

  .cto {
    align-self: center;
    justify-self: center;
    margin: 0 auto 0.5rem auto;
  }
}

@media only screen and (max-width: 600px) {
  .column.left,
  .column.right {
    margin-top: 1.5rem;
  }

  .proposition {
    font-size: 3rem;
  }

  .details {
    font-size: 1rem;
    /* margin-top: ; */
  }
}

@media only screen and (max-width: 500px) {
  .cto {
    width: 100%;
  }
}

@media only screen and (max-width: 400px) {
  .proposition {
    font-size: 2.5rem;
  }
}

/* iphone 6/7/8 Plus */
@media only screen and (max-width: 420px) and (max-height: 740px) {
  .proposition {
    font-size: 2.25rem;
  }

  .landing-img {
    height: 18.5rem;
  }
}

/* iphone SE */
@media only screen and (max-width: 420px) and (max-height: 700px) {
  .landing-img {
    height: 15rem;
  }
}

/* ipad */
@media only screen and (min-height: 1000px) {
  .cto {
    margin-bottom: 8rem;
  }
}
</style>
