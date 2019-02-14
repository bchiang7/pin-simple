<template>
  <div v-if="user" class="user">
    <h1>
      <a v-bind:href="user.url" target="_blank">
        {{ user.first_name }} {{ user.last_name }}
      </a>
    </h1>
  </div>
</template>

<script>
import { catchErrors } from '../utils';
import { getUser, getUserBoards } from '../pinterest';

export default {
  name: 'User',
  data() {
    return {
      user: null,
      boards: [],
    };
  },
  mounted() {
    catchErrors(this.getData());
  },
  methods: {
    async getData() {
      const user = await getUser();
      this.user = user.data.data;

      const boards = await getUserBoards();
      this.boards = boards.data;
      // console.log(this.boards);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
