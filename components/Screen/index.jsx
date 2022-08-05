import { useRouter } from "next/router";
import AppLayout from "../AppLayout";

const componentPages = {
  "/": require("./Home").default,
  "/school": require("./School").default,
  "/participant": require("./Participant").default,
  "/setting": require("./Setting").default,
};

export default function Page() {
  const { asPath } = useRouter();

  const ComponentPage = componentPages[asPath];
  if (!ComponentPage) return null;

  return (
    <AppLayout>
      <ComponentPage />
    </AppLayout>
  );
}