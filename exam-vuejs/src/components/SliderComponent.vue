<template>
    <div v-if="images.length" class="slider-container">
      <div class="slider" ref="slider">
        <div v-for="(image, index) in images" :key="index" class="slide">
          <img :src="image" alt="Slider Image" class="slider-image" />
        </div>
      </div>
      <button @click="prevSlide" class="slider-nav prev-btn" aria-label="Previous Slide">
        &#10094;
      </button>
      <button @click="nextSlide" class="slider-nav next-btn" aria-label="Next Slide">
        &#10095;
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'SliderComponent',
    props: {
      images: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const slider = ref<HTMLElement | null>(null);
      const currentSlide = ref(0);
  
      const nextSlide = () => {
        if (slider.value) {
          currentSlide.value = (currentSlide.value + 1) % props.images.length;
          slider.value.style.transform = `translateX(-${currentSlide.value * 100}%)`;
        }
      };
  
      const prevSlide = () => {
        if (slider.value) {
          currentSlide.value =
            (currentSlide.value - 1 + props.images.length) % props.images.length;
          slider.value.style.transform = `translateX(-${currentSlide.value * 100}%)`;
        }
      };
  
      onMounted(() => {
        setInterval(nextSlide, 5000);
      });
  
      return {
        slider,
        nextSlide,
        prevSlide,
      };
    },
  });
  </script>
  
  <style scoped>
  .slider-container {
    margin-top: 20px;
    position: relative;
    width: 100%;
    max-width: 1000px;
    overflow: hidden;
    margin: 0 auto;
  }
  
  .slider {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .slide {
    min-width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .slider-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .slider-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    z-index: 10;
  }
  
  .prev-btn {
    left: 10px;
  }
  
  .next-btn {
    right: 10px;
  }
  </style>
  