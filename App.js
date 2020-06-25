import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  Platform,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  CheckBox
} from 'react-native';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`
});

const Container = styled(View)`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  align-items: center;
  background-color: #f5f5f5;
`;

const Input = styled(TextInput)`
  border: 1px solid #ccc;
  line-height: 35px;
  width: 100%;
  padding: 0 1rem;
  margin-right: 5px;
`;

const SearchBar = styled(View)`
  width: 100%;
  flex-direction: row;
`;

const List = styled(View)`
  width: 100%;
  margin: 1rem 0;
`;

const Item = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: ${(props) => (props.completed ? 'lightgreen' : '#fff')};
  margin-bottom: 5px;
`;

const DeleteButton = styled(TouchableOpacity)`
  width: 20px;
  height: 20px;
  border: 1px solid red;
  justify-content: center;
  align-items: center;
  background: red;
`;

const DeleteButtonLabel = styled(Text)`
  color: #fff;
  font-weight: 700;
  font-size: 10px;
`;

const Title = styled(Text)``;

const CheckboxContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = () => {
    if (inputValue.trim().length > 0) {
      const newTodos = [
        ...todos,
        {
          id: `${Date.now()}`,
          title: inputValue,
          completed: false
        }
      ];
      setTodos(newTodos);
      setInputValue('');
    }
  };

  const removeTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id != todoId);
    setTodos(newTodos);
  };

  const toggleCompletion = (todoId) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === todoId);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const toggleShowCompleted = () => setShowCompleted(!showCompleted);

  const filterTodos = (todos) => {
    return showCompleted
      ? todos
      : todos.filter((todo) => todo.completed !== true);
  };

  return (
    <Container>
      <SearchBar>
        <Input
          value={inputValue}
          placeholder="todo"
          onChangeText={(value) => setInputValue(value)}
        />
        <Button title="Add Todo" onPress={addTodo} />
      </SearchBar>
      <CheckboxContainer>
        <CheckBox value={showCompleted} onValueChange={toggleShowCompleted} />
        <Text> show completed</Text>
      </CheckboxContainer>
      <List>
        {todos.length > 0 &&
          filterTodos(todos).map((todo, i) => (
            <Item
              key={todo.id}
              onPress={() => toggleCompletion(todo.id)}
              completed={todo.completed ? 1 : 0}
            >
              <Title>
                {i + 1}. {todo.title}
              </Title>
              <DeleteButton onPress={() => removeTodo(todo.id)}>
                <DeleteButtonLabel>X</DeleteButtonLabel>
              </DeleteButton>
            </Item>
          ))}
      </List>
    </Container>
  );
};

export default App;
