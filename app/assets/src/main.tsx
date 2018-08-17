import moment from 'moment';
import 'moment/locale/ja';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import 'whatwg-fetch';

import Result from './components/result';
import TimeTable from './components/timetable';
import { generateResult, selectItems, updateTimeTable } from './redux/actions';
import reducers from './redux/reducers';

interface IMainProps {
    fetchTimeTable(v: any[]): void;
}

class Main extends React.Component<IMainProps, {}> {
    public componentDidMount() {
        fetch('/api/timetable.json').then((res) => {
            return res.json();
        }).then((json) => {
            const { fetchTimeTable } = this.props;
            fetchTimeTable(json.map((e: any) => {
                e.start = moment(e.start * 1000).utcOffset('+09:00');
                e.end   = moment(e.end   * 1000).utcOffset('+09:00');
                e.day   = e.start.format('MM-DD');
                return e;
            }));
        });
    }
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link to="/">
                                    <span className="navbar-brand text-light">TIF 2018 MyTT</span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={TimeTable} />
                            <Route path="/result" component={Result} />
                            <Route path="/tt/:key" component={Result} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const App = connect(
        (state) => state,
        (dispatch) => {
            return {
                fetchTimeTable: (data: any) => {
                    dispatch(updateTimeTable(data));

                    const result: HTMLInputElement = document.getElementById('result') as HTMLInputElement;
                    if (result) {
                        const ids = JSON.parse(result.value);
                        dispatch(selectItems(ids));

                        fetch('/api/generate', {
                            body: JSON.stringify({ ids }),
                            headers: { 'Content-Type': 'application/json' },
                            method: 'POST',
                        }).then((response) => {
                            return response.json();
                        }).then((json) => {
                            dispatch(generateResult(json.result));
                        });
                    }
                },
            };
        },
    )(Main);
    ReactDOM.render(
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>,
        document.getElementById('main'),
    );
});
