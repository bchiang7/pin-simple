<template>
  <div class="pin">
    <img src="https://i-h1.pinimg.com/236x/e4/d9/8c/e4d98cb4e7406e28a636d68fd04e38f3.jpg" alt="">
  </div>
</template>

<script>
// import { catchErrors } from '../utils';
// import { getPin } from '../pinterest';

export default {
  name: 'User',
  data() {
    return {
      pin: null,
    };
  },
  mounted() {
    // catchErrors(this.getData());
  },
  methods: {
    async getData() {

    },
  },
};
</script>

<style lang="scss" scoped>
.pin {
  img {
    max-width: 100%;
  }
}
</style>
