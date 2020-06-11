<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p class="center"
       v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">
        Добавьте первую
      </router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Paginate :page-count="pageCount"
                v-model="page"
                :click-handler="pageChangeHanlder"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :page-class="'waves-effect'"
                :container-class="'pagination'"/>
    </section>

  </div>
</template>

<script>
  import HistoryTable from '../components/HistoryTable';
  import paginationMixin from '../mixins/pagination.mixin'


  export default {
    name: "History",
    mixins: [paginationMixin],
    components: {HistoryTable},
    data() {
      return {
        loading: true,
        records: [],
      }
    },

    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.setUpPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      }));

      this.loading = false
    }

  }
</script>

<style scoped>

</style>
