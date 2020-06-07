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
  export default {
    name: "Sidebar",
    props: ['value'],
    data() {
      return {
        links: [
          {url: '/', title: 'Счет', exact: true},
          {url: '/history', title: 'История', exact: false},
          {url: '/planing', title: 'Планирование', exact: false},
          {url: '/record', title: 'Новая запись', exact: false},
          {url: '/categories', title: 'Категории', exact: false},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
