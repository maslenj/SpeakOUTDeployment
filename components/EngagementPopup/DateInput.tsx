import { IoMdTime } from "react-icons/io";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

interface DateInputProps extends ReactDatePickerProps {
    label: string
    error?: string
}

const base_classes = "border border-black rounded-xl mb-2 px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row"
const error_classes = "border-2 border-red-500 rounded-xl mb-2 px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row"

export default function DateInput({ label, error, ...props }: DateInputProps) {
    return (
        <div>
            <span className={error ? error_classes : base_classes}>
                <span className="mr-2 font-bold">
                    {label}
                </span>
                <DatePicker
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    {...props}
                />
            </span>
            {error && <span className="text-red-500"> {error} </span>}
        </div>

    )
}