<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import LoadingIcon from "../images/spinner.gif";

interface IContainer {
  width?: number;
  height?: number;
}

interface IPoint {
  size?: number;
  color?: string;
}

type Point = {
  x: number;
  y: number;
};

interface ILine {
  width?: number;
  color?: string;
}

interface IImageLabel {
  url: string;
  containerProps?: IContainer;
  lineProps?: ILine;
  pointProps?: IPoint;
  getPoints?: (points: Point[]) => void;
}

export default Vue.extend({
  name: 'ImageLabel',
  props: {
    url: {
      type: String,
      required: true
    },
    containerProps: {
      type: Object,
      default: () => ({})
    },
    lineProps: {
      type: Object as () => ILine,
      default: () => ({})
    },
    pointProps: {
      type: Object as () => IPoint,
      default: () => ({})
    },
    getPoints: {
      type: Function as unknown as () => ((points: Point[]) => void) | undefined,
      default: undefined
    }
  },
  data() {
    return {
      LoadingIcon: LoadingIcon,
      points: [] as Point[],
      __img_scale_: 1 as number,
      ctx: {} as CanvasRenderingContext2D,
      img: {} as HTMLImageElement,
      currentSelectedPointIndex: -1 as number,
      mouseStyleTimer: 0 as number,
      loading: false as boolean,
      containerW: 1000 as number,
      containerH: 800 as number
    }
  },
  mounted() {
    this.containerW = this.containerProps?.width || 1000;
    this.containerH = this.containerProps?.height || 800;
    this.loadPictureAndInitCanvas();
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    if (canvas) {
      canvas.addEventListener("wheel", this.mouseWhell);
      canvas.addEventListener("mousedown", this.listenMouseDown);
      canvas.addEventListener("mousemove", this.listenMouseMove);
    }
  },
  methods: {
    // 加载图片并初始化画布
    loadPictureAndInitCanvas() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const container = this.$refs.container as HTMLDivElement;
      this.ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
      this.loading = true;
      this.img = document.createElement("img");
      this.img.alt = "trace img";
      this.img.id = "img";
      this.img.src = this.url;
      // image loaded
      this.img.onload = () => {
        this.loading = false;
        if (container) {
          container.append(this.img);
        }
        const { width, height } = this.img;
        if (width > height) {
          this.img.style.width = "80%";
        } else {
          this.img.style.height = "80%";
        }
        // 容器中的图片尺寸
        const { clientWidth, clientHeight } = this.img;
        this.__img_scale_ = clientWidth / width;
        if (canvas) {
          canvas.style.width = clientWidth + "px";
          canvas.style.height = clientHeight + "px";
          canvas.width = clientWidth;
          canvas.height = clientHeight;
          canvas.style.left = `calc(50% - ${clientWidth / 2}px)`;
          canvas.style.top = `calc(50% - ${clientHeight / 2}px)`;
        }
        this.ctx.drawImage(this.img, 0, 0, clientWidth, clientHeight);
        this.img.style.scale = "1";
        this.initPoints(clientWidth, clientHeight);
        this.mouseWhellDrawPointAndLine(1);
      };
      // image load error
      this.img.onerror = () => {
        this.loading = false;
      };
    },
    // 获取图片缩放倍数
    getScale(): number {
      return Number(this.img.style.scale);
    },
    // 鼠标滚动事件监听
    mouseWhell(e: MouseEvent) {
      e.preventDefault();
      this.mouseWheelDrawPicture(e);
      this.mouseWhellDrawPointAndLine(this.getScale());
    },
    // 绘制图片
    mouseWheelDrawPicture(e: MouseEvent) {
      /**
       * deltaY 正值:向下滚动 缩小; 负值:向上滚动 放大
       */
      let top = 0;
      let left = 0;
      // @ts-ignore
      const { deltaY, offsetX, offsetY } = e;
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      if (deltaY < 0 && this.getScale() < 5 && canvas) {
        this.img.style.scale = JSON.stringify(this.getScale() + 0.1);
        // 计算出这次放大相比于上一次调整了canvas多少的offsetTop和offsetLeft
        left =
          canvas.offsetLeft -
          ((offsetX * this.getScale()) / (this.getScale() - 0.1) - offsetX);
        top =
          canvas.offsetTop -
          ((offsetY * this.getScale()) / (this.getScale() - 0.1) - offsetY);
        canvas.style.left = left + "px";
        canvas.style.top = top + "px";
        canvas.style.width = this.img.clientWidth * this.getScale() + "px";
        canvas.style.height = this.img.clientHeight * this.getScale() + "px";
        canvas.width = this.img.clientWidth * this.getScale();
        canvas.height = this.img.clientHeight * this.getScale();
      }
      if (deltaY >= 0 && this.getScale() - 0.1 >= 0.1 && canvas) {
        this.img.style.scale = JSON.stringify(this.getScale() - 0.1);
        // 计算出这次缩小相比于上一次调整了canvas多少的offsetTop和offsetLeft
        left =
          canvas.offsetLeft -
          (offsetX * this.getScale()) / (this.getScale() + 0.1) +
          offsetX;
        top =
          canvas.offsetTop -
          (offsetY * this.getScale()) / (this.getScale() + 0.1) +
          offsetY;

        canvas.style.left = left + "px";
        canvas.style.top = top + "px";
        canvas.style.width = this.img.clientWidth * this.getScale() + "px";
        canvas.style.height = this.img.clientHeight * this.getScale() + "px";
        canvas.width = this.img.clientWidth * this.getScale();
        canvas.height = this.img.clientHeight * this.getScale();
      }

      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.clientWidth * this.getScale(),
        this.img.clientHeight * this.getScale()
      );
    },
    listenMouseDown(e: MouseEvent) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      if (!canvas) {
        return;
      }
      const { clientX, clientY, offsetX, offsetY } = e;
      // 画布距离原点的位置
      const spaceX = clientX - canvas.offsetLeft || 0;
      const spaceY = clientY - canvas.offsetTop || 0;
      const pointSize = this.pointProps?.size ? this.pointProps.size * 2 : 20;
      this.points.forEach((point, index) => {
        const scalePoint = { x: point.x * this.getScale(), y: point.y * this.getScale() };
        const isSelected =
          Math.abs(offsetX - scalePoint.x) <= pointSize &&
          Math.abs(offsetY - scalePoint.y) <= pointSize;
        if (isSelected) {
          this.currentSelectedPointIndex = index;
        }
      });
      // 选中点 拖拽点
      if (this.currentSelectedPointIndex >= 0) {
        canvas.onmousemove = (event: MouseEvent) => {
          this.points[this.currentSelectedPointIndex].x = (event as any).offsetX / this.getScale();
          this.points[this.currentSelectedPointIndex].y = (event as any).offsetY / this.getScale();
          this.ctx.clearRect(
            0,
            0,
            this.img.clientWidth * this.getScale(),
            this.img.clientHeight * this.getScale()
          );
          this.ctx.drawImage(
            this.img,
            0,
            0,
            this.img.clientWidth * this.getScale(),
            this.img.clientHeight * this.getScale()
          );
          this.mouseWhellDrawPointAndLine(this.getScale());
        };
      } else {
        // 未选中点 拖拽画布
        document.onmousemove = (event: MouseEvent) => {
          if (!canvas) {
            return;
          }
          const left = event.clientX - spaceX;
          const top = event.clientY - spaceY;
          canvas.style.left = left + "px";
          canvas.style.top = top + "px";
        };
      }
      document.onmouseup = () => {
        if (!canvas) {
          return;
        }
        canvas.setAttribute("class", "");
        document.onmousemove = null;
        canvas.onmousemove = null;
        document.onmouseup = null;
        this.currentSelectedPointIndex = -1;
      };
    },
    // 鼠标滚动绘制点线
    mouseWhellDrawPointAndLine(scale: number) {
      if (!this.points.length) {
        return;
      }
      // 点
      this.points.forEach((point) => {
        this.ctx.beginPath();
        this.ctx.arc(
          point.x * scale,
          point.y * scale,
          this.pointProps?.size || 10,
          0,
          2 * Math.PI
        );
        this.ctx.fillStyle = this.pointProps?.color || "rgba(255,0,0,0.5)";
        this.ctx.fill();
        this.ctx.closePath();
      });
      this.ctx.beginPath();
      this.ctx.setLineDash([10, 5]);
      this.ctx.lineWidth = this.lineProps?.width || 2;
      this.ctx.strokeStyle = this.lineProps?.color || "red";
      // 线
      this.points.forEach(({ x, y }) => {
        this.ctx.lineTo(x * scale, y * scale);
      });
      this.ctx.lineTo(this.points[0].x * scale, this.points[0].y * scale);
      this.ctx.stroke();
      // 执行获取坐标点的回调
      if (this.getPoints) {
        this.getPoints(this.getOriginPoints());
      }
    },
    // 获取图片上的原始坐标点
    getOriginPoints(): Point[] {
      if (!this.points.length) {
        console.error("画布暂时没有初始化");
        return [];
      }
      return this.points.map(({ x, y }) => ({
        x: Number((x / this.__img_scale_).toFixed(2)),
        y: Number((y / this.__img_scale_).toFixed(2)),
      }));
    },
    // 鼠标移动事件,处理鼠标指针
    listenMouseMove(e: MouseEvent) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      if (!canvas) {
        return;
      }
      const { offsetX, offsetY } = e;
      let moveToPoint = false;
      const pointSize = this.pointProps?.size ? this.pointProps.size * 2 : 20;
      this.points.forEach((point) => {
        const scalePoint = { x: point.x * this.getScale(), y: point.y * this.getScale() };
        const confirm =
          Math.abs(offsetX - scalePoint.x) <= pointSize &&
          Math.abs(offsetY - scalePoint.y) <= pointSize;
        if (confirm) {
          moveToPoint = true;
        }
      });
      if (this.mouseStyleTimer) {
        clearTimeout(this.mouseStyleTimer);
      } else {
        setTimeout(() => {
          canvas.setAttribute("class", moveToPoint ? "selected" : "");
        }, 100);
      }
    },
    // 默认点加载， 默认取画布中心点80%的正方形区域
    initPoints(width: number, height: number) {
      if (this.points.length > 0) {
        return;
      }
      const leftTop = { x: width * 0.2, y: height * 0.2 };
      const rightTop = { x: width * 0.8, y: height * 0.2 };
      const rightBottom = { x: width * 0.8, y: height * 0.8 };
      const leftBottom = { x: width * 0.2, y: height * 0.8 };
      this.points.push(leftTop);
      this.points.push(rightTop);
      this.points.push(rightBottom);
      this.points.push(leftBottom);
    }
  }
})
</script>

<template>
  <div
    ref="container"
    class="image-label__container"
    :style="{
      width: containerW + 'px',
      height: containerH + 'px',
    }"
  >
    <div v-if="loading" class="status">
      <img :src="LoadingIcon" alt="loading icon" width="100" height="100" />
    </div>
    <canvas ref="canvas" />
  </div>
</template>
  
<style>
.image-label__container {
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.image-label__container canvas {
  position: absolute;
  cursor: move;
}

.image-label__container #img {
  position: absolute;
  right: 1000000px;
  bottom: 1000000px;
}

.image-label__container .selected {
  cursor: crosshair;
}
.image-label__container .status {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
