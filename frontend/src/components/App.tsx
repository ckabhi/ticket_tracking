import TestCompo from "components/testComponents/TestComp";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchTodoDetails,
  notApiCall,
  fetchTodoList,
} from "../redux/action/todos/todos.action";

export function App() {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const handleChange = (name: string, value: string) => {
    setUserId(value);
  };
  const handleClick = () => {
    performNetworkRequest(userId);
  };

  const performNetworkRequest = async (id: string) => {
    try {
      dispatch(fetchTodoList());
      dispatch(fetchTodoDetails({ userId: id }));
      // dispatch(notApiCall({ userId: id }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>React is working</h2>
      <p>This is test, working fine</p>
      <TestCompo handleChange={handleChange} handleSubmit={handleClick} />
    </div>
  );
}
