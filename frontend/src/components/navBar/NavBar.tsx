import { MenuItem } from "./MenuItem";
import "__style.scss";

interface NavProps {
  active: string;
}

const NavBar = (props: NavProps) => {
  return (
    <nav>
      <h3>ToDo List</h3>
    </nav>
  );
};

export default NavBar;
