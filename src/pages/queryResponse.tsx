const QueryResponse = ({ data }) => {
  return (
    <>
      <h1>Query Response</h1>
      <p>{data.name.toString()}</p>
    </>
  );
};

const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default QueryResponse;
export { getServerSideProps };
