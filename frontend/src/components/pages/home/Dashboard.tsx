import { useEffect, useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  fetchTodoList,
} from "../../../redux/action/todos/todos.action";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  IconButton,
  TextField,
  InputBase,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  AddCircleOutline,
} from "@mui/icons-material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { IAddTodoFormData } from "../../../ts/interfaces/todo.interface";
import { defaultTodoFormData } from "../../../constant/defaultValue";

const AddTodo = styled(ListItem)(({ theme }) => ({
  border: "dashed 1px grey",
  backgroundColor: "beige",
}));
const TodoInput1 = styled(TextField)(({ theme }) => ({
  flex: `1`,
  minWidth: 0,
  marginTop: "4px",
  marginBottom: "4px",
}));
const TodoInputWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  flex: 1,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state: any) => state?.todo?.todoList);

  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [todoData, setTodoData] =
    useState<IAddTodoFormData>(defaultTodoFormData);

  useEffect(() => {
    dispatch(fetchTodoList(1, 10));
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = todoList.map((itm: any) => itm._id);
      setCheckedItems(allIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleToggleItem = (id: string) => {
    const currentIndex = checkedItems.indexOf(id);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectAll(newChecked.length == todoList.length);
    setCheckedItems(newChecked);
  };

  const handleDeleteSelected = () => {
    // Handle deletion of selected items
  };

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#ffffff" : "#f9f9f9"; // Alternating white and light gray background colors
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event?.target?.name;
    const value = event?.target?.value;
    console.log({ [name]: value });
    setTodoData({ ...todoData, [name]: value });
  };

  const handleTodoAdd = () => {
    dispatch(addTodo(todoData));
    setTodoData(defaultTodoFormData);
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: (theme) => theme.palette.primary.main,
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        My Container Heading
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
          </ListItemIcon>
          <ListItemText primary="Select All" />
          <IconButton onClick={handleDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
        {todoList &&
          todoList.map((item: any, index: number) => {
            return (
              <ListItem
                key={index.toString()}
                style={{ backgroundColor: getRowColor(index) }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checkedItems.includes(item._id)}
                    onChange={() => handleToggleItem(item._id)}
                  />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <IconButton>
                  <ExpandMoreIcon />
                </IconButton>
              </ListItem>
            );
          })}
        <AddTodo>
          <ListItemIcon>
            <Checkbox disabled />
          </ListItemIcon>
          <TodoInputWrapper>
            <StyledInput
              name="title"
              value={todoData.title}
              placeholder="Add Todo Item"
              onChange={handleInputChange}
            />
          </TodoInputWrapper>
          <IconButton
            onClick={handleTodoAdd}
            disabled={todoData.title.trim().length > 0 ? false : true}
          >
            <AddCircleOutline />
          </IconButton>
        </AddTodo>
      </List>
    </Container>
  );
};

export default Dashboard;
