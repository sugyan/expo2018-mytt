import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { generateResult } from '../redux/actions';

interface IStateProps {
    timetable: any;
}

interface IDispatchProps {
    onGenerateResult: (data?: string) => void;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<any>;

interface IState {
    url?: string;
    urlFetching: boolean;
}

class Result extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            url: undefined,
            urlFetching: false,
        };
    }
    public componentDidMount() {
        const { timetable, onGenerateResult } = this.props;
        onGenerateResult();
        if (Object.keys(timetable.selected).length === 0) {
            return;
        }
        fetch('/api/generate', {
            body: JSON.stringify({
                ids: Object.keys(timetable.selected),
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then((response) => {
            return response.json();
        }).then((json) => {
            onGenerateResult(json.result);
        });
    }
    public handleClickTweetButton() {
        const { timetable, history } = this.props;
        this.setState({ urlFetching: true });
        fetch('/api/tweet', {
            body: JSON.stringify({
                ids: Object.keys(timetable.selected),
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        }).then((response) => {
            return response.json();
        }).then((json) => {
            history.push('/tt/' + json.key);
            const url = 'https://twitter.com/intent/tweet?hashtags=TIF2018_MyTT'
                + '&text=' + encodeURIComponent(`俺のタイテ ${json.url}`)
                + '&url=' + encodeURIComponent(window.location.href);
            this.setState({ url });
        });
    }
    public render() {
        const { timetable, history } = this.props;
        const result = timetable.result
            ? <img src={timetable.result} style={{ maxWidth: '100%' }} />
            : <div>画像を生成しています...</div>;
        let button;
        if (this.state.url) {
            button = (
                <a className="btn btn-primary" href={this.state.url} target="_blank">
                    Tweetする
                </a>
            );
        } else {
            button = (
                <button
                    className="btn btn-info"
                    disabled={this.state.urlFetching}
                    onClick={this.handleClickTweetButton.bind(this)}
                >
                    URLを取得
                </button>
            );
        }
        return (
            <div>
                <div>{result}</div>
                <hr />
                <div className="float-left">
                    <button className="btn btn-light" onClick={() => history.push('/')}>
                        選び直す
                    </button>
                </div>
                <div className="float-right">{button}</div>
            </div>
        );
    }
}

export default connect(
    (state: any): IStateProps => {
        return {
            timetable: state.timetable,
        };
    },
    (dispatch: Dispatch): IDispatchProps => {
        return {
            onGenerateResult: (data?: string) => dispatch(generateResult(data)),
        };
    },
)(withRouter(Result));
