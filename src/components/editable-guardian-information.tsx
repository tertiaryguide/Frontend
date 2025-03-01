import React, { useState } from "react";

const EditableGuardianInformation = ({ data, updateData }) => {
  const [editMode, setEditMode] = useState(false);
  const [guardianInformation, setGuardianInformation] = useState(data);

  // Handle input change
  const handleChange = (e, field) => {
    setGuardianInformation({ ...guardianInformation, [field]: e.target.value });
  };

  // Handle results change
  const handleResultChange = (e, index, key) => {
    const updatedResults = [...guardianInformation.results];
    updatedResults[index][key] = e.target.value;
    setGuardianInformation({ ...guardianInformation, results: updatedResults });
  };

  // Save function (calls API or parent update function)
  const handleSave = () => {
    updateData(guardianInformation); // Send updated data to backend
    setEditMode(false); // Disable edit mode
  };

  return (
    <div>
      <section className="">
        <h2 className="text-2xl font-bold">Father's Data</h2>
        <div>
          <label>Full Name</label>
          <input
            value={guardianInformation.name}
            onChange={(e) => handleChange(e, "name")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Contact/Email</label>
          <input
            value={guardianInformation.contact}
            onChange={(e) => handleChange(e, "contact")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Nationality</label>
          <input
            value={guardianInformation.nationality}
            onChange={(e) => handleChange(e, "nationality")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Occupation</label>
          <input
            value={guardianInformation.occupation}
            onChange={(e) => handleChange(e, "occupation")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            value={guardianInformation.address}
            onChange={(e) => handleChange(e, "address")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
      </section>
      <section className="">
        <h2 className="text-2xl font-bold">Mother's Data</h2>
        <div>
          <label>Full Name</label>
          <input
            value={guardianInformation.name}
            onChange={(e) => handleChange(e, "name")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Email/Contact</label>
          <input
            value={guardianInformation.contact}
            onChange={(e) => handleChange(e, "contact")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Nationality</label>
          <input
            value={guardianInformation.nationality}
            onChange={(e) => handleChange(e, "nationality")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Occupation</label>
          <input
            value={guardianInformation.occupation}
            onChange={(e) => handleChange(e, "occupation")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            value={guardianInformation.address}
            onChange={(e) => handleChange(e, "address")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default EditableGuardianInformation;
