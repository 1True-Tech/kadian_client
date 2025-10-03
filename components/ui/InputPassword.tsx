import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export interface InputPasswordProps extends React.ComponentProps<"input"> {
	iconShow?: React.ReactNode;
	iconHide?: React.ReactNode;
}

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
	(
		{
			className,
			iconShow,
			iconHide,
			type,
			...props
		},
		ref
	) => {
		const [show, setShow] = React.useState(false);
		return (
			<div className="relative">
				<input
					type={show ? "text" : "password"}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						className
					)}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					tabIndex={-1}
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={() => setShow((s) => !s)}
				>
					{show
						? iconHide || <EyeOff className="h-4 w-4" />
						: iconShow || <Eye className="h-4 w-4" />}
				</Button>
			</div>
		);
	}
);
InputPassword.displayName = "InputPassword";
