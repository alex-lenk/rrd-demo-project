import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
function Icon({ element: Component, ...props }) {
    return <Component {...props} />;
}
export default function Select({
    variants,
    onChange,
    value,
    label,
    iconPath = "icon",
    labelPath = "label",
    valuePath = "value",
}) {
    return (
        <Listbox
            value={value}
            onChange={onChange}
            className=' flex items-center'
            as={"div"}
        >
            {({ open }) => (
                <>
                    {label && (
                        <Listbox.Label className='block md:hidden text-sm font-medium text-gray-500 pr-3'>
                            {label}
                        </Listbox.Label>
                    )}
                    <div className='mt-1 relative'>
                        <Listbox.Button
                            as='div'
                            className='relative w-100 flex items-center ring-1 ring-slate-900/10 rounded-lg shadow-sm p-2 text-slate-700 font-semibold dark:bg-slate-600 dark:ring-0 dark:highlight-white/5 dark:text-slate-500 dark:hover:bg-slate-800 hover:bg-gray-100 transition-colors duration-100'
                        >
                            <span className='flex items-center'>
                                {value[iconPath] && (
                                    <Icon
                                        element={value[iconPath]}
                                        className=' flex-shrink-0 h-6 w-6 '
                                    />
                                )}
                                {value[labelPath] && (
                                    <span className='ml-3 block truncate dark:text-slate-200'>
                                        {value[labelPath]}
                                    </span>
                                )}
                            </span>
                            <span className='ml-3  inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                <ChevronDownIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Listbox.Options className='absolute z-10 top-6 right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8 focus:outline-none'>
                                {variants.map((variant, index) => (
                                    <Listbox.Option
                                        key={variant[valuePath] || index}
                                        className={({ active, selected }) =>
                                            classNames(
                                                active &&
                                                    "bg-slate-50 dark:bg-slate-600/30",
                                                selected && "text-sky-500",
                                                " relative py-1 px-2 flex items-center cursor-pointer  transition-colors duration-200"
                                            )
                                        }
                                        value={variant}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                {variant[iconPath] && (
                                                    <span>
                                                        <Icon
                                                            element={
                                                                variant[
                                                                    iconPath
                                                                ]
                                                            }
                                                            className=' flex-shrink-0 h-5 w-5 '
                                                        />
                                                    </span>
                                                )}
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? "font-semibold text-sky-500"
                                                            : "font-normal",
                                                        "ml-3 block truncate"
                                                    )}
                                                >
                                                    {variant[labelPath]}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
