<template>
  <div class="login">
    <a href="https://localhost:8888/login">
      Login to Pinterest
    </a>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="scss" scoped>
.login {
  @include flex-center;
  height: 100vh;
  max-height: 100vh;

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
