import { useState } from "react";

const EditablePersonalInformation = ({ data, email, updateData, }) => {
  const [editMode, setEditMode] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(data);

  // Handle input changes
  const handleChange = (e, field) => {
    setPersonalInfo({ ...personalInfo, [field]: e.target.value });
  };

  // Save function (calls API or parent update function)
  const handleSave = () => {
    updateData(personalInfo); // Send updated data to backend
    setEditMode(false); // Disable edit mode
  };

  return (
    <section className="border p-4 rounded-lg">
      <h2>Personal Information</h2>

      <div className="space-y-4">
        <div>
          <label>Email</label>
          <input
            value={email}
            disabled
            className="border p-2 rounded-md w-full bg-gray-100"
          />
        </div>
        <div>
          <label>Surname</label>
          <input
            value={personalInfo.surname}
            onChange={(e) => handleChange(e, "surname")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Other Names</label>
          <input
            value={personalInfo.otherNames}
            onChange={(e) => handleChange(e, "otherNames")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => handleChange(e, "dateOfBirth")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Nationality</label>
          <input
            value={personalInfo.nationality}
            onChange={(e) => handleChange(e, "nationality")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Place of Residence</label>
          <input
            value={personalInfo.placeOfResidence}
            onChange={(e) => handleChange(e, "placeOfResidence")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Digital Address</label>
          <input
            value={personalInfo.digitalAddress}
            onChange={(e) => handleChange(e, "digitalAddress")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Home Address</label>
          <input
            value={personalInfo.homeAddress}
            onChange={(e) => handleChange(e, "homeAddress")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label>Contact</label>
          <input
            value={personalInfo.contact}
            onChange={(e) => handleChange(e, "contact")}
            disabled={!editMode}
            className="border p-2 rounded-md w-full"
          />
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

export default EditablePersonalInformation;
