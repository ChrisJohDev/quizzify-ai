import bodyParser from "body-parser";
import { promisify } from "util";

const getBody = promisify(bodyParser.urlencoded());

export async function getServerSideProps({ req, res }) {
  if (req.method === "POST") {
    await getBody(req, res);
  }

  const data = req.body;

  console.log('\n*** [getServerSideProps] data:', data);

  return {
    props: {
      name: req.body?.name || "smeijer",
      message: req.body ? "received!" : "",
    }
  };
}

export default function IndexPage(props: any) {
  return (
    <>
      <form method="post">
        <label htmlFor="name">Name</label>
        <input name="name" defaultValue={props.name} style={{color: "black"}} />
        <button type="submit">submit</button>
      </form>
      <p>
        {props.message}
      </p>
    </>
  );
}
