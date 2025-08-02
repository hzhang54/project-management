export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    "& .MuiDataGrid-root": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : "#374151"}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
        borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
      },
    },
    "& .MuiIconButton-root": {
      color: `${isDarkMode ? "#a3a3a3" : "#374151"}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : "#374151"}`,
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : "#374151"}`,
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
      borderTop: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
    },
    "& .MuiDataGrid-toolbarContainer": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiDataGrid-main": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
      color: `${isDarkMode ? "#e5e7eb" : "#374151"}`,
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
      backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
      "&:hover": {
        backgroundColor: `${isDarkMode ? "#3b3d40" : "#f3f4f6"}`,
      },
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
    },
  };
};
