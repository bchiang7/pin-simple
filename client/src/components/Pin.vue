<template>
  <div class="pinModal">
    <button @click="prev">
      <ChevronLeft />
    </button>

    <img :src="pin.image.original.url" alt="active pin">

    <button @click="next">
      <ChevronRight />
    </button>

    <button @click="close" class="close">
      <Close />
    </button>
  </div>
</template>

<script>
import { EventBus } from '@/EventBus';
import { ChevronLeft, ChevronRight, Close } from '@/components/icons';

export default {
  name: 'Pin',
  components: {
    ChevronLeft,
    ChevronRight,
    Close,
  },
  props: {
    pin: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    window.addEventListener('keydown', e => this.handleKeyboard(e));
  },
  methods: {
    prev() {
      EventBus.$emit('prev-pin');
    },

    next() {
      EventBus.$emit('next-pin');
    },

    close() {
      EventBus.$emit('close-pin');
    },

    handleKeyboard(e) {
      if (e.key === 'ArrowLeft') {
        this.prev();
      }
      if (e.key === 'ArrowRight') {
        this.next();
      }
      if (e.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pinModal {
  @include flex-center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);

  button {
    background-color: transparent;
    padding: 30px;
    height: 100%;
    flex-grow: 1;

    &:hover,
    &:focus {
      svg {
        fill: rgba(255,255,255,0.5);
      }
    }

    svg {
      max-width: 50px;
      fill: rgba(255,255,255,0.2);
      transition: $transition;
    }
  }

  img {
    max-width: 500px;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    height: auto;
    z-index: 2;

    svg {
      max-width: 20px;
    }
  }
}
</style>
