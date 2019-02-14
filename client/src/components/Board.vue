<template>
  <div class="board">
    <h1>
      {{ board.name }}
    </h1>
    <ul>
      <li v-for="(pin, index) in pins" :key="index">
        Pin
      </li>
    </ul>
  </div>
</template>

<script>
import { catchErrors, cached } from '../utils';
import { getBoard, getBoardPins } from '../pinterest';

export default {
  name: 'User',
  data() {
    return {
      board: null,
      pins: [],
    };
  },
  mounted() {
    const cachedBoard = cached('pinterest_board');
    const cachedPins = cached('pinterest_pins');

    if (cachedBoard && cachedPins) {
      this.board = JSON.parse(cachedBoard);
      this.pins = JSON.parse(cachedPins);
    } else {
      catchErrors(this.getData());
    }
  },
  methods: {
    async getData() {
      const board = await getBoard(this.$route.params.id);
      this.board = board.data.data;
      window.localStorage.setItem('pinterest_board', JSON.stringify(this.board));

      const pins = await getBoardPins(this.$route.params.id);
      this.pins = pins.data.data;
      window.localStorage.setItem('pinterest_pins', JSON.stringify(this.pins));
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  padding: 50px;

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
