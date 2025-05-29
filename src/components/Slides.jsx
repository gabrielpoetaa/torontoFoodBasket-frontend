import { useState } from "react";
import styles from "./Slides.module.css";
import imgSlide from "../images/supermarket1.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export function Slides() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="w-full lg:min-h-screen bg-woodsmoke-50"
    >
      <div className={styles.slidesContainer}>
        <Swiper
          modules={[Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={2000}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          className={styles.swiper}
        >
          {/* First Slide */}
          <SwiperSlide className={styles.slide}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row w-full h-full"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block w-1/2 h-full"
                style={{
                  backgroundImage: `url(${imgSlide})`,
                  backgroundSize: "cover",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="w-full md:w-1/2 h-full xl:pt-32 lg:pt-6 pt-10 px-12 md:px-16"
              >
                <p className="xl:text-sm lg:text-lg text-sm font-extralight text-woodsmoke-500 xl:leading-8">
                  Inspired by the rising food prices in Toronto and motivated by
                  the need for clear information, this project aims to be a tool
                  that simplifies understanding. Drawing inspiration from
                  Brazil's "Food Basket" index, this app focuses on providing
                  straightforward insights into the cost of essential groceries
                  in Toronto. As we delved into the project, we discovered
                  Canada's National Nutritious Food Basket survey, a
                  comprehensive initiative monitoring the affordability of
                  healthy eating. Although impressive, we recognized the
                  challenge of accessibility as the information wasn't readily
                  available online. Thus, this app aims to bridge this gap by
                  presenting a user-friendly interface. It's a tool designed to
                  empower individuals with the knowledge they need to navigate
                  the complex landscape of food prices.
                </p>
              </motion.div>
            </motion.div>
          </SwiperSlide>

          {/* Second Slide */}
          <SwiperSlide className={styles.slide}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row w-full h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="w-full md:w-1/2 h-full xl:pt-32 lg:pt-6 pt-12 px-12 md:px-16"
              >
                <p className="xl:text-xl lg:text-lg text-sm font-extralight text-woodsmoke-500 xl:leading-8">
                  The Canada's Food Price Report 2024 predicts a 2.5% to 4.5%
                  increase in overall food prices, offering relief compared to
                  previous years. The average family of four is expected to
                  spend up to $16,297.20 on food, with notable increases in
                  bakery, meat, and vegetables (5% to 7%). Despite economic
                  challenges in 2023, Canadians spent less on food, but
                  researchers are concerned about decreased food quality and
                  quantity. Trust in the food sector declined, with incidents of
                  price-fixing and labor strikes impacting the industry.
                </p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block w-1/2 h-full order-1 md:order-2"
                style={{
                  backgroundImage: `url(${imgSlide})`,
                  backgroundSize: "cover",
                  backgroundPosition: "right",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </motion.div>
          </SwiperSlide>
        </Swiper>
      </div>
    </motion.div>
  );
}
