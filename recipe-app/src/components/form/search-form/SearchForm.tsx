import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Form } from "react-bootstrap";
import "./SearchForm.scss";

type TValueFound = boolean;

type SearchInputProps =
    | {
          placeholder?: string;
      } & (
          | {
                onSubmit?: undefined;
                search?: never;
            }
          | {
                onSubmit: (text: string) => void;
                search: (text: string) => TValueFound;
            }
      );

export function SearchForm({
    placeholder,
    search,
    onSubmit,
}: SearchInputProps) {
    const target = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>("");
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const text = event.target.value;
        setValue(text);

        if (!onSubmit) return;

        if (search(text)) return;

        setShowTooltip(text.trim().length > 0);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!onSubmit) return;

        const text = value.trim();
        if (!text.length) return;

        if (search(text)) return;

        setValue("");
        setShowTooltip(false);
        onSubmit(text);
    }

    return (
        <Form
            onSubmit={(e) => e.preventDefault()}
            onKeyUp={(e) => {
                if (e.key !== "Enter") return;
                handleSubmit(e);
            }}
        >
            <Form.Group controlId="ingredients" className="position-relative">
                <Form.Label>Pesquisar</Form.Label>
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
        </Form>
    );
}
