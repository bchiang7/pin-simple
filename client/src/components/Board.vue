<template>
  <div v-if="board" class="container board">
    <header>
      <h1>{{ board.name }}</h1>
      <p>{{ board.counts.pins }} Pins</p>
      <div class="external">
        <a :href="board.url" target="_blank">
          View on Pinterest
          <External />
        </a>
      </div>
      <div class="back">
        <router-link to="/boards">
          <BackArrow />
          <span>Back</span>
        </router-link>
      </div>
    </header>

    <main>
      <ul class="grid">
        <li
          v-for="(pin, index) in pins"
          :key="index"
          v-bind:style="{ background: pin.color }"
          @click="selectPin(pin)"
          class="pin"
        >
          <img :src="pin.image.original.url" alt="pin image">
        </li>
      </ul>
    </main>

    <Pin v-if="activePin" :pin="activePin" />
  </div>
</template>

<script>
import { catchErrors, cache, cached } from '@/utils';
import { getBoard, getBoardPins } from '@/pinterest';
import Pin from './Pin';
import { External, BackArrow } from '@/components/icons';
import { EventBus } from '@/EventBus';

export default {
  name: 'Board',
  components: {
    External,
    BackArrow,
    Pin,
  },
  data() {
    return {
      board: null,
      pins: [],
      activePin: null,
      currentPindex: null,
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
      catchErrors(this.getData());
    }

    EventBus.$on('close-pin', () => this.closePin());
    EventBus.$on('prev-pin', () => this.prevPin());
    EventBus.$on('next-pin', () => this.nextPin());
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

    selectPin(pin) {
      this.activePin = pin;

      const pinIndex = this.pins.map(p => p.id).indexOf(pin.id);
      this.currentPindex = pinIndex;

      document.body.classList.add('fixed');
    },

    closePin() {
      this.activePin = null;
      this.currentPindex = null;

      document.body.classList.remove('fixed');
    },

    prevPin() {
      if (this.currentPindex < 1) {
        return;
      }

      const prevIndex = this.currentPindex - 1;
      this.activePin = this.pins[prevIndex];

      const pinIndex = this.pins.findIndex(p => p.id === this.pins[prevIndex].id);
      this.currentPindex = pinIndex;
    },

    nextPin() {
      // TODO: fix this to account for pagination, only 25 pins showing but 57 total
      if (this.currentPindex > this.pins.length + 1) {
        return;
      }

      const nextIndex = this.currentPindex + 1;
      this.activePin = this.pins[nextIndex];

      const pinIndex = this.pins.findIndex(p => p.id === this.pins[nextIndex].id);
      this.currentPindex = pinIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  header {
    @include flex-center;
    flex-direction: column;
    text-align: center;
  }

  .external {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;

    svg {
      margin-left: 8px;
    }
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    margin: 20px;

    svg {
      margin-right: 8px;
    }
  }

  li {
    @include flex-center;
    padding: 10px;
    border-radius: $radius;
    cursor: pointer;
    transition: $transition;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>
