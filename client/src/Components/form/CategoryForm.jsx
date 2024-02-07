

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category!"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="bg-blue-500 btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
