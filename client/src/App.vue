<template>
  <div id="app">
    <User v-if="token" />
    <Login v-else />
  </div>
</template>

<script>
import { token } from './pinterest';

import Login from './components/Login.vue';
import User from './components/User.vue';

export default {
  name: 'App',
  components: {
    Login,
    User,
  },
  data() {
    return {
      token: '',
    };
  },
  created() {
    this.token = token;
  },
};
</script>

<style lang="scss">
@import './styles/main.scss';
#app {
  padding: 50px;
}
</style>
