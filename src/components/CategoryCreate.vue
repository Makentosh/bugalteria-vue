<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Create' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{ 'Title' | localize}}</label>
          <span class="helper-text invalid"
                v-if="$v.title.$dirty && !$v.title.required">
            {{'Enter a category name' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{'Limit' | localize }}</label>
          <span class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue">
            {{`Minimum value` | localize}} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Create' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {required, minValue} from 'vuelidate/lib/validators';

  export default {
    name: "CategoryCreate",
    validations: {
      title: { required },
      limit: { minValue: minValue(100) }
    },
    data() {
      return {
        title: '',
        limit: 100
      }
    },
    mounted() {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    },
    methods: {
      async submitHandler() {
        if(this.$v.$invalid) {
          this.$v.$touch()
          return
        }


        const data = {
          title: this.title,
          limit: this.limit
        };

        try {
          const category = await this.$store.dispatch('createCategory', data);
          this.limit = 100;
          this.title = '';
          this.$v.$reset();
          this.$message('Категория била создана');
          this.$emit('created', category)
        } catch (e) {
          console.log(e)
        }

      }
    }
  }
</script>

<style scoped>

</style>
