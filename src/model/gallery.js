
export default {
    namespace: 'gallery',

    state: {
        data: [
            { 
                id: 1,
                setup: 'Did you hear about the two silk worms in a race?',
                punchline: 'It ended in a tie',
            },
            {
                id: 2,
                setup: 'What happens to a frog\'s car when it breaks down?',
                punchline: 'It gets toad away',
            },
        ],
        counter: 100,
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
