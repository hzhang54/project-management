"use client"
import { Priority, Project, Task, useGetProjectsQuery, useGetTasksQuery } from '@/state/api';
import React from 'react'
import { useAppSelector } from '../redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '@/components/Header';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

// construct a GridColDef array called taskColumns for the following 4 fields:
// title, status, priority, and dueDate.  The headerNames should capitalized the first letter of the field name,
// and the width for the first fiield is 200, and the width for the rest is 150.
const taskColumns: GridColDef[] = [
{ field: 'title', headerName: 'Title', width: 200 },
{ field: 'status', headerName: 'Status', width: 150 },
{ field: 'priority', headerName: 'Priority', width: 150 },
{ field: 'dueDate', headerName: 'Due Date', width: 150 },
];

// define an array of COLORS with numerical value after # set at 0088FE, 00C49F, FFBB28, FF8042
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const HomePage = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  const { data: projects, isLoading: isProjectLoading } = useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectLoading) {
    return <div>Loading...</div>;
  }
  if (tasksError || !tasks || !projects) {
    return <div>Error fetching data</div>;
  }

  // calculate priority count by reducing tasks using accumulator
  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  // Take the priorityCount object calculated above and map it to a taskDistribution
  // where the key is called name, and the priorityCount for that key is the count
  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  // take the projects loaded from the api and calculate the status count by reducing projects using accumulator
  // the status of a project is infered from its endDate field. If endDate exists, the project is completed,
  // Otherwise, it is Active.
  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  // Take the statusCount object calculated above and map it to a projectDistribution
  // where the key is called name, and the statusCount for that key is the count
  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  // define a chartColors array using a tertiary operator predicate os isDarkMode. If it is true,
  // the keys bar, barGrid, pieFill and text are set to be the following numerical value after #:
  // 8884d8, 303030, 4A90E2, FFFFFF.  The corresponding value for isDarkMode is false are the following:
  // 8884d8, E0E0E0, 82CA9D, 000000.  The chartColors array is then returned.
  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
  <div className='container h-full w-[100%] bg-gray-100 dark:bg-transparent p-8'>
    <Header name="Project Management Dashboard" />
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb4 text-lg font-semibold dark:text-white">
                Task Priority Distribution
            </h3>
            {/* use Responsive Container to render the task priority distribution as a BarChart.
            set the width to 100% and height to 300. Use chartColors defined above for barGrid,
            set the strokeDasharray to "3 3".  */}
            
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={taskDistribution}
                >
                    <CartesianGrid 
                        stroke={chartColors.barGrid}
                        strokeDasharray="3 3" 
                    />
                    <XAxis dataKey="name" stroke={chartColors.text}/>
                    <YAxis stroke={chartColors.text}/>
                    {/* add a tooltip with min-content for width and height */}
                    <Tooltip contentStyle={{ width: "min-content", height: "min-content" }} />
                    {/* add a Legent from rechart, add a Bar with dataKey as count and fill with chartColors.bar  */}
                    {/* add a Legend with payload and formatter to display the count */}
                    <Legend />                    
                    <Bar dataKey="count" fill={chartColors.bar} />

                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb4 text-lg font-semibold dark:text-white">
                Project Status
            </h3>
            {/* use Responsive Container to render the task priority distribution as a BarChart.
            set the width to 100% and height to 300. Use chartColors defined above for barGrid,
            set the strokeDasharray to "3 3".  */}
            
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    {/* add a Pie for projectStatus using count as dataKey 
                    fill with #82ca9d, the key for each cell is cell-index
                    fill color is set to COLORS array, using index mod length of COLORS array as index
                    */}
                    <Pie data={projectStatus} dataKey="count" fill="#82ca9d" label>
                        {projectStatus.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>

                    {/* add a tooltip  */}
                    <Tooltip />
                    
                    {/* add a Legend with payload and formatter to display the count */}
                    <Legend />                    
                

                </PieChart>
            </ResponsiveContainer>
        </div>  
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
            <h3 className="mb4 text-lg font-semibold dark:text-white">
                Your Tasks
            </h3>      
            {/* add a div with style set at height of 300 and width at 100% */}

            <div style={{ height: 400, width: "100%" }}>
            {/* add a DataGrid with rows set to tasks, columns set to taskColumns,
                add a checkboxSelection, and RowClassName is data-grid-row, and cellClassName is data-gridcell,
                use dataGridClassNames as className, and pass isDarkMode to dataGridSxStyles for sx */}

                <DataGrid
                    rows={tasks}
                    columns={taskColumns}
                    checkboxSelection
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                    getRowClassName={() => "data-grid-row"}
                    getCellClassName={() => "data-grid-cell"}
                />
            </div>
        </div>
    </div>
  </div>
  );
}

export default HomePage

