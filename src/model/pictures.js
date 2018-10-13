import * as picturesService from '../service/pictures';

const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
}

export default {
    namespace: 'pictures',

    state: {
        pictureList: [],
        statistic: {},
    },

    effects: {
        *queryList({ _ }, { call, put }) {
            const response = yield call(picturesService.queryList);
            console.log('queryList');
            console.log(response);
            yield put({ type: 'saveList', payload: { pictureList: response.result } });
        },

        *deleteOne({ payload }, { call, put }) {
            const response = yield call(picturesService.deleteOne, payload);
            console.log('deleteOne');
            console.log(response);
            return response;
        },

        *addOne({ payload }, { call, put }) {
            const response = yield call(picturesService.addOne, payload);
            yield put({ type: 'queryList' });
            return response;
        },

        *getStatistic({ payload }, { call, put }) {
            const response = yield call(picturesService.getStatistic, payload);
            yield put({
                type: 'saveStatistic',
                payload: {
                    id: payload,
                    data: response.result,
                },
            });
            return response;
        },
    },

    reducers: {
        saveList(state, { payload: { cardsList } }) {
            return {
                ...state,
                cardsList,
            }
        },

        saveStatistic(state, { payload: { id, data } }) {
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    [id]: data,
                },
            } 
        },
    },
};
