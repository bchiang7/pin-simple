<template>
  <div>
    <div v-if="token && user" class="container user">
      <button @click="logoutUser" class="logout">
        Logout
      </button>

      <header>
        <img :src="user.image['60x60'].url" alt="user image">
        <div>
          <h1>
            {{ user.first_name }} {{ user.last_name }}
          </h1>
          <p>
            <span>{{ user.counts.followers }} Followers &middot;&nbsp;</span>
            <span>{{ user.counts.following }} Following &middot;&nbsp;</span>
            <span>{{ user.counts.boards }} Boards &middot;&nbsp;</span>
            <span>{{ user.counts.pins }} Pins</span>
          </p>
        </div>
      </header>
      <main>
        <ul class="grid">
          <li
            v-for="(board, index) in boards"
            :key="index"
            class="board"
          >
            <router-link :to="{ name: 'board', params: { id: board.id } }">
              <img :src="board.image['60x60'].url" alt="board image">
              <div class="board__details">
                <h2>{{ board.name }}</h2>
                <p>{{ board.counts.pins }} Pins</p>
              </div>
            </router-link>
          </li>
        </ul>
      </main>
    </div>

    <Login v-else />
  </div>
</template>

<script>
import { catchErrors, cache, cached } from '@/utils';
import { token, getUser, getUserBoards, logout } from '@/pinterest';
import { Login } from '@/components';

export default {
  name: 'Boards',
  components: {
    Login,
  },
  data() {
    return {
      token: '',
      user: null,
      boards: [],
    };
  },
  created() {
    this.token = token;
  },
  mounted() {
    // Remove the caching logic once app gets approved
    const cachedUser = cached('pinterest_user');
    const cachedBoards = cached('pinterest_boards');

    if (cachedUser && cachedBoards) {
      this.user = JSON.parse(cachedUser);
      this.boards = JSON.parse(cachedBoards);
    } else {
      console.warn('Getting user data');

      if (this.token) {
        catchErrors(this.getData());
      }
    }
  },
  methods: {
    async getData() {
      const user = await getUser();
      this.user = user.data.data;
      // Remove this line once app gets approved
      cache('pinterest_user', JSON.stringify(this.user));

      const boards = await getUserBoards();
      this.boards = boards.data.data;
      // Remove this line once app gets approved
      cache('pinterest_boards', JSON.stringify(this.boards));
    },
    logoutUser() {
      logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.logout {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  background-color: $grey;
  font-size: $fz-sm;
  border-radius: $radius;
  padding: 10px 15px;

  &:hover,
  &:focus {
    background-color: $medium-grey;
  }
}

.user {
  header {
    display: flex;
    align-items: center;

    img {
      max-width: 70px;
      border-radius: 100%;
      margin-right: 20px;
    }

    p {
      font-size: $fz-sm;
      margin: 0;
    }
  }

  .grid {
    .board {
      a {
        display: flex;
        align-items: center;

        img {
          margin-right: 20px;
          max-width: 60px;
        }
      }
    }
  }
}
</style>
