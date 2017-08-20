// 测试数据
var _score = [
    {name: '张三', gender: '男', chinese: 85, math: 98, _id:0},
    {name: '张三', gender: '女', chinese: 95, math: 90, _id:1},
    {name: '李四', gender: '男', chinese: 65, math: 48, _id:2},
    {name: '大妹', gender: '女', chinese: 95, math: 100, _id:3},
    {name: '王五', gender: '男', chinese: 75, math: 88, _id:4},
    {name: '赵钱', gender: '男', chinese: 75, math: 98, _id:5},
    {name: '二妹', gender: '女', chinese: 90, math: 98, _id:6}
];

var StudentScoreTable = React.createClass({
    getInitialState: function () {
        return {
            genderFilter: 0,
            nameFilter: '',
            data: _score,
            modifyScore: null,
            className: 'dialog modify'
        }
    },
    onGenderChange: function (gender) {
        this.setState({genderFilter: gender});
    },
    onDeleteScoreItem: function (id) {
        var data = this.state.data.map(function (item) {
            if(item._id === id) {
                item.deleteFlag = true;
            }
            return item;
        });

        this.setState(data, data);
    },
    onNameChange: function (name) {
        this.setState({nameFilter: name});
    },
    render: function () {
        return (
            <div>
               <GenderFilter onGenderChange={this.onGenderChange} genderFilter={this.state.genderFilter}/>
               <NameFilter onNameChange={this.onNameChange} nameFilter={this.state.nameFilter}/>
               <ScoreTable
                    scoreNotes={this.state.data}
                    genderFilter={this.state.genderFilter}
                    nameFilter={this.state.nameFilter}
                    deleteScoreItem={this.onDeleteScoreItem}
                    modifyItem={this.onModify}
               />
           </div>
        );
    }
});

var GenderFilter = React.createClass({
    genderChangeHandler: function () {
        this.props.onGenderChange(this.refs.genderFilter.getDOMNode().value);
    },
    render: function () {
        return (
            <div className="condition-item">
                <label>
                    <span>按性别筛选</span>
                    <select onChange={this.genderChangeHandler} ref="genderFilter">
                        <option value="0">All</option>
                        <option value="1">男生</option>
                        <option value="2">女生</option>
                    </select>
                </label>
            </div>
            );
    }
});

var NameFilter = React.createClass({
    nameChangeHandler: function () {
        this.props.onNameChange(this.refs.nameFilter.getDOMNode().value);
    },
    render: function () {
        return (
            <div className="condition-item">
                <label>
                    <span>按姓名筛选</span>
                    <input type="text" ref="nameFilter" onChange={this.nameChangeHandler} value={this.props.nameFilter}/>
                </label>
            </div>
            );
    }
});

var ScoreTable = React.createClass({
    deleteItemHandler: function (id) {
        this.props.deleteScoreItem(id);
    },
    modifyItem: function (id) {
        this.props.modifyItem(id);
    },
    render: function () {
        var scoreNotes = [];
        var genderFilter = +this.props.genderFilter,
            nameFilter = this.props.nameFilter,
            GENDER = ['', '男', '女'],
            _this = this;

        this.props.scoreNotes.map(function (scoreItem) {
            if (genderFilter !== 0 && nameFilter === '') {
                // 仅genderfilter生效
                if (GENDER[genderFilter] === scoreItem.gender) {
                    !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} onDelete={_this.deleteItemHandler} onModify={_this.modifyItem}/>);
                }
                return;
            }

            if (genderFilter === 0 && nameFilter !== '') {
                // 仅nameFilter生效
                if (scoreItem.name === nameFilter) {
                    !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} onDelete={_this.deleteItemHandler} onModify={_this.modifyItem}/>);
                }
                return;
            }

            if (genderFilter !== 0 && nameFilter !== '') {
                // 两个filter都生效
                if (GENDER[genderFilter] === scoreItem.gender && scoreItem.name === nameFilter) {
                    !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} onDelete={_this.deleteItemHandler} onModify={_this.modifyItem}/>);
                }
                return;
            }

            !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} onDelete={_this.deleteItemHandler} onModify={_this.modifyItem}/>);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>语文</th>
                        <th>数学</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {scoreNotes}
                </tbody>
            </table>
            );
    }
});

var ScoreItem = React.createClass({
    deleteHandler: function (e, id) {
        this.props.onDelete(this.props.score._id);
    },
    modifyHandler: function () {
        this.props.onModify(this.props.score._id);
    },
    render: function () {
        var score = this.props.score;

        return (
            <tr>
                <td>{score.name}</td>
                <td>{score.gender}</td>
                <td>{score.chinese}</td>
                <td>{score.math}</td>
                <td><span className="trigger" onClick={this.modifyHandler}>修改</span><span className="trigger" onClick={this.deleteHandler}>删除</span></td>
            </tr>
            );
    }
});

React.render(<StudentScoreTable />, document.querySelector('.j-score'));