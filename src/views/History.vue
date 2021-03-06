<template>
  <div>
    <div class="page-title">
      <h3>{{ 'History' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center"
       v-else-if="!records.length">
      {{ 'No posts yet.' | localize}}
      <router-link to="/record">
        {{ 'Add first'  | localize}}
      </router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Paginate :page-count="pageCount"
                v-model="page"
                :click-handler="pageChangeHanlder"
                :prev-text="'Back' | localize"
                :next-text="'Next' | localize"
                :page-class="'waves-effect'"
                :container-class="'pagination'"/>
    </section>

  </div>
</template>

<script>
  import HistoryTable from '../components/HistoryTable';
  import paginationMixin from '../mixins/pagination.mixin'
  import { Pie } from 'vue-chartjs'

  export default {
    name: "History",
    mixins: [paginationMixin],
    extends: Pie,
    components: {HistoryTable},
    metaInfo() {
      return {
        title: this.$title('History')
      }
    },
    data() {
      return {
        loading: true,
        records: [],
      }
    },

    async mounted() {

      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.setUp(categories);

      this.loading = false
    },
    methods: {
      setUp(categories) {

        this.setUpPagination(this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход',
          }
        }));

        this.renderChart({
          labels: categories.map(c => c.title),
          datasets: [{
            label: 'Расходи по категориям',
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }

                return total
              }, 0)
            }),

            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1
          }]

        })
      }
    }

  }
</script>

<style scoped>

</style>
