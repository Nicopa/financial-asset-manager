import { TextField } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useFormField, validationRules } from "./useFormField";
describe("useFormField", () => {
	test("It should change value on typing.", () => {
		const TestUseFormField = () => {
			const field = useFormField();
			return (
				<TextField label="Test" value={field.value} onChange={field.onChange} />
			);
		};
		render(<TestUseFormField />);
		const input = screen.getByDisplayValue<HTMLInputElement>("");
		expect(input.value).toBe("");
		fireEvent.change(input, { target: { value: "testing" } });
		expect(input.value).toBe("testing");
	});
	test("It should be able to start with an initial value.", () => {
		const TestUseFormField = () => {
			const field = useFormField({
				name: "test",
				initialValue: "My initial value",
			});
			return (
				<TextField label="Test" value={field.value} onChange={field.onChange} />
			);
		};
		render(<TestUseFormField />);
		const input =
			screen.getByDisplayValue<HTMLInputElement>("My initial value");
		expect(input).toBeInTheDocument();
	});
	test("It should be able to set an on-change event and still keep updating its value.", () => {
		const callback = jest.fn();
		const TestUseFormField = () => {
			const field = useFormField({ name: "test", onChange: callback });
			return (
				<TextField label="Test" value={field.value} onChange={field.onChange} />
			);
		};
		render(<TestUseFormField />);
		const input = screen.getByDisplayValue<HTMLInputElement>("");
		expect(input.value).toBe("");
		fireEvent.change(input, { target: { value: "testing" } });
		expect(input.value).toBe("testing");
		expect(callback).toBeCalledTimes(1);
	});
	test("It should be able to set a validation. On blur, if the value is not valid, it should change its state.", () => {
		const TestUseFormField = () => {
			const field = useFormField({
				name: "test",
				initialValue: "My initial value",
				validations: [
					{
						rule: validationRules.required,
						message: "This field is required.",
					},
					{
						rule: validationRules.email,
						message: "This is not a valid email.",
					},
				],
			});
			return (
				<TextField
					label="Test"
					value={field.value}
					inputProps={{
						onChange: field.onChange,
						onBlur: field.onBlur,
					}}
					error={!field.isValid}
					helperText={field.errorMessages.join(" ")}
				/>
			);
		};
		render(<TestUseFormField />);
		const input =
			screen.getByDisplayValue<HTMLInputElement>("My initial value");
		expect(input.value).toBe("My initial value");
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
		expect(input.value).toBe("");
		expect(screen.getByText(/This field is required./)).toBeInTheDocument();
	});
});
