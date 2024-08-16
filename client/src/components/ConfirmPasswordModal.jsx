import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const ConfirmPasswordModal = ({ onConfirm, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    onConfirm(data.password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Confirm Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPasswordModal;
