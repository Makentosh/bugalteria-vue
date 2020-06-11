<template>
  <ul class="sidenav app-sidenav" :class="{'open': value}">
    <router-link tag="li"
                 active-class="active"
                  :to="link.url"
                  v-for="(link, index) in links"
                  :key="index"
                  :exact="link.exact">
      <a href="#" class="waves-effect waves-orange pointer">
        {{ link.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
  import localizeFilter from '../../filters/localize.filter';

  export default {
    name: "Sidebar",
    props: ['value'],
    data() {
      return {
        links: [
          {url: '/', title: localizeFilter('Bill'), exact: true},
          {url: '/history', title: localizeFilter('History'), exact: false},
          {url: '/planing', title: localizeFilter('Planing'), exact: false},
          {url: '/record', title: localizeFilter('Record'), exact: false},
          {url: '/categories', title: localizeFilter('Categories'), exact: false},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
