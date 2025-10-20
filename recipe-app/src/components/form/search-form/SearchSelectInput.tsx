import { useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { type Ingredient } from "../../../data/Ingredient";
import {
	SearchInput,
	type SearchInputHandler,
	type SearchInputProps,
} from "./SearchInput";

type SearchSelectInputProps = {} & SearchInputProps;

export function SearchSelectInput({
	...searchInputProps
}: SearchSelectInputProps) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [filtered, setFiltered] = useState<Ingredient[]>([]);
	const [searchResults, setSearchResults] = useState<Ingredient[]>([]);
	const searchInputRef = useRef<SearchInputHandler>(null);

	const searchTerm = searchInputRef.current?.value;

	return (
		<>
			<SearchInput ref={searchInputRef} {...searchInputProps} />
			{!!searchTerm && searchTerm.length > 0 && (
				<Stack>
					{searchResults.map((ingredient) => (
						<div>{ingredient.name}</div>
					))}
				</Stack>
			)}
		</>
	);
}
