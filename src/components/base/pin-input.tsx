"use client";

import type { ComponentPropsWithRef } from "react";
import { createContext, useContext, useId } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn as cx } from "@/lib/utils";

type PinInputContextType = {
    size: "sm" | "md" | "lg";
    disabled?: boolean;
    digits?: number;
    id: string;
};

const PinInputContext = createContext<PinInputContextType>({
    size: "sm",
    id: "",
    digits: 4,
    disabled: false,
});

export const usePinInputContext = () => {
    const context = useContext(PinInputContext);

    if (!context) {
        throw new Error("The 'usePinInputContext' hook must be used within a '<PinInput />'");
    }

    return context;
};

interface InputProps extends Omit<ComponentPropsWithRef<typeof OTPInput>, "size" | "maxLength" | "className"> {
    width?: number;
    inputClassName?: string;
    onComplete?: (value: string) => void;
}

interface RootProps extends ComponentPropsWithRef<"div"> {
    size?: "sm" | "md" | "lg";
    digits?: number;
    disabled?: boolean;
}

const Root = ({ className, size = "md", digits = 4, disabled, ...props }: RootProps) => {
    const id = useId();

    return (
        <PinInputContext.Provider value={{ size, digits, disabled, id }}>
            <div role="group" className={cx("flex h-max flex-col gap-1.5", className)} {...props} />
        </PinInputContext.Provider>
    );
};
Root.displayName = "Root";

const Group = ({ inputClassName, containerClassName, width, onComplete, value, ...props }: InputProps & { value?: string }) => {
    const { id, size, digits, disabled } = usePinInputContext();

    const heights = {
        sm: "h-16.5",
        md: "h-20.5",
        lg: "h-24.5",
    };
    return (
        <OTPInput
            {...(props as any)}
            value={value}
            size={width}
            maxLength={digits}
            disabled={disabled}
            id={"pin-input-" + id}
            aria-label="Enter your pin"
            aria-labelledby={"pin-input-label-" + id}
            aria-describedby={"pin-input-description-" + id}
            inputMode="text"
            pattern={undefined}
            containerClassName={cx("flex flex-row gap-3", size === "sm" && "gap-2", heights[size], containerClassName)}
            className={cx("w-full! disabled:cursor-not-allowed", inputClassName)}
            onChange={props.onChange}
            onComplete={onComplete}
        />
    );
};
Group.displayName = "Group";

const sizes = {
    sm: "w-10 h-14 px-0 py-0.5 text-2xl font-semibold rounded-lg border bg-[#181c24] text-blue-100 focus:ring-2 focus:ring focus:border transition-all duration-150",
    md: "size-20 px-2 py-2.5 text-display-lg font-medium",
    lg: "size-24 px-2 py-3 text-display-xl font-medium",
};

const Slot = ({ index, className, ...props }: ComponentPropsWithRef<"div"> & { index: number }) => {
    const { size, disabled } = usePinInputContext();
    const { slots, isFocused } = useContext(OTPInputContext);
    const slot = slots[index];

    return (
        <div
            {...props}
            aria-label={"Enter digit " + (index + 1) + " of " + slots.length}
            className={cx(
                "relative flex items-center justify-center text-center shadow-sm border transition-all duration-150",
                sizes[size],
                isFocused && slot?.isActive
                    ? "ring-2 ring-blue-500 border-blue-500 z-10"
                    : slot?.char
                        ? "border-border"
                        : "border-border",
                disabled && "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed",
                className,
            )}
        >
            {slot?.char ? slot.char : slot?.hasFakeCaret ? <FakeCaret size={size} /> : ''}
        </div>
    );
};
Slot.displayName = "Slot";

const FakeCaret = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    return (
        <div
            className={cx(
                "pointer-events-none h-[1em] w-0.5 animate-caret-blink bg-foreground",
                size === "lg" ? "text-display-xl font-medium" : "text-display-lg font-medium",
            )}
        />
    );
};

const Separator = (props: ComponentPropsWithRef<"p">) => {
    return (
        <div
            role="separator"
            {...props}
            className={cx(
                "flex items-center justify-center mx-1 text-2xl font-bold select-none",
                props.className
            )}
            style={{ minWidth: '1.5rem', minHeight: '2.5rem' }}
        >
            -
        </div>
    );
};
Separator.displayName = "Separator";

const Label = ({ className, ...props }: ComponentPropsWithRef<"label">) => {
    const { id } = usePinInputContext();

    return <label {...props} htmlFor={"pin-input-" + id} id={"pin-input-label-" + id} className={cx("text-sm font-medium text-secondary", className)} />;
};
Label.displayName = "Label";

const Description = ({ className, ...props }: ComponentPropsWithRef<"p">) => {
    const { id } = usePinInputContext();

    return <p {...props} id={"pin-input-description-" + id} role="description" className={cx("text-sm text-tertiary", className)} />;
};
Description.displayName = "Description";

const PinInput = Root as typeof Root & {
    Slot: typeof Slot;
    Label: typeof Label;
    Group: typeof Group;
    Separator: typeof Separator;
    Description: typeof Description;
};
PinInput.Slot = Slot;
PinInput.Label = Label;
PinInput.Group = Group;
PinInput.Separator = Separator;
PinInput.Description = Description;

export { PinInput };
