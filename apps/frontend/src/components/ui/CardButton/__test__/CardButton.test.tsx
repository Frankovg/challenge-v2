import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";

import { CardButton } from "../CardButton";

describe("CardButton", () => {
  it("renders children", () => {
    render(<CardButton>Click Me</CardButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    const { container } = render(<CardButton>Hi</CardButton>);
    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("spreads button props onto the underlying element", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<CardButton onClick={onClick}>Press</CardButton>);

    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <CardButton disabled onClick={onClick}>
        Disabled
      </CardButton>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
