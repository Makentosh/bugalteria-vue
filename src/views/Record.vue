<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Record' | localize }}</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="categories.length === 0"
       class="center">
      {{ 'There are no categories yet.' | localize }}
      <router-link to="/categories">{{'Add category' | localize}}</router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="category in categories"
                  :key="category.id"
                  :value="category.id">
            {{ category.title }}
          </option>
        </select>
        <label>{{'Select a category' | localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{ 'Sum' | localize }}</label>
        <span class="helper-text invalid"
              v-if="$v.amount.$dirty && !$v.amount.minValue">
            {{ 'Minimum value' | localize}} {{ $v.amount.$params.minValue.min }}
          </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"

        >
        <label for="description">{{ 'Description' | localize }}</label>
        <span class="helper-text invalid"
               v-if="$v.description.$dirty && !$v.description.required">
          {{ 'Enter a description' | localize }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';
  import {mapGetters} from 'vuex';

  export default {
    name: "Record",
    validations: {
      amount: { minValue: minValue(1) },
      description: { required }
    },
    metaInfo() {
      return {
        title: this.$title('Record')
      }
    },
    data() {
      return {
        categories: [],
        loading: true,
        select: null,
        category: null,
        type: 'outcome',
        amount: 1,
        description: ''
      }
    },

    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;

      if (this.categories.length) {
        this.category = this.categories[0].id
      }


      setTimeout(() => {
        // eslint-disable-next-line no-undef
        M.updateTextFields();
        // eslint-disable-next-line no-undef
        this.select = M.FormSelect.init(this.$refs.select)
      },0)


    },
    computed: {
      ...mapGetters(['info']),

      canCreateRecord() {
        if (this.type === 'income') {
          return true
        }

        return this.info.bill >= this.amount
      }
    },
    methods: {
      async submitHandler() {
        if(this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        if (this.canCreateRecord) {

          try {

            const data = {
              type: this.type,
              categoryId: this.category,
              description: this.description,
              amount: this.amount,
              data: new Date().toJSON()
            };

            await this.$store.dispatch('createRecord', data);

            const bill = this.type === 'income'
                ? this.info.bill + this.amount
                : this.info.bill - this.amount;

            this.$store.dispatch('updateInfo', {bill});
            this.$message('Запись успешно создана');
            this.$v.$reset();
            this.amount = 1;
            this.description = '';

          } catch (e) {
            console.log(e)
          }


        } else {
          this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
        }



      }
    },
    beforeDestroy() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    }
  }
</script>

<style scoped>

</style>
