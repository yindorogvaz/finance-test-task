import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import style from './Table.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleDown, faAngleDoubleUp, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import Table from "@material-ui/core/Table";
import {TableCell} from "@material-ui/core";
import {useState} from "react";
import {setFilteredTickers} from "../../Redux/redusers/redusers";
import {useDispatch} from "react-redux";


const visibleCell = ['ticker', 'price', 'change', 'change_percent', 'dividend', 'yield']

export const CustomizedTables = ({prevValue, tickers}) => {
    let [hiddenTickers, setHiddenTickers] = useState([]);

    const dispatch = useDispatch();

    const handleClick = (index) => {
        let result = [...hiddenTickers];
        if (hiddenTickers.length > 0) {
            const isFound = hiddenTickers.find(item => item === index)
            if (isFound || isFound === 0) {
                result = hiddenTickers.filter(item => item !== index)
            } else {
                result.push(index)
            }
        } else {
            result.push(index)
        }
        setHiddenTickers(result)
    };

    const remove = (idx) => {
        dispatch(setFilteredTickers(idx))
    }

    return (<TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Ticker</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Change</TableCell>
                        <TableCell align="left">Change_percent</TableCell>
                        <TableCell align="left">Dividend</TableCell>
                        <TableCell align="left">Yield</TableCell>
                        <TableCell align="left">Visible</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tickers.map((row, idx) => (<TableRow key={row.ticker} className={style.row}>
                        {Object.entries(row).map(([key, value]) => {
                            if (visibleCell.includes(key)) {
                                return (<TableCell align="left">
                                    {!hiddenTickers.includes(idx) && (<>
                                        {value}
                                        {key !== 'ticker' && <FontAwesomeIcon
                                            className={prevValue[idx] && prevValue[idx][key] > row[key]
                                                ? `${style.iconFloatLeft} ${style.decrement}`
                                                : `${style.iconFloatLeft} ${style.increment}`}
                                            icon={prevValue[idx] && prevValue[idx][key] > row[key]
                                                ? faAngleDoubleDown : faAngleDoubleUp}/>}
                                    </>)}

                                </TableCell>)
                            }
                        })}

                        <TableCell align="left">
                            <FontAwesomeIcon
                                onClick={() => handleClick(idx)}
                                className={hiddenTickers.includes(idx) ? `${style.faEye}` : `${style.eyeSlash}`}
                                icon={hiddenTickers.includes(idx) ? faEye : faEyeSlash}
                                data-testid="toggle"/>
                        </TableCell>

                        <button onClick={() => remove(idx)}>Remove</button>
                    </TableRow>))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}
