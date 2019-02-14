<template>
  <main>
    <div v-if="user" class="user">
      <header>
        <h1>
          <a v-bind:href="user.url" target="_blank">
            {{ user.first_name }} {{ user.last_name }}
          </a>
        </h1>
      </header>
      <main>
        <ul>
          <li v-for="(board, index) in boards" :key="index">
            <router-link :to="{ name: 'board', params: { id: board.id } }">
              <h2>
                {{ board.name }}
              </h2>
              <p>
                {{ board.description }}
              </p>
              <p>
                {{ board.counts }}
              </p>
            </router-link>
          </li>
        </ul>
      </main>
    </div>

    <Login v-else />
  </main>
</template>

<script>
import { catchErrors, cached } from '../utils';
import { token, getUser, getUserBoards } from '../pinterest';
import { Login } from '@/components';

export default {
  name: 'Boards',
  components: {
    Login,
  },
  data() {
    return {
      token: '',
      user: {},
      boards: [],
    };
  },
  created() {
    this.token = token;
  },
  mounted() {
    const cachedUser = cached('pinterest_user');
    const cachedBoards = cached('pinterest_boards');

    if (cachedUser && cachedBoards) {
      this.user = JSON.parse(cachedUser);
      this.boards = JSON.parse(cachedBoards);
    } else {
      catchErrors(this.getData());
    }
  },
  methods: {
    async getData() {
      const user = await getUser();
      this.user = user.data.data;
      window.localStorage.setItem('pinterest_user', JSON.stringify(this.user));

      const boards = await getUserBoards();
      this.boards = boards.data.data;
      window.localStorage.setItem('pinterest_boards', JSON.stringify(this.boards));
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  padding: 50px;

  header {
    margin-bottom: 100px;
  }

  h1 {
    text-align: center;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 30px;
    width: 100%;

    li {
      a {
        width: 100%;
        padding: 20px;
        border-radius: $radius;

        &:hover,
        &:focus {
          background: $grey;
        }
      }
    }
  }
}
</style>
