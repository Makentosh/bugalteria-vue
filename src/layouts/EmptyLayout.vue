<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
  import messages from '../utils/messages';

  export default {
    name: "EmptyLayout",
    data() {
      return {

      }
    },
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(fbError) {
        this.$error(messages[fbError.code] || 'Чтото пошло не так');
      }
    }
  }
</script>

<style scoped>

</style>
