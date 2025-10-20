import { useRef, type FormEvent } from "react";
import { Form } from "react-bootstrap";
import "./SearchForm.scss";
import {
    SearchInput,
    type SearchInputHandler,
    type SearchInputProps,
} from "./SearchInput";

type SearchFormProps = {
    onSubmit?: (text: string) => void;
} & SearchInputProps;

export function SearchForm({ placeholder, search, onSubmit }: SearchFormProps) {
    const inputRef = useRef<SearchInputHandler>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!onSubmit) return;
        if (!inputRef.current) return;

        const text = inputRef.current.value.trim();
        if (!text.length) return;

        if (!!search && (await search(text))) return;

        inputRef.current.value = "";
        inputRef.current.showTooltip = false;

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
            <SearchInput
                ref={inputRef}
                placeholder={placeholder}
                search={search}
            />
        </Form>
    );
}
