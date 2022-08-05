import { useAppSessionContext } from "context/AppSession";

export default function School() {
  const user = useAppSessionContext();

  return <pre>{JSON.stringify(user, null, 4)}</pre>;
}