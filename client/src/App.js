import React, {useEffect, useRef} from "react";
import './App.css';
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import * as io from "socket.io-client";
import {setTickers} from "./Redux/redusers/redusers";
import {CustomizedTables} from "./Components/Table";

const socket = io.connect('http://localhost:4000');
socket.emit('start');

const App = () => {
    const dispatch = useDispatch();
    const {prices: tickers} = useSelector(state => state.priceTicker);
    const prevValue = useRef([]);

    useEffect(() => {
        socket.on('ticker', response => {
            dispatch(setTickers(response));
        });
        prevValue.current = tickers;
    }, []);

    useEffect(() => {
        prevValue.current = tickers;
    }, [tickers]);

    return (<div>
        <div className="App">
            <Header/>
            <CustomizedTables
                prevValue={prevValue.current}
                tickers={tickers}
            />
        </div>
    </div>);
}

export default App;
