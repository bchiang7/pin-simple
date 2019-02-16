<template>
  <Transition name="modal">
    <div v-if="pin" class="pinModal">
      <div class="img-container">
        <img :src="pin.image.original.url" alt="active pin">
      </div>

      <button @click="prev" class="arrow prev">
        <ChevronLeft />
      </button>

      <button @click="next" class="arrow next">
        <ChevronRight />
      </button>

      <button @click="close" class="close">
        <Close />
      </button>
    </div>
  </Transition>
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

    &.arrow {
      position: absolute;

      &.prev {
        left: 0;
      }

      &.next {
        right: 0;
      }
    }

    svg {
      max-width: 50px;
      fill: rgba(255,255,255,0.25);
      transition: $transition;

      @include smallerThan480 {
        max-width: 40px;
        fill: rgba(255,255,255,0.5);
      }
    }
  }

  .img-container {
    @include flex-center;
    width: 100%;
    max-width: 700px;
    height: 100%;
  }

  img {
    width: auto;
    max-height: 800px;
    padding: 30px;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    height: auto;
    z-index: 2;

    svg {
      fill: rgba(255,255,255,0.4);
      max-width: 20px;
    }
  }
}


.modal-enter,
.modal-leave-active {
  opacity: 0;
}
.modal-enter,
.modal-leave-to {
  img {
    transform: scale(0.75);
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: $transition;
}
</style>
