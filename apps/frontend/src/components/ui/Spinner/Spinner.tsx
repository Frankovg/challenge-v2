import { SpinnerContainer } from "./Spinner.styles"

export const Spinner = ({
  size = 30,
}: {
  size?: number;
}) => {
  return <SpinnerContainer size={size} />;
};
