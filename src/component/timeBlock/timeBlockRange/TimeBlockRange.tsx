import React, {FC} from 'react';
import styles from "./TimeBlockRange.module.scss"
import {ITimePeriodEntity} from "../../../models/models";
import TimeBlockRangeNumberAnimation from "./TimeBlockRangeNumberAnimation";

interface ITimeBlockRange{
    time_period: ITimePeriodEntity
}

const TimeBlockRange: FC<ITimeBlockRange> = ({time_period}) => {
    const firstYear = time_period.year_events[0].year
    const lastYear = time_period.year_events[time_period.year_events.length - 1].year

    return (
        <div className={styles.container}>

            <div className={styles.firstYear}>
                <TimeBlockRangeNumberAnimation to={firstYear}/>
            </div>

            <div className={styles.lastYear}>
                <TimeBlockRangeNumberAnimation to={lastYear}/>
            </div>

        </div>
    );
};

export default TimeBlockRange;