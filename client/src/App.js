import React, {useEffect, useRef} from "react";
import './App.css';
import Header from "./Components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import * as io from "socket.io-client";
import {setFilteredTickers, setTickers} from "./Redux/redusers/redusers";
import {CustomizedTables} from "./Components/Table";

const socket = io.connect('http://localhost:4000');
socket.emit('start');

const App = () => {

    const dispatch = useDispatch();
    const {prices: tickers, filteredTickers} = useSelector(state => state.priceTicker);
    const prevValue = useRef([]);

    useEffect(() => {
        if (tickers.length > 0) {
            socket.on('ticker', response => {
                    dispatch(setTickers(response));
                }
            );

            prevValue.current = tickers;
        }
    }, [tickers]);

    useEffect(() => {
        prevValue.current = tickers;
    }, [tickers]);


    return (
        <div>
            <div className="App">
                <Header/>
                <CustomizedTables
                    prevValue={prevValue.current}
                    tickers={tickers}
                />
            </div>
        </div>
    );
}

export default App;
