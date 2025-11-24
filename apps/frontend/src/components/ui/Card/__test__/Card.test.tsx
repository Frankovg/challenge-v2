import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Card } from '../Card'

describe("Card", () => {
  it("renders the content passed as prop", () => {
    render(<Card content={<div>Test Content</div>} />);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders the CardContainer element", () => {
    const { container } = render(<Card content="Hello" />);

    const cardContainer = container.firstChild;
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer?.nodeName).toBe("DIV");
  });
});
