import React, { useState, useEffect } from "react";
import { statuses } from "../constants";
import { createProcedure, getAllUsersFromServer } from "../action";
import { Procedure, ProcedureWithUser, User } from "../types";
import * as z from "zod";
import { motion } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  addProcedure: (procedure: ProcedureWithUser) => void;
};

enum TYPE_CATEGORY {
  BUG = "Bug",
  DESIGN = "Design",
  FEATURE = "Feature",
  RESEARCH = "Research",
}

const procedureSchema = z.object({
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters" })
    .max(100, { message: "Description must be at most 100 characters" }),
  importance: z.enum(["High", "Medium", "Low"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  status: z.string().nonempty({ message: "Status is required" }),
  assignedId: z.string().nonempty({ message: "Assigned user is required" }),
  category: z.nativeEnum(TYPE_CATEGORY, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, addProcedure }) => {
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("High");
  const [status, setStatus] = useState(statuses[0]);
  const [assignedId, setassignedId] = useState<string | undefined>();
  const [category, setCategory] = useState(TYPE_CATEGORY.BUG);
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAllUsersFromServer();
      setUsers(res);
      if (res.length > 0) {
        setassignedId(res[0].id);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setDescription("");
      setImportance("High");
      setStatus(statuses[0]);
      setassignedId(users.length > 0 ? users[0].id : undefined);
      setCategory(TYPE_CATEGORY.BUG);
      setErrors([]);
    }
  }, [isOpen, users]);

  const handleSubmit = async () => {
    const validationResult = procedureSchema.safeParse({
      description,
      importance,
      status,
      assignedId,
      category,
    });

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }
    const resp = await createProcedure({
      description,
      importance: importance.toUpperCase(),
      status: status.toUpperCase(),
      assignedId,
      category: category.toUpperCase(),
    });
    addProcedure(resp);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg w-full max-w-md relative"
        >
          <h2 className="text-lg font-satoshi font-extrabold mb-4 text-[#1C274C]">
            Create Procedure
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
          >
            X
          </button>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-inter text-[#64748B] mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF]"
                rows={4}
              />
              {errors.find((err) => err.path.includes("description")) && (
                <span className="text-red-500 text-xs">
                  {
                    errors.find((err) => err.path.includes("description"))
                      ?.message
                  }
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-inter text-[#64748B] mb-1">
                Priority
              </label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value)}
                className="w-full p-2 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF]"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.find((err) => err.path.includes("importance")) && (
                <span className="text-red-500 text-xs">
                  {
                    errors.find((err) => err.path.includes("importance"))
                      ?.message
                  }
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-inter text-[#64748B] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() +
                      status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors.find((err) => err.path.includes("status")) && (
                <span className="text-red-500 text-xs">
                  {errors.find((err) => err.path.includes("status"))?.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-inter text-[#64748B] mb-1">
                Assign To
              </label>
              <select
                value={assignedId}
                onChange={(e) => setassignedId(e.target.value)}
                className="w-full p-2 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF]"
              >
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
              {errors.find((err) => err.path.includes("assignedId")) && (
                <span className="text-red-500 text-xs">
                  {
                    errors.find((err) => err.path.includes("assignedId"))
                      ?.message
                  }
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-inter text-[#64748B] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TYPE_CATEGORY)}
                className="w-full p-2 bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-[#635BFF]"
              >
                {Object.values(TYPE_CATEGORY).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.find((err) => err.path.includes("category")) && (
                <span className="text-red-500 text-xs">
                  {errors.find((err) => err.path.includes("category"))?.message}
                </span>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-[#635BFF] text-white py-2 px-4 rounded-lg hover:bg-[#4e4bfc]"
              >
                Create
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  );
};

export default Modal;
