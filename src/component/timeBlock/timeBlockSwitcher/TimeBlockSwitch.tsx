import React, {FC} from 'react';
import styles from "./TimeBlockSwitch.module.scss"

interface ITimeBlockSwitcher{
    changeIndexInterval: (num: number) => void
    index: number,
    totalRanges: number
}

const TimeBlockSwitch: FC<ITimeBlockSwitcher> = ({changeIndexInterval, index, totalRanges}) => {
    return (
        <div className={styles.container}>
            <div className={styles.indexes}>
                {index + 1}/{totalRanges}
            </div>

            <div className={styles.arrowContainer}>
                <div className={styles.button + " " + (index === 0 ? styles.notActiveButton : "")}
                     onClick={() => {changeIndexInterval(index - 1)}}>
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 4L6 10.25L12.25 16.5" stroke="#42567A" strokeWidth="2"/>
                    </svg>
                </div>

                <div className={styles.button + " " + (index + 1 === totalRanges ? styles.notActiveButton : "")}
                     onClick={() => {changeIndexInterval(index + 1)}}>
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.75 16L14 9.75L7.75 3.5" stroke="#42567A" strokeWidth="2"/>
                    </svg>


                </div>
            </div>
        </div>
    );
};

export default TimeBlockSwitch;