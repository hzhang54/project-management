import { useCreateProjectMutation } from "@/state/api";
import { Modal } from "@mui/material";
import { X } from "lucide-react";
import React, { useState } from "react";
import { formatISO } from "date-fns"; // 5:16:18

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="dark:bg-dark-secondary w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Create New Project
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="dark:hover:bg-dark-tertiary rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          </div>
          <form
            className="mt-4 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={inputStyles}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputStyles}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputStyles}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputStyles}
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-primary focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                !isFormValid() || isLoading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalNewProject;
