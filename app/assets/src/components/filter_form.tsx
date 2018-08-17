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
            { key: '08-03', label: '8/3(金)' },
            { key: '08-04', label: '8/4(土)' },
            { key: '08-05', label: '8/5(日)' },
        ];
        this.stages = [
            { key: 'HOTSTAGE',      label: 'HOT STAGE'       },
            { key: 'SMILEGARDEN',   label: 'SMILE GARDEN'    },
            { key: 'DREAMSTAGE',    label: 'DREAM STAGE'     },
            { key: 'DOLLFACTORY',   label: 'DOLL FACTORY'    },
            { key: 'SKYSTAGE',      label: 'SKY STAGE'       },
            { key: 'FESTIVALSTAGE', label: 'FESTIVAL STAGE'  },
            { key: 'FUJIYOKOSTAGE', label: 'FUJI YOKO STAGE' },
            { key: 'INFOCENTRE',    label: 'INFO CENTRE'     },
            { key: 'GREETINGAREA',  label: 'GREETING AREA'   },
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
