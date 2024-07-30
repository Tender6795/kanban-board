import React, { useState, useEffect } from "react";
import Image from "next/image";
import { statuses } from "../constants";
import { getAllUsersFromServer } from "../action";
import { User } from "../types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");
  const [status, setStatus] = useState(statuses[0]);
  const [assignedUserId, setAssignedUserId] = useState<string | undefined>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAllUsersFromServer();
      setUsers(res);
    })();
  }, []);
  
  //   useEffect(() => {
  //     if (!isOpen) {
  //       setDescription("");
  //       setImportance("");
  //       setStatus(statuses[0]);
  //       setAssignedUserId(undefined);
  //     }
  //   }, [isOpen]);
  const handleSubmit = () => {
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
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
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
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
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
              <option value="">Select User</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
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
