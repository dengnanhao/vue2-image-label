<script lang="ts">
import Vue from 'vue'
import VueLabelImage from "vue2-image-label";
// @ts-ignore
// import VueLabelImage from "../packages/image-label.vue";

interface Point {x: number; y:number}

export default Vue.extend({
  name: 'App',
  components: {
    VueLabelImage
  },
  data() {
    return {
      points: [] as Point[]
    }
  },
  methods: {
    getPoints(params: Point[]) {
      this.points = params
    }
  }
})
</script>

<template>
  <div class="wrapper">
    <VueLabelImage
      url="https://p1.ssl.qhimg.com/t01d5bfa57d9ec88727.jpg"
      :get-points="getPoints"
    />
    <div v-if="points.length" class="footer">
      <h3>坐标点信息:</h3>
      <ul class="points">
        <li v-for="(point, index) in points" :key="point.x + point.y + index">
          {{point.x}}, {{point.y}}
        </li>
      </ul>
      </div>
  </div>
</template>

<style scoped>

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding:  24px 0;
  background-color: #000;
  box-sizing: border-box;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  background: #333;
  height: 60px;
  margin-top: 24px;
}
h3 {
  color: aliceblue;
}
.points {
  display: flex;
  list-style: none;
  min-width: 600px;
}

.points li {
  margin-left: 24px;
  color: aliceblue;
}


</style>
