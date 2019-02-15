<template>
  <div class="login">
    <h1>Pin Simple</h1>
    <a :href="loginURI">
      Login to Pinterest
    </a>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginURI: process.env.NODE_ENV !== 'production'
        ? 'https://localhost:8888/login'
        : 'https://pin-simple.herokuapp.com/login',
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  @include flex-center;
  flex-direction: column;
  height: 80vh;
  max-height: 100vh;

  h1 {
    margin-bottom: 30px;
    font-size: 50px;
  }

  a {
    background-color: $red;
    color: $white;
    font-weight: 700;
    font-size: $fz-md;

    &:hover,
    &:focus {
      background-color: $red-hover;
    }
  }
}
</style>
