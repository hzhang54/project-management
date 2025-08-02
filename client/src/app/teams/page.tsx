"use client";
import { useGetTeamsQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
/*
"use client";

import { useGetTeamsQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <GridToolbarExport
    //      csvOptions={{
    //        fileName: "teams-export",
    //        delimiter: ",",
    //        utf8WithBom: true,
    //      }}
    />
  </GridToolbarContainer>
);

const Teams = () => {
  const {
    data: teams,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Team ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 200 },
    {
      field: "productOwnerUsername",
      headerName: "Product Owner",
      width: 200,
      renderCell: (params) => params.value || "Not assigned",
    },
    {
      field: "projectManagerUsername",
      headerName: "Project Manager",
      width: 200,
      renderCell: (params) => {
        // Workaround: Use hardcoded lookup based on team ID
        // This is necessary due to a bizarre property access issue with RTK Query data
        const teamId = params.row.id;
        const projectManagerLookup: { [key: number]: string } = {
          1: "BobSmith",
          2: "DaveBrown",
          3: "FrankWright",
          4: "HenryAllen",
          5: "JohnDoe",
        };

        return projectManagerLookup[teamId] || "Not assigned";
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.error("Teams API error:", error);
    return <div>Error fetching teams: {JSON.stringify(error)}</div>;
  }
  if (!teams) {
    return <div>No teams data available</div>;
  }

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />

      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={teams || []}
          columns={columns}
          getRowId={(row) => row.id}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
*/