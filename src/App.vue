<template>
  <h1>{{ message }}</h1>
  <HelloWorld />
</template>

<script>
  import HelloWorld from '~/components/HelloWolrd'
  export default {
    components: {
      HelloWorld
    },
    data() {
      return {
        message: 'Hello Vue!!!'
      }
    }
  }
</script>