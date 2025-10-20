import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
	type ChangeEvent,
	type Ref,
} from "react";
import { Form } from "react-bootstrap";

type TValueFound = boolean;

export type SearchInputProps = {
	label?: string;
	placeholder?: string;
	search?: (text: string) => TValueFound;
};

export type SearchInputHandler = {
	value: string;
};

export const SearchInput = forwardRef(
	(
		{ placeholder, label, search }: SearchInputProps,
		ref: Ref<SearchInputHandler>
	) => {
		const [value, setValue] = useState<string>("");
		const [showTooltip, setShowTooltip] = useState<boolean>(false);

		const target = useRef<HTMLInputElement>(null);

		useImperativeHandle(ref, () => ({
			get value() {
				return value;
			},
			set value(newValue: string) {
				setValue(newValue);
			},
		}));

		function handleChange(event: ChangeEvent<HTMLInputElement>) {
			const text = event.target.value;
			setValue(text);

			if (!search) return;
			if (search(text)) return;

			setShowTooltip(text.trim().length > 0);
		}

		return (
			<Form.Group controlId="ingredients" className="position-relative">
				<Form.Label>{label ?? "Search"}</Form.Label>
				<div className="hint-input-wrapper">
					<Form.Control
						ref={target}
						type="text"
						value={value}
						placeholder={placeholder}
						onChange={handleChange}
					/>

					{showTooltip && (
						<span className="d-flex align-items-center gap-2 input-hint">
							<kbd>Enter</kbd> to create
						</span>
					)}
				</div>
			</Form.Group>
		);
	}
);
