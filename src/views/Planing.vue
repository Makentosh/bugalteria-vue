<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Planing' | localize }}</h3>
      <h4>{{ info.bill | currency}}</h4>
    </div>
    <Loader v-if="loading"/>

    <p v-else-if="categories.length === 0"
       class="center">
      {{'There are no categories yet.' | localize}} <router-link to="/categories">{{ 'Add category' | localize}}</router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.title }}</strong>
         {{ category.spend | currency}} из {{ category.limit | currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import currencyFilter from '../filters/currency.filter';

  export default {
    name: "Planing",
    metaInfo() {
      return {
        title: this.$title('Planing')
      }
    },
    data() {
      return {
        loading: true,
        categories: []
      }
    },
    computed: {
      ...mapGetters(['info'])
    },
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.categories = categories.map(cat => {
        const spend = records
              .filter(r => r.categoryId === cat.id && r.type === 'outcome')
              .reduce((total, record) => {
                return total += +record.amount
              }, 0);

        const percent = 100 * spend / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60
                ? 'green'
                : percent < 100
                    ? 'yellow'
                    : 'red';

        const tooltipValue = cat.limit - spend;
        const tooltip = `${tooltipValue < 0 ? 'Превищение на ' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      });

      this.loading = false;
    },
  }
</script>

<style scoped>

</style>
