import Vue from 'vue';

const app = {
    state: {
        screenPower:false,
    },
    mutations: {
        setScreenPower:function (state,no) {
            state.screenPower = no;
            console.log('state---',state,no)
        }
    }
};

export default app;
