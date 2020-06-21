<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Bill' | localize}}</h3>

      <button class="btn waves-effect waves-light btn-small"
              @click.prevent="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>

    <div v-else class="row">
      <HomeBill :rates="currency"/>
<!--      <HomeBill :rates="currency.rates"/>-->

<!--      <HomeCurrency :rates="currency.rates"-->
<!--                    :date="currency.date"/>-->
      <HomeCurrency :rates="currency"/>
    </div>
  </div>
</template>

<script>


  import HomeBill from '../components/HomeBill';
  import HomeCurrency from '../components/HomeCurrency';

  export default {
    name: 'Home',
    components: {HomeCurrency, HomeBill},
    metaInfo() {
      return {
        title: this.$title('Home')
      }
    },
    data() {
      return {
        loading: true,
        currency: null
      }
    },
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
    methods: {
      async refresh() {
        this.loading = true;
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false;

      }
    }
  }
</script>
