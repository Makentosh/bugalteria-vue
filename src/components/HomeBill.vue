<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue">
      <div class="card-content white-text">
        <span class="card-title">
          {{ 'Currency Account' | localize}}
        </span>

<!--        <p class="currency-line"-->
<!--           v-for="cur in currencies"-->
<!--           :key="cur">-->
<!--          <span>{{ getCurrency(cur) | currency(cur) }}</span>-->
<!--        </p>-->
        <p class="currency-line"
           v-for="rate in rates"
           :key="rate.ccy">
          <template v-if="rate.ccy === 'BTC' ">
            <span>{{ ((base / currentUSD.buy) / rate.buy  ).toFixed(3) }} {{ rate.ccy }}</span>
          </template>
          <span v-else>{{ (base / rate.buy).toFixed(2) }} {{ rate.ccy }}</span>


        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeBill",
    props: ['rates'],
    data() {
      return {
        currencies: ['UAH', 'USD', 'EUR'],
        currentUSD: []
      }
    },
    computed: {
      base() {
        return this.$store.getters.info.bill
      },

    },
    mounted() {
      this.currentUSDRate();
    },
    methods: {
      // getCurrency(currency) {
      //   return Math.floor(this.base * this.rates[currency])
      // }
      currentUSDRate() {
        this.rates.forEach(rate => {
          if (rate.ccy === 'USD') {
            this.currentUSD = rate;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
