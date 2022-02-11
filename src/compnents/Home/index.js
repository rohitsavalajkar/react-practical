import React from "react";
import Task from "../Task/Task";
import { createStyles, makeStyles } from "@material-ui/styles";

function index() {
  return (
    <div className="container text-center">
      <h1>Welcome The Dashboad!</h1>
      <Task />
    </div>
  );
}

export default index;
