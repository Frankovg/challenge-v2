import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ScrollArea } from "../ScrollArea";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(
      <ScrollArea>
        <div>Child content</div>
      </ScrollArea>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders a container element", () => {
    const { container } = render(<ScrollArea>Content</ScrollArea>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
