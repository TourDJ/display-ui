import request from '../util/request';
import { message } from 'antd';

const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
}

export default {
    namespace: 'gallery',

    state: {
        data: [],
        counter: 0,
    },

    effects: {
        *queryInitPictures(_, sagaEffects) {
            const { call, put } = sagaEffects;
            const uri = '/display/picture';     //proxy data
            //const uri = '/dev/picture';       //mock data

            try {
                const picture = yield call(request, uri);
                console.log(picture)
                yield put({ type: 'addNewPicture', payload: picture.data});
                yield call(delay, 3000);
                const picture2 = yield call(request, uri);
                yield put({ type: 'addNewPicture', payload: picture2.data});
            } catch (e) {
                console.log(e)
                message.error('数据获取失败');
            }
        }
    },

    reducers: {
        addNewPicture(state, {payload: newPicture}){
            const nextCounter = state.counter + 1;
            const newPictureWithId = {...newPicture, id: nextCounter};
            const nextData = state.data.concat(newPictureWithId);
            return {
                data: nextData,
                counter: nextCounter,
            };
        },
    }
}
