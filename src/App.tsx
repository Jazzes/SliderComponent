import React, {useRef} from 'react';
import './App.scss';
import TimeBlock from "./component/timeBlock/TimeBlock";
import {dataTime} from "./data/dataForBlock";

function App() {
    const data = useRef(dataTime)


    return (
        <div className="App">
            <div className="header">Хедер</div>

            <TimeBlock data={data.current} />

            <div className="footer">Футер</div>
        </div>
    );
}

export default App;
