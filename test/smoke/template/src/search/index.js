import React from 'react';
import ReactDOM from 'react-dom';
import logo from '../assets/images/logo.jpg';
import './search.css';
import add from '@wowotou/large-number';
class Index extends React.Component {
  state = { Text: null };
  dynamicCmp = () => {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  };

  render() {
    console.log(
      add(
        '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
        '1',
      ),
    );

    const { Text } = this.state;
    return (
      <div className="search-text">
        {Text ? <Text /> : ''}
        <button className="btn" onClick={this.dynamicCmp}>
          点击加载Text组件
        </button>
        搜索文字的内容 <img src={logo} alt="logo1" />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
