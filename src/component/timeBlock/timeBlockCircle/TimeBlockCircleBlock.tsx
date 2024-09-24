import React, {FC} from 'react';
import styles from "./TimeBlockCircleBlock.module.scss"
import TimeBlockCircle from "./TimeBlockCircle";
import {ITimePeriodEntity} from "../../../models/models";

interface ITimeBlockCircle{
    time_periods: ITimePeriodEntity[]
    changeIndexInterval: (num: number) => void
    index: number
}

const TimeBlockCircleBlock: FC<ITimeBlockCircle> = ({time_periods, changeIndexInterval, index}) => {
    return (
        <div className={styles.container}>
            <div className={styles.verticalLine}></div>
            <div className={styles.horizontalLine}></div>
            <TimeBlockCircle changeIndexInterval={changeIndexInterval} time_periods={time_periods} index={index}/>
        </div>
    );
};

export default TimeBlockCircleBlock;