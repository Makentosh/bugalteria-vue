<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Exchange rate' | localize}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'Currency' | localize }}</th>
            <th>Продажа</th>
            <th>Купить</th>
<!--            <th>{{ 'Currency' | localize }}</th>-->
<!--            <th>{{'Course' | localize}}</th>-->
<!--            <th>{{'Date' | localize}}</th>-->
          </tr>
          </thead>

          <tbody>
<!--          <tr v-for="cur in currencies"-->
<!--              :key="cur">-->
<!--            <td>{{ cur }}</td>-->
<!--            <td>{{ rates[cur].toFixed(2) }}</td>-->
<!--            <td>{{ date | date('date') }}</td>-->
<!--          </tr>-->
          <tr v-for="rate in rates"
              :key="rate.ccy">
            <td>{{ rate.ccy }}</td>
            <td>{{ rate.buy }}</td>
            <td>{{ rate.sale }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeCurrency",
    props: ['rates'],
    data() {
      return {
        // currencies: ['UAH', 'USD', 'EUR']
      }
    }
  }
</script>

<style scoped>

</style>
