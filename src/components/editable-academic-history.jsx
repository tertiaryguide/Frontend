import { useState } from "react";

const EditableAcademicHistory = ({ data, updateData }) => {
  const [editMode, setEditMode] = useState(false);
  const [academicHistory, setAcademicHistory] = useState(data);

  // Handle input change
  const handleChange = (e, field) => {
    setAcademicHistory({ ...academicHistory, [field]: e.target.value });
  };

  // Handle results change
  const handleResultChange = (e, index, key) => {
    const updatedResults = [...academicHistory.results];
    updatedResults[index][key] = e.target.value;
    setAcademicHistory({ ...academicHistory, results: updatedResults });
  };

  // Save function (calls API or parent update function)
  const handleSave = () => {
    updateData(academicHistory); // Send updated data to backend
    setEditMode(false); // Disable edit mode
  };

  return (
    <section className="border p-4 rounded-lg">
      <h2>Academic History</h2>

      <div className="space-y-4">
        <div>
          <label>Index Number</label>
          <input
            value={academicHistory.indexNumber}
            onChange={(e) => handleChange(e, "indexNumber")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>School</label>
          <input
            value={academicHistory.school}
            onChange={(e) => handleChange(e, "school")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Year</label>
          <input
            value={academicHistory.year}
            onChange={(e) => handleChange(e, "year")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Course</label>
          <input
            value={academicHistory.course}
            onChange={(e) => handleChange(e, "course")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Exams Type</label>
          <input
            value={academicHistory.examsType}
            onChange={(e) => handleChange(e, "examsType")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Editable Results Table */}
        <div>
          <h3 className="mt-4">Results</h3>
          {academicHistory.results.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                {academicHistory.results.map((result, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        value={result.subject}
                        onChange={(e) => handleResultChange(e, index, "subject")}
                        disabled={!editMode}
                        className="border p-2 rounded-md w-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        value={result.grade}
                        onChange={(e) => handleResultChange(e, index, "grade")}
                        disabled={!editMode}
                        className="border p-2 rounded-md w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results available.</p>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <button
        onClick={() => (editMode ? handleSave() : setEditMode(true))}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {editMode ? "Save" : "Edit"}
      </button>
    </section>
  );
};

export default EditableAcademicHistory;
