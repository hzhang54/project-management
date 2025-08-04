"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Priority, Task, useGetAuthUserQuery, useGetTasksByUserQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  priority: Priority;
};
// create a grid column definition
const columns: GridColDef[] = [
      //{ field: 'id', headerName: 'ID', width: 70 },
  { field: "title", headerName: "Title", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  // create useState for list view
  const [view, setView] = useState("list");
  // create useState for isModalNewTaskOpen
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  // grab tasks by user using backend query, rename isError to isTasksError and get isLoading state
  // currently hardcode the userId to 1
  // grab current user information using backend api for getting authenticated user query
  const { data: currentUser } = useGetAuthUserQuery({});
  // get userId from currentUser's user details component
  const userId = currentUser?.userDetails?.userId ?? null;
  const {
    data: tasks,
    isError: isTasksError,
    isLoading,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  // use useAppSelector to grab the state of isDarkMode
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  // filter the tasks by priority and save the result in filterdTasks
  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  // Show loading state
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  // Check if isTasksError is true or if tasks does not exist.  If so, return with Error fetching tasks message
  if (isTasksError) {
    return <div>Error fetching tasks</div>;
  }

  return (
    <div className="m-5 p-4">
      {/* import ModelNewTask, onClose set IsModalNewTaskOpen to false */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      {/*
        Add a Header component from component directory below with the name "Priority Page", and include a button 
        and setIsModalNewTaksOpen to true on click.
        */}
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"}
            rounded-l`}
            onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"}
            rounded-l`}
            onClick={() => setView("table")}
        >
          Table
        </button>        
      </div>
      {/* check if isLoading, put in a div saying loading tasks, 
      if isLoading is false, then check if view is "list", if so, map the
      filteredTasks, and render each task using a TaskCard component.
      If the view is table, and filteredTasks existing, render the filteredTasks using
      DataGrid from material ui.
      */}
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (view === "table" && filteredTasks && (
        <div className="w-full">
          <DataGrid
            rows={filteredTasks}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row.id}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
          />
        </div>
      ))
    }  
    </div>
  );
};

export default ReusablePriorityPage;
