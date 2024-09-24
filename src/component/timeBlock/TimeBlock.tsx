import React, {FC, useMemo, useRef, useState, Suspense} from 'react';
import {IDataResponse} from "../../models/models";
import styles from "./TimeBlock.module.scss"
import TimeBlockHeader from "./timeBlockHeader/TimeBlockHeader";
import TimeBlockRange from "./timeBlockRange/TimeBlockRange";
import TimeBlockSwitch from "./timeBlockSwitcher/TimeBlockSwitch";
const TimeBlockFacts = React.lazy(() => import('./timeBlockFacts/TimeBlockFacts'));
import TimeBlockCircleBlock from "./timeBlockCircle/TimeBlockCircleBlock";

interface ITimeBlock {
    data: IDataResponse
}

const TimeBlock : FC<ITimeBlock> = ({data}) => {

    const [indexInterval, setIndexInterval] = useState(0)

    const totalRanges = useRef(data.time_periods.length)

    const sortedPeriod = useMemo(() => ({
        name: data.time_periods[indexInterval].name,
        year_events: data.time_periods[indexInterval].year_events.sort(
            (ent1, ent2) => (
                ent1.year - ent2.year
            ))
    }), [indexInterval, data])

    const changeIndexInterval = (num: number) => {
        setIndexInterval(num)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <TimeBlockHeader text={data.header}/>

                <TimeBlockRange time_period={sortedPeriod}/>

                <TimeBlockCircleBlock changeIndexInterval={changeIndexInterval} time_periods={data.time_periods} index={indexInterval}/>

                <div className={styles.reverseBlock}>
                    <TimeBlockSwitch changeIndexInterval={changeIndexInterval} index={indexInterval}
                                     totalRanges={totalRanges.current}/>

                    <Suspense>
                        <TimeBlockFacts time_period={sortedPeriod}/>
                    </Suspense>
                </div>

            </div>
        </div>

    );
};

export default TimeBlock;