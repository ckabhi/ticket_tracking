import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    console.log("Dashboard is loading...");
  });
  return (
    <div>
      <h4>Now you are on dashboard</h4>
    </div>
  );
};

export default Dashboard;
