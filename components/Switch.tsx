interface props {
    variant?: "primary" | "secondary"
    name?: string
    checked?: boolean
    onChange?: () => void
    disabled?: boolean
};

export default function Switch({ variant="primary", name, checked, onChange, disabled=false }: props) {
    const inputVariants = {
        "enabled":
        {
            'primary': 'bg-slate-400 checked:bg-violet-600 peer-checked:border-violet-600 peer-checked:before:bg-violet-600',
            'secondary': 'bg-slate-400 checked:bg-green-600 peer-checked:border-green-600 peer-checked:before:bg-green-600',
        },
        "disabled":
        {
            'primary': 'bg-slate-100 checked:bg-violet-300 peer-checked:border-violet-300 peer-checked:before:bg-violet-300',
            'secondary': 'bg-slate-100 checked:bg-green-300 peer-checked:border-green-300 peer-checked:before:bg-green-300',
        }
    }
    const labelVariants = {
        "enabled": 
        {
            'primary': 'peer-checked:border-violet-600 peer-checked:before:bg-violet-600',
            'secondary': 'peer-checked:border-green-600 peer-checked:before:bg-green-600',
        },
        "disabled":
        {
            'primary': 'peer-checked:border-violet-300 peer-checked:before:bg-violet-300',
            'secondary': 'peer-checked:border-green-300 peer-checked:before:bg-green-300',
        }

    }

    return (
        <div className="inline-flex items-center">
            <div className="relative inline-block w-[36px] h-5 rounded-full cursor-pointer">
                <input
                    id={name}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className={`${inputVariants[disabled? "disabled" : "enabled"][variant]} absolute w-[36px] h-5 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100`}
                    disabled={disabled}
                />
                <label
                    htmlFor={name}
                    className={`${labelVariants[disabled? "disabled" : "enabled"][variant]} before:content[''] absolute top-2/4  h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity peer-checked:translate-x-[80%] `}
                >
                    <div
                        className={`inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}
                    ></div>
                </label>
            </div>
        </div>
    );
};
