import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import Container from "@mui/material/Container";
import HomeCard from "./HomeCard";

const FeaturedPost = () => {
  const [value, loading, error] = useCollection(collection(db, "blogs"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <Container>
            {value.docs.map((doc) => (
              <HomeCard doc={doc} />
            ))}
          </Container>
        )}
      </p>
    </div>
  );
};

export default FeaturedPost;
