import { Form } from "react-bootstrap";
import { Constants } from "../../../utils/Constants";

interface UnitSelectProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const UnitSelect: React.FC<UnitSelectProps> = ({
    value,
    onChange,
    placeholder = "Unit",
}) => {
    return (
        <Form.Select className="w-50" value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="" disabled>
                {placeholder}
            </option>
            {Constants.UNITS.map((unit) => (
                <option key={unit} value={unit}>
                    {unit}
                </option>
            ))}
        </Form.Select>
    );
};
