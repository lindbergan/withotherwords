<template>
  <span
    v-show="timeLeft > 0"
    :color="progressColor"
  >{{ timeLeft }} s</span>
</template>

<script>
export default {
  name: "countdowner",
  props: {
    timeLimit: {
      type: Number,
      default: 45,
    },
    /* In seconds */
    timeStep: {
      type: Number,
      default: 1,
    },

    withColor: Boolean,
  },
  data() {
    return {
      timeLeft: this.timeLimit,
      timer: null,
    }
  },

  computed: {
    timeProgress() {
      return parseFloat((this.timeLeft / this.timeLimit).toFixed(2)) * 100;
    },

    progressColor() {
      if (!this.withColor) return "#000000"

      if (this.timeProgress > 90) {
        return "#28a745";
      } else if (this.timeProgress > 80) {
        return "#64DD17";
      } else if (this.timeProgress > 70) {
        return "#AEEA00";
      } else if (this.timeProgress > 60) {
        return "#FFD600";
      } else if (this.timeProgress > 50) {
        return "#FFAB00";
      } else if (this.timeProgress > 40) {
        return "#FFAB40";
      } else if (this.timeProgress > 30) {
        return "#FF6D00";
      } else if (this.timeProgress > 20) {
        return "#FF6E40";
      } else if (this.timeProgress > 10) {
        return "#FF3D00";
      } else {
        return "#dc3545";
      }
    }
  },

  methods: {
    startTimer() {
      this.timeLeft = this.timeLimit
      this.timer = setInterval(() => {
        if (this.timeLeft - 1 === 0) {
          clearInterval(this.timer)
        }
        this.timeLeft -= 1
      }, this.timeStep * 1000)
    },
  },
}
</script>

<style scoped>

</style>
