import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface IBottomNavbarProps extends RouteComponentProps<any> {
    count: number;
}

class BottomNavbar extends React.Component<IBottomNavbarProps> {
    public handleClick() {
        const { history } = this.props;
        history.push('/result');
    }
    public render() {
        const { count } = this.props;
        return (
            <nav className="navbar navbar-light bg-light fixed-bottom">
                <div className="container-fluid text-center">
                    <div className="navbar-collapse">
                        <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>
                            選択中の<strong>{count}</strong>件でタイムテーブルを生成
                        </button>
                    </div>
                </div>
            </nav>
        );
    }
}

export const RoutingBottomNavbar = withRouter(BottomNavbar);
