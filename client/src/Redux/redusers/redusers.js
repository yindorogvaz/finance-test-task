const SET_TICKERS = 'SET_TICKERS';
const SET_FILTERED_TICKERS = 'SET_FILTERED_TICKERS';


const defaultState = {
    prices: [],
    filteredTickers: []
};

export const priceTicker = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TICKERS:
            return {
                ...state,
                prices: action.payload.priceTicker
            }
        case SET_FILTERED_TICKERS:
            return {
                ...state,
                prices: state.prices.filter((item, index) => index !== action.payload.idx)
            }
        default:
            return state;
    }
}

export const setTickers = (priceTicker) => ({type: SET_TICKERS, payload: {priceTicker}})
export const setFilteredTickers = (idx) => ({type: SET_FILTERED_TICKERS, payload: {idx}})

