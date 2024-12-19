import React, { useState } from "react";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [age, setAge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCurrentDateSet, setIsCurrentDateSet] = useState(false); // Track if current date is set

  const calculateAge = () => {
    if (!dob || !currentDate) {
      alert("Please select both the date of birth and the current date.");
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date(currentDate);

    if (birthDate > today) {
      alert("Date of birth cannot be greater than the current date.");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const setToCurrentDate = () => {
    if (!isCurrentDateSet) {
      setIsModalOpen(true); // Show modal to confirm setting current date
    } else {
      setIsModalOpen(true); // Show modal to confirm clearing the current date
    }
  };

  const handleModalConfirm = () => {
    if (!isCurrentDateSet) {
      const today = new Date().toISOString().split("T")[0];
      setCurrentDate(today); // Set the current date
      setIsCurrentDateSet(true); // Mark the current date as set
    } else {
      setCurrentDate(""); // Clear the current date
      setIsCurrentDateSet(false); // Mark current date as not set
    }
    setIsModalOpen(false); // Close the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal without changing the current date
  };

  return (
    <div className="w-75 m-auto container flex justify-center items-center h-[400px] mt-4">
      <div className="space-y-2">
        <h2 className="text-center my-4 text-2xl font-bold">Age Calculator</h2>
        <div className="space-x-4">
          <label>Date of Birth</label>
          <input
            type="date"
            className="w-80 p-2 rounded-xl border border-gray-500 outline-none cursor-pointer"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="space-x-4">
          <label>Current Date</label>
          <input
            type="date"
            className="w-80 p-2 rounded-xl border border-gray-500 outline-none cursor-pointer"
            value={currentDate}
            min={dob} // Ensures currentDate cannot be earlier than dob
            onChange={(e) => setCurrentDate(e.target.value)}
          />
          <button
            onClick={setToCurrentDate}
            className="p-2 border hover:border-gray-500 rounded-xl my-5 cursor-pointer bg-blue-600 border-white text-white"
          >
            {isCurrentDateSet ? "Cancel Current Date" : "Set Current Date"}
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={calculateAge}
            className="p-2 border hover:border-gray-500 rounded-xl my-5 cursor-pointer bg-blue-600 border-white text-white"
          >
            Calculate Age
          </button>
        </div>
        <div>
          {age && (
            <h2 className="text-center text-lg font-medium">
              Your Age is (yy/mm/dd): {age.years}/{age.months}/{age.days}
            </h2>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center my-10">
          <div className="bg-gray-300 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl mb-4">
              {isCurrentDateSet ? "Confirm Clear Current Date" : "Set Current Date"}
            </h3>
            <p>
              {isCurrentDateSet
                ? "Are you sure you want to cancel the current date and clear it?"
                : "Are you sure you want to set the current date as today's date?"}
            </p>
            <div className="flex justify-end mt-4 gap-3 ">
              <button
                onClick={handleModalConfirm}
                className="bg-blue-600 text-white p-2 rounded-xl w-12"
              >
                OK
              </button>
              <button
                onClick={handleModalClose}
                className="bg-red-500 text-white p-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
