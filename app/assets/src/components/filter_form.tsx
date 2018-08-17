import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FilterAction, filterChangeKeyword, filterToggleCheckbox } from '../redux/actions';

interface IFormProps {
    day?: any;
    stage?: any;
    keyword?: any;
}

interface ICheckBox {
    key: string;
    label: string;
}

class Form extends React.Component<IFormProps & IDispatchProps> {

    private days: ICheckBox[];
    private stages: ICheckBox[];

    constructor(props: any) {
        super(props);
        this.days = [
            { key: '08-25', label: '8/25(土)' },
            { key: '08-26', label: '8/26(日)' },
        ];
        this.stages = [
            { key: 'strawberry', label: 'ストロベリーステージ' },
            { key: 'blueberry',  label: 'ブルーベリーステージ' },
            { key: 'kiwi',       label: 'キウイステージ' },
            { key: 'peach',      label: 'ピーチステージ' },
            { key: 'orange',     label: 'オレンジステージ' },
            { key: 'talk',       label: 'トークステージ' },
        ];
    }
    public render() {
        const { day, stage, keyword, onChangeKeyword, onToggleCheckbox  } = this.props;
        const days = this.days.map((e, i) => {
            const id = `day-${i}`;
            return (
                <div key={i} className="form-check form-check-inline">
                    <input
                        id={id}
                        type="checkbox"
                        checked={day[e.key]}
                        className="form-check-input"
                        onChange={() => onToggleCheckbox(e.key)}
                    />
                    <label className="form-check-label" htmlFor={id}>
                        {e.label}
                    </label>
                </div>
            );
        });
        const stages = this.stages.map((e, i) => {
            const id = `stage-${i}`;
            return (
                <div key={i} className="form-check form-check-inline">
                    <input
                        id={id}
                        type="checkbox"
                        checked={stage[e.key]}
                        className="form-check-input"
                        onChange={() => onToggleCheckbox(e.key)}
                    />
                    <label className="form-check-label" htmlFor={id}>
                        {e.label}
                    </label>
                </div>
            );
        });
        return (
            <div className="card my-2">
                <div className="card-body pt-2 pb-0">
                    <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label">日付</label>
                            <div className="col-sm-10">{days}</div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label">ステージ</label>
                            <div className="col-sm-10">{stages}</div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label">出演者名</label>
                            <div className="col-sm-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => onChangeKeyword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

interface IDispatchProps {
    onChangeKeyword: (word: string) => void;
    onToggleCheckbox: (name: string) => void;
}

export const FilterForm = connect<{}, IDispatchProps>(
    (state: any) => state.filter,
    (dispatch: Dispatch<FilterAction>): IDispatchProps => {
        return {
            onChangeKeyword: (word: string) => dispatch(filterChangeKeyword(word)),
            onToggleCheckbox: (name: string) => dispatch(filterToggleCheckbox(name)),
        };
    },
)(Form);
