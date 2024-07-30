import React, { useState, useEffect } from "react";
import Image from "next/image";
import { statuses } from "../constants";
import { getAllUsersFromServer } from "../action";
import { User } from "../types";
import * as z from "zod";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const procedureSchema = z.object({
  description: z.string().nonempty({ message: "Description is required" }),
  importance: z.enum(["High", "Medium", "Low"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  status: z.string().nonempty({ message: "Status is required" }),
  assignedUserId: z.string().nonempty({ message: "Assigned user is required" }),
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("High");
  const [status, setStatus] = useState(statuses[0]);
  const [assignedUserId, setAssignedUserId] = useState<string | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAllUsersFromServer();
      setUsers(res);
      if (res.length > 0) {
        setAssignedUserId(res[0].id);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setDescription("");
      setImportance("High");
      setStatus(statuses[0]);
      setAssignedUserId(users.length > 0 ? users[0].id : undefined);
      setErrors([]);
    }
  }, [isOpen, users]);

  const handleSubmit = () => {
    const validationResult = procedureSchema.safeParse({
      description,
      importance,
      status,
      assignedUserId,
    });

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }

    // onSubmit({
    //   description,
    //   importance,
    //   status,
    //   assignedUserId,
    // });
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-lg font-satoshi font-extrabold mb-4 text-[#1C274C]">
          Create Procedure
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <Image
            src="/icons/Close.svg"
            alt="Close Icon"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-inter text-[#64748B] mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-[#D1D5DB] rounded"
              rows={4}
            />
            {errors.find((err) => err.path.includes("description")) && (
              <span className="text-red-500 text-xs">
                {errors.find((err) => err.path.includes("description"))?.message}
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
              className="w-full p-2 border border-[#D1D5DB] rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.find((err) => err.path.includes("importance")) && (
              <span className="text-red-500 text-xs">
                {errors.find((err) => err.path.includes("importance"))?.message}
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
              className="w-full p-2 border border-[#D1D5DB] rounded"
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
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
              className="w-full p-2 border border-[#D1D5DB] rounded"
            >
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {errors.find((err) => err.path.includes("assignedUserId")) && (
              <span className="text-red-500 text-xs">
                {errors.find((err) => err.path.includes("assignedUserId"))?.message}
              </span>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#635BFF] text-white py-2 px-4 rounded"
            >
              Create
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
