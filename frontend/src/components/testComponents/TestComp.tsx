const TestCompo = (props: any) => {
  const { handleChange, handleSubmit } = props;
  return (
    <div>
      <input
        name="userId"
        onChange={(e) => {
          handleChange(e.target.name, e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TestCompo;
