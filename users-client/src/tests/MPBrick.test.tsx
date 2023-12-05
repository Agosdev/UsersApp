import MPBrick from "../components/MPBrick";
import { fireEvent, render, screen } from "@testing-library/react";
import { test, describe, expect } from "vitest";

describe("MPBrick", () => { 
    
    beforeEach(() => {
        render(<MPBrick />)
    })
    
    test('should show the course info and pay button', () => {
        const button = screen.getByText('BuyFullStack Course');
        const title = screen.getByText('FullStack Course');
        const image = screen.getByAltText('course-image');

        expect(title).toBeDefined();
        expect(button).toBeDefined();
        expect(image).toBeDefined();
    });

    test('should show the MP button when pay button is clicked', async () => {
        const button = screen.getByText('Buy FullStack Course');
        fireEvent.click(button);

        expect(screen.findAllByText('Pay with Mercado Pago')).toBeDefined();

        expect(screen.debug())
    });
})