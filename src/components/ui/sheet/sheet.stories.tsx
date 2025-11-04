import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSideProps = {
	sheetTitle?: string;
	sheetDescription?: string;
	name?: string;
	username?: string;
	buttonLabel?: string;
};

export function SheetSide({
	sheetTitle = "Edit profile",
	sheetDescription = "Make changes to your profile here. Click save when you're done.",
	name = "Pedro Duarte",
	username = "@peduarte",
	buttonLabel = "Open Sheet",
}: SheetSideProps) {
	return (
		<div className="grid grid-cols-2 gap-2">
			{SHEET_SIDES.map((side) => (
				<Sheet key={side}>
					<SheetTrigger asChild>
						<Button variant="outline">
							{buttonLabel} ({side})
						</Button>
					</SheetTrigger>
					<SheetContent side={side}>
						<SheetHeader>
							<SheetTitle>{sheetTitle}</SheetTitle>
							<SheetDescription>{sheetDescription}</SheetDescription>
						</SheetHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input id="name" value={name} className="col-span-3" readOnly />
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Username
								</Label>
								<Input
									id="username"
									value={username}
									className="col-span-3"
									readOnly
								/>
							</div>
						</div>
						<SheetFooter>
							<Button type="submit">Save changes</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			))}
		</div>
	);
}

const meta = {
	title: "shadcn/Sheet",
	component: SheetSide,
	tags: ["autodocs"],
	argTypes: {
		sheetTitle: { control: "text" },
		sheetDescription: { control: "text" },
		name: { control: "text" },
		username: { control: "text" },
		buttonLabel: { control: "text" },
	},
};
export default meta;

export const Side = {
	render: (args: SheetSideProps) => <SheetSide {...args} />,
	args: {
		sheetTitle: "Edit profile",
		sheetDescription:
			"Make changes to your profile here. Click save when you're done.",
		name: "Pedro Duarte",
		username: "@peduarte",
		buttonLabel: "Open Sheet",
	},
};
