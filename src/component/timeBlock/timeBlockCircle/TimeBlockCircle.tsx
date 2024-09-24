import React, {FC, memo, useEffect, useMemo, useRef, useState} from 'react';
import {ITimePeriodEntity} from "../../../models/models";
import styles from "./TimeBlockCircleBlock.module.scss"
import {gsap} from "gsap";

interface ITimeBlockCircle {
    time_periods: ITimePeriodEntity[]
    index: number
    changeIndexInterval: (num: number) => void
}


const TimeBlockCircle: FC<ITimeBlockCircle> = memo(({time_periods, index, changeIndexInterval}) => {
    const step = useMemo(() => 360 / time_periods.length, [time_periods])
    const sumAngle = useRef<number>(0)
    const indexPrev = useRef<number>(0)

    const [width, setWidth] = useState(0)
    const ref = useRef<HTMLDivElement | null>(null)

    if (indexPrev.current !== index) {
        let distanceToRightOfWatch: number = index - indexPrev.current
        if (indexPrev.current >= index) {
            distanceToRightOfWatch += time_periods.length
        }

        if (distanceToRightOfWatch <= time_periods.length / 2) {
            sumAngle.current += distanceToRightOfWatch * step
        } else {
            sumAngle.current -= (time_periods.length - distanceToRightOfWatch) * step
        }

        indexPrev.current = index
    }

    const tran = (indexPosition: number) => {
        const res = (sumAngle.current - indexPosition * step) + step
        return `translate(-50%, -50%) rotate(${-res}deg) translateX(${width / 2}px) rotate(${res}deg)`
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            gsap.fromTo(`.${styles.currentHeader}`,
                {opacity: 0, y: 20, display: "none"},
                {opacity: 1, y: 0, display: "block", duration: 0.5, ease: 'power1.inOut'}
            );
        }, 500)

        return () => clearTimeout(timeout)
    }, [index])

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const resizeObserver = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width + 2)
        });

        resizeObserver.observe(element)

        return () => {
            resizeObserver.unobserve(element)
        };
    }, [])

    return (
        <>
            <div className={styles.circleContainer} ref={ref}>
                {
                    time_periods.map((_item, ind) => {
                            const currentI = index === ind
                            const transitionCircle = tran(ind)
                            return (
                                <div key={ind}
                                     className={styles.circleItem + (currentI ? " " + styles.activeCircleItem : "")}
                                     style={{transform: transitionCircle}}
                                     onClick={() => changeIndexInterval(ind)}>
                                    <>
                                        <div className={styles.currentNum}>{ind + 1}</div>
                                        {currentI &&
                                            <div className={styles.currentHeader}>{time_periods[index].name}</div>
                                        }
                                    </>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </>
    );

})

export default TimeBlockCircle;