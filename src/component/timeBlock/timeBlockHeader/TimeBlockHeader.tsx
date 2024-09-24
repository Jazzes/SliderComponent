import React, {FC, memo} from 'react';

import styles from "./TimeBlockHeader.module.scss"

interface ITimeBlockHeader {
    text: string
}

const TimeBlockHeader: FC<ITimeBlockHeader> = memo(({text}) => {

    return (
        <div className={styles.header}>
            {text}
        </div>
    );
})

export default TimeBlockHeader;