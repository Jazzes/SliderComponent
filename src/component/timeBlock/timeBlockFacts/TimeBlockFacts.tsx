import React, {FC, useEffect, useRef} from 'react';
import {ITimePeriodEntity} from "../../../models/models";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from 'swiper/modules';
import {gsap} from "gsap"
import 'swiper/scss';
import styles from "./TimeBlockFacts.module.scss"
import type {Swiper as SwiperClass} from "swiper/types";


interface ITimeBlockFacts {
    time_period: ITimePeriodEntity
}

const TimeBlockFacts: FC<ITimeBlockFacts> = ({time_period}) => {

    const arrowLeft = useRef<HTMLDivElement | null>(null)
    const arrowRight = useRef<HTMLDivElement | null>(null)
    const swiperRef = useRef<SwiperClass | null>(null);

    useEffect(() => {
        gsap.fromTo(`.${styles.container}`,
            {opacity: 0, y: 20},
            {opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut'}
        );

        if (!swiperRef.current.isBeginning){
            arrowLeft.current!.classList.remove(styles.swiperArrowHidden);
        }
        if (!swiperRef.current.isEnd){
            arrowRight.current!.classList.remove(styles.swiperArrowHidden);
        }
    }, [time_period]);

    const handleEnd = () => {
        arrowRight.current!.classList.add(styles.swiperArrowHidden);
    }

    const handleBegin = () => {
        arrowLeft.current!.classList.add(styles.swiperArrowHidden);
    }

    const handleSlideChange = (swiper: SwiperClass) => {
        if (!swiper.isBeginning){
            arrowLeft.current!.classList.remove(styles.swiperArrowHidden);
        }
        if (!swiper.isEnd){
            arrowRight.current!.classList.remove(styles.swiperArrowHidden);
        }
    }

    const handleInit = (swiper: SwiperClass) => {
        swiperRef.current = swiper
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerPeriod}>{time_period.name}</div>

            <div className={styles.separatorBlock}></div>

            <div ref={arrowLeft} className={styles.swiperPrev + " " + styles.swiperArrowHidden}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L4 7L9 2" stroke="#3877EE" strokeWidth="2"/>
                </svg>
            </div>
            <div ref={arrowRight} className={styles.swiperNext}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 2L10 7L5 12" stroke="#3877EE" strokeWidth="2"/>
                </svg>
            </div>

            <div className={styles.swiperPagination}>
                <div className={styles.swiperPaginationDot}></div>

            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={25}
                slidesPerView={1.5}
                navigation={{
                    prevEl: `.${styles.swiperPrev}`,
                    nextEl: `.${styles.swiperNext}`
                }}
                effect="slide"
                pagination={{
                    clickable: true,
                    el: `.${styles.swiperPagination}`,
                    bulletClass: `${styles.swiperPaginationDot}`,
                    bulletActiveClass: `${styles.swiperPaginationDotActive}`
                }}
                onReachBeginning={handleBegin}
                onReachEnd={handleEnd}
                onSlideChange={handleSlideChange}
                onInit={handleInit}
                slideNextClass={styles.almostShowedNextSlide}
                breakpoints={{
                    640: {
                        spaceBetween: 60,
                        slidesPerView: 2
                    },
                    960: {
                        spaceBetween: 80,
                        slidesPerView: 3,
                    }
                }}
            >
                {time_period.year_events.map((ent) =>
                    <SwiperSlide key={ent.year}>
                        <div className={styles.year}>{ent.year}</div>
                        <div className={styles.description}>{ent.description}</div>
                    </SwiperSlide>
                )}
            </Swiper>

        </div>

    );
};

export default TimeBlockFacts;