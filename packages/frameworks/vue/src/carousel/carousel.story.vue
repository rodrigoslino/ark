<script setup lang="ts">
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselNextSlideTrigger,
  CarouselPrevSlideTrigger,
  CarouselSlide,
  CarouselSlideGroup,
  CarouselViewport,
} from './'
import './carousel.css'

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
  'https://tinyurl.com/6jurv23t',
  'https://tinyurl.com/yp4rfum7',
]
</script>
<template>
  <Story title="Carousel">
    <Variant title="Basic">
      <Carousel>
        <CarouselControl>
          <CarouselPrevSlideTrigger>Prev</CarouselPrevSlideTrigger>
          <CarouselNextSlideTrigger>Next</CarouselNextSlideTrigger>
        </CarouselControl>
        <CarouselViewport>
          <CarouselSlideGroup>
            <CarouselSlide v-for="(image, idx) in images" :key="idx" :index="idx">
              <img
                :src="image"
                alt=""
                :style="{ height: '300px', width: '100%', objectFit: 'cover' }"
              />
            </CarouselSlide>
          </CarouselSlideGroup>
        </CarouselViewport>
        <CarouselIndicatorGroup>
          <CarouselIndicator v-for="(_, idx) in images" :key="idx" :index="idx">
            {{ idx + 1 }}
          </CarouselIndicator>
        </CarouselIndicatorGroup>
      </Carousel>
    </Variant>
  </Story>
</template>
