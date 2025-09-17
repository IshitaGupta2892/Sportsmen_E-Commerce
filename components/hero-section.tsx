"use client"

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const carouselImages = [
  {
    src: '/athletic-runner-in-motion-on-track-dynamic-action-.png',
    alt: 'Cricket Sportswear Collection',
    title: 'Unleash Your',
    highlight: 'Cricket Potential',
    description: 'Discover premium cricket sportswear designed for peak performance — from match-day tees to training tracksuits.'
  },
  {
    src: '/discounted-athletic-wear-sale-items.png',
    alt: 'Training Collection',
    title: 'Train Like A',
    highlight: 'Champion',
    description: 'High-performance sportswear designed to enhance your training and help you push your limits.'
  },
  {
    src: '/mens-athletic-sportswear-clothing.png',
    alt: 'Match Day Collection',
    title: 'Dominate The',
    highlight: 'Game Day',
    description: 'Look and feel your best on the field with our premium match day collection.'
  }
];

export function HeroSection() {
  const swiperRef = useRef<any>(null);

  return (
    <section className="relative h-[80vh] overflow-hidden bg-black">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} inline-block h-2 w-2 md:h-3 md:w-3 mx-1 rounded-full transition-all duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="h-full w-full"
      >
        {carouselImages.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.src})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
                  {slide.title}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {slide.highlight}
                  </span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-1 w-16 bg-primary rounded-full"></div>
                  <div className="h-1 w-10 bg-accent rounded-full"></div>
                  <div className="h-1 w-16 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button 
          className="swiper-button-prev absolute left-4 z-10 h-12 w-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className="swiper-button-next absolute right-4 z-10 h-12 w-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination */}
        <div className="swiper-pagination absolute bottom-8 left-0 right-0 z-10 flex justify-center"></div>
      </Swiper>
    </section>
  );
}
