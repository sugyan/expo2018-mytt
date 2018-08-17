import { combineReducers } from 'redux';

import {
    FILTER_CHANGE_KEYWORD, FILTER_TOGGLE_CHECKBOX,
    GENERATE_RESULT,
    SELECT_ITEM, SELECT_ITEMS,
    UPDATE_TIMETABLE,
} from './actions';

const timetable = combineReducers({
    items: (state = [], action: any) => {
        switch (action.type) {
        case UPDATE_TIMETABLE:
            return action.data;
        default:
            return state;
        }
    },
    result: (state = null, action: any) => {
        switch (action.type) {
        case GENERATE_RESULT:
            return action.data || null;
        default:
            return state;
        }
    },
    selected: (state: any = {}, action: any) => {
        const newSelected = { ...state };
        switch (action.type) {
        case SELECT_ITEM:
            if (action.checked) {
                newSelected[action.id] = true;
            } else {
                delete newSelected[action.id];
            }
            return newSelected;
        case SELECT_ITEMS:
            action.ids.forEach((id: any) => {
                newSelected[id] = true;
            });
            return newSelected;
        default:
            return state;
        }
    },
});

const filter = combineReducers({
    day: (
        state: any = {
            '08-03': true,
            '08-04': true,
            '08-05': true,
        },
        action: any,
    ) => {
        switch (action.type) {
        case FILTER_TOGGLE_CHECKBOX:
            return {
                ...state,
                [action.name]: !state[action.name],
            };
        default:
            return state;
        }
    },
    keyword: (state = '', action: any) => {
        switch (action.type) {
        case FILTER_CHANGE_KEYWORD:
            return action.word;
        default:
            return state;
        }
    },
    stage: (
        state: any = {
            DOLLFACTORY:   true,
            DREAMSTAGE:    true,
            FESTIVALSTAGE: true,
            FUJIYOKOSTAGE: true,
            GREETINGAREA:  false,
            HOTSTAGE:      true,
            INFOCENTRE:    true,
            SKYSTAGE:      true,
            SMILEGARDEN:   true,
        },
        action: any,
    ) => {
        switch (action.type) {
        case FILTER_TOGGLE_CHECKBOX:
            return {
                ...state,
                [action.name]: !state[action.name],
            };
        default:
            return state;
        }
    },
});

export default combineReducers({
    filter,
    timetable,
});
