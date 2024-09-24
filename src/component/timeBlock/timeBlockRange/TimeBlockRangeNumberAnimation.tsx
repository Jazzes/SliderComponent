import React, {FC, useEffect, useState} from 'react';
import {gsap} from "gsap"

interface ITimeBlockRangeNumberAnimation{
    to: number
}

const TimeBlockRangeNumberAnimation: FC<ITimeBlockRangeNumberAnimation> = ({to}) => {
    const [number, setNumber] = useState(to)

    useEffect(() => {
        if (to !== number){
            const animationData = { val: number }

            gsap.to(animationData, {
                val: to,
                duration: 0.5,
                onUpdate: () => {
                    setNumber(Math.round(animationData.val))
                },
                ease: "power1.inOut"
            })
        }

    }, [to]);

    return (
        <>
            {number}
        </>
    );
};

export default TimeBlockRangeNumberAnimation;