import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ISelectItemAction, selectItem } from '../redux/actions';

// import { selectItem } from '../redux/actions';

interface IRowProps {
    item: any;
}

interface IStateProps {
    timetable: any;
}

interface IDispatchProps {
    onSelectItem: (id: string, checked: boolean) => void;
}

type IProps = IRowProps & IStateProps & IDispatchProps;

class Row extends React.Component<IProps> {
    public render() {
        const { item, timetable, onSelectItem } = this.props;
        let content = item.artist;
        if (item.detail) {
            content += ` [${item.detail.join(', ')}]`;
        }
        return (
            <tr>
                <td style={{ whiteSpace: 'nowrap' }}>
                    <div className="form-check">
                        <input
                            id={item.id}
                            type="checkbox"
                            className="form-check-input"
                            checked={timetable.selected[item.id] ? true : false}
                            onChange={(e) => onSelectItem(item.id, e.target.checked)}
                        />
                        <label htmlFor={item.id} className="form-check-label">
                            {item.start.format('M/D(ddd) HH:mm')} - {item.end.format('HH:mm')}
                        </label>
                    </div>
                </td>
                <td style={{ backgroundColor: item.color, padding: '4px', width: '100%' }}>
                    <label
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'block',
                            fontWeight: 'normal',
                            marginBottom: 'initial',
                            padding: '4px',
                        }}
                        htmlFor={item.id} >
                        <small>{item.stage}</small>
                        <br />
                        <strong>{content}</strong>
                    </label>
                </td>
            </tr>
        );
    }
}

export const SelectedRow = connect<IStateProps, IDispatchProps>(
    (state: any): IStateProps => {
        return {
            timetable: state.timetable,
        };
    },
    (dispatch: Dispatch<ISelectItemAction>): IDispatchProps => {
        return {
            onSelectItem: (id: string, checked: boolean) => dispatch(selectItem(id, checked)),
        };
    },
)(Row);
