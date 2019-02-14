<template>
  <div v-if="board" class="container board">
    <header>
      <h1>{{ board.name }}</h1>
      <p>{{ board.counts.pins }} Pins</p>
      <a :href="board.url">
        View on Pinterest
        <svg
          class="gUZ pBj"
          height="15"
          width="15"
          viewBox="0 0 24 24"
          aria-label="Visit home4rt.com"
          role="img"
        >
          <path d="M4.9283,1 C3.6273,1 2.5713,2.054 2.5713,3.357 C2.5713,4.66 3.6273,5.714 4.9283,5.714 L14.9523,5.714 L1.6893,18.976 C0.7703,19.896 0.7703,21.389 1.6893,22.31 C2.1503,22.771 2.7533,23 3.3573,23 C3.9603,23 4.5633,22.771 5.0243,22.31 L18.2853,9.047 L18.2853,19.071 C18.2853,20.374 19.3413,21.429 20.6433,21.429 C21.9443,21.429 23.0003,20.374 23.0003,19.071 L23.0003,1 L4.9283,1 Z" />
        </svg>
      </a>
    </header>

    <main>
      <ul class="grid">
        <li
          v-for="(pin, index) in pins"
          :key="index"
          v-bind:style="{ background: pin.color }"
        >
          <img :src="pin.image.original.url" alt="pin image">
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { catchErrors, cache, cached } from '../utils';
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
      console.warn(`Get board data for ${this.$route.params.id}`);
      // catchErrors(this.getData());
    }
  },
  methods: {
    async getData() {
      const boardID = this.$route.params.id;

      const board = await getBoard(boardID);
      this.board = board.data.data;
      cache('pinterest_board', JSON.stringify(this.board));
      // console.log(board);

      const pins = await getBoardPins(boardID);
      this.pins = pins.data.data;
      cache('pinterest_pins', JSON.stringify(this.pins));
      // console.log(pins);
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  li {
    @include flex-center;
    padding: 10px;
    border-radius: $radius;
    cursor: pointer;
    transition: $transition;

    &:hover,
    &:focus {
      background: $grey;
      opacity: 0.8;
    }
  }
}
</style>
