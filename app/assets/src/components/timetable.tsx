import React from 'react';
import { connect } from 'react-redux';

import { RoutingBottomNavbar } from './bottom_nav_bar';
import { FilterForm } from './filter_form';
import { SelectedRow } from './row';

interface ITimeTableProps {
    filter: any;
    timetable: any;
}

class TimeTable extends React.Component<ITimeTableProps> {
    public render() {
        const { filter, timetable } = this.props;
        const regexp = filter.keyword ? new RegExp(filter.keyword, 'i') : null;
        const items = timetable.items.filter((item: any) => {
            if (! filter.day[item.day]) {
                return false;
            }
            if (! filter.stage[item.stage_code]) {
                return false;
            }
            let artist = item.artist || item.detail;
            if (item.detail !== null) {
                artist += ` (${item.detail.join(' ')})`;
            }
            if (regexp && ! artist.match(regexp)) {
                return false;
            }
            return true;
        });
        const selectedCount = Object.keys(timetable.selected).length;
        const rows = items.map((item: any, i: number) => {
            return <SelectedRow key={i} item={item} />;
        });
        const footer = selectedCount > 0 ? <RoutingBottomNavbar count={selectedCount} /> : null;
        return (
            <div>
                <FilterForm />
                <div className="timetable">
                    <p>全{items.length}件</p>
                    <table className="table">
                        <tbody>{rows}</tbody>
                    </table>
                </div>
                {footer}
            </div>
        );
    }
}

export default connect(
    (state) => state,
)(TimeTable);
