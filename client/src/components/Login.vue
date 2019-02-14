<template>
  <div class="login">
    <a href="https://6a2d7f89.ngrok.io/login">
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

  a {
    background-color: $red;
    color: $white;
    padding: 8px 16px;
    border-radius: $radius;
    font-weight: 700;
    font-size: $fz-md;

    &:hover,
    &:focus {
      background-color: $red-hover;
    }
  }
}
</style>
