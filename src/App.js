import React, {Component} from 'react';
import TodoListTemplate from './componenets/TodoListTemplate';
import Form from './componenets/Form';
import TodoItemList from './componenets/TodoItemList';
import Palette from './componenets/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

const Problematic = () => {
  throw (new Error("버그가 나타났따!!"));
  return (
    <div>

    </div>
  );
};

class App extends Component {

  // Life Cycle
  constructor(props) {
    super(props);
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate");
  //   if (this.id % 3 === 0) return false;
  //   return true;
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log("componenetDidUpdate");
  }










  id = 0; // 이미 0, 1, 2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [],
    color: '#343a40'
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const {input, todos, color} = this.state;
    this.setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌러진 키가 Enter 면 handleCreate 호출
    if (e.key === "Enter") {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index] // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사
    
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    })
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) return (<h1>에러발생!</h1>);

    const {input, todos, color} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;
    return (
      <div>
        <TodoListTemplate form={(
          <Form
            value={input}
            onChange={handleChange}
            onCreate={handleCreate}
            onKeyPress={handleKeyPress}
            color={color}
          />
        )}
          palette={(
            <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>
          )}>
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}></TodoItemList>
        </TodoListTemplate>

        {this.id === 4 && <Problematic />}{/* 에러발생 테스트 */}
      </div>
    );
  }
}

export default App;
