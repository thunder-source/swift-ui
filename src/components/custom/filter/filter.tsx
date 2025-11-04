import { Button } from "@/components/ui";
import {
	Popover,
	PopoverContent,
	PopoverPortal,
	PopoverTrigger,
} from "@/components/ui/popover";
import type {
	FilterHandles,
	FilterProps,
	FilterVariantWithData,
} from "@/types";
import { ListFilter } from "lucide-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FilterHeader } from "./components";
import { FilterAnnouncement } from "./filterAnnouncement";
import { FilterAttendanceManagement } from "./filterAttendanceManagement";
import { FilterDashboard } from "./filterDashboard";
import { FilterDocument } from "./filterDocument";
import { FilterLeaveManagement } from "./filterLeaveManagement";
import { FilterMyTeamEmployee } from "./filterMyTeam";
import {
	FilterAttendanceSummary,
	FilterEmployeeDirectory,
	FilterLeaveRegister,
	FilterSalaryOverview,
} from "./filterReportsModule";
import { FilterAllEmployees } from "./filterUserManagement";

// Map each variant to its specific component without `any`
const variantComponentMap: {
	[K in FilterVariantWithData]: React.ForwardRefExoticComponent<
		React.PropsWithoutRef<FilterProps<K>> & React.RefAttributes<FilterHandles>
	>;
} = {
	dashboard: FilterDashboard,
	userManagementAllEmployees: FilterAllEmployees,
	userManagementTeam: FilterAllEmployees,
	attendanceManagement: FilterAttendanceManagement,
	leaveManagement: FilterLeaveManagement,
	document: FilterDocument,
	announcement: FilterAnnouncement,
	reportsModuleAttendanceSummary: FilterAttendanceSummary,
	reportsModuleLeaveRegister: FilterLeaveRegister,
	reportsModuleEmployeeDirectory: FilterEmployeeDirectory,
	reportsModuleSalaryOverview: FilterSalaryOverview,
	myTeamEmployee: FilterMyTeamEmployee,
};

// New generic props type to avoid any
export interface FilterComponentProps<T extends FilterVariantWithData> {
	buttonLabel: string;
	variant: T;
	data: FilterProps<T>["data"];
	onChange: FilterProps<T>["onChange"];
	onApply?: FilterProps<T>["onApply"];
	type?: "onChange" | "onSubmit";
	button?: React.ReactNode;
}

// Inner generic component
function FilterInner<T extends FilterVariantWithData>(
	{
		buttonLabel = "Filter",
		variant,
		data,
		onChange,
		onApply,
		button,
		type = "onSubmit",
	}: FilterComponentProps<T>,
	ref: React.Ref<FilterHandles>,
) {
	const internalRef = useRef<FilterHandles>(null);

	// Expose common handles
	useImperativeHandle(
		ref,
		() => ({
			submit: () => internalRef.current?.submit(),
			reset: () => internalRef.current?.reset(),
		}),
		[],
	);

	const Component = variantComponentMap[
		variant
	] as React.ForwardRefExoticComponent<
		React.PropsWithoutRef<FilterProps<T>> & React.RefAttributes<FilterHandles>
	>;

	return (
		<Popover>
			<PopoverTrigger asChild>
				{button ? (
					button
				) : (
					<Button variant="dark" iconLeft={<ListFilter />}>
						{buttonLabel}
					</Button>
				)}
			</PopoverTrigger>
			<PopoverPortal>
				<>
					<div className="fixed inset-0 bg-[hsla(var(--text-dark),0.2)] backdrop-blur-xs z-40" />

					<PopoverContent
						align="end"
						className="w-[372px] p-4 space-y-4"
						avoidCollisions
						sticky="always"
						style={{
							maxHeight:
								"calc(var(--radix-popover-content-available-height) - 10px)",
							overflow: "auto",
						}}
					>
						<FilterHeader onClear={() => internalRef.current?.reset()} />

						<Component
							data={data}
							onChange={onChange}
							onApply={onApply}
							type={type}
							buttonLabel={buttonLabel}
							variant={variant}
							ref={internalRef}
						/>

						{type === "onSubmit" && (
							<Button
								widthFull
								variant="destructive"
								className="mt-4 text-base"
								onClick={() => internalRef.current?.submit()}
							>
								Apply Now
							</Button>
						)}
					</PopoverContent>
				</>
			</PopoverPortal>
		</Popover>
	);
}

// Export as a generic forwardRef
const Filter = forwardRef(FilterInner) as React.ForwardRefExoticComponent<
	FilterComponentProps<FilterVariantWithData> &
		React.RefAttributes<FilterHandles>
>;

(
	Filter as React.ForwardRefExoticComponent<
		FilterComponentProps<FilterVariantWithData> &
			React.RefAttributes<FilterHandles>
	>
).displayName = "Filter";

export { Filter };
