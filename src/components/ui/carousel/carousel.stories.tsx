import type { Meta, StoryObj } from "@storybook/react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import * as React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./carousel";

const meta: Meta<typeof Carousel> = {
	title: "shadcn/Carousel",
	component: Carousel,
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: false,
		},
		plugins: {
			control: false,
		},
	},
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
	render: (args) => (
		<div className="w-full max-w-sm mx-auto">
			<Carousel {...args}>
				<CarouselContent>
					<CarouselItem className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-40">
						<div className="text-2xl font-semibold">Slide 1</div>
					</CarouselItem>
					<CarouselItem className="bg-gray-200 p-6 rounded-lg flex items-center justify-center h-40">
						<div className="text-2xl font-semibold">Slide 2</div>
					</CarouselItem>
					<CarouselItem className="bg-gray-300 p-6 rounded-lg flex items-center justify-center h-40">
						<div className="text-2xl font-semibold">Slide 3</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	),
	args: {
		orientation: "horizontal",
		plugins: [],
	},
};

export const Vertical: Story = {
	render: (args) => (
		<div className="w-full max-w-sm mx-auto h-80">
			<Carousel {...args}>
				<CarouselContent>
					<CarouselItem className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
						<div className="text-2xl font-semibold">Slide 1</div>
					</CarouselItem>
					<CarouselItem className="bg-gray-200 p-6 rounded-lg flex items-center justify-center">
						<div className="text-2xl font-semibold">Slide 2</div>
					</CarouselItem>
					<CarouselItem className="bg-gray-300 p-6 rounded-lg flex items-center justify-center">
						<div className="text-2xl font-semibold">Slide 3</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	),
	args: {
		orientation: "vertical",
		plugins: [],
	},
};

export const Autoplay: Story = {
	render: () => {
		const [api, setApi] = React.useState<UseEmblaCarouselType[1] | undefined>(
			undefined,
		);

		React.useEffect(() => {
			if (!api) return;

			const autoplay = () => {
				if (api.canScrollNext()) {
					api.scrollNext();
				} else {
					api.scrollTo(0);
				}
			};

			const interval = setInterval(autoplay, 3000);
			return () => clearInterval(interval);
		}, [api]);

		return (
			<div className="w-full max-w-sm mx-auto">
				<Carousel orientation="horizontal" setApi={setApi}>
					<CarouselContent>
						<CarouselItem className="bg-gray-100 p-6 rounded-lg flex items-center justify-center h-40">
							<div className="text-2xl font-semibold">Slide 1</div>
						</CarouselItem>
						<CarouselItem className="bg-gray-200 p-6 rounded-lg flex items-center justify-center h-40">
							<div className="text-2xl font-semibold">Slide 2</div>
						</CarouselItem>
						<CarouselItem className="bg-gray-300 p-6 rounded-lg flex items-center justify-center h-40">
							<div className="text-2xl font-semibold">Slide 3</div>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<div className="text-center mt-4 text-sm text-gray-500">
					This carousel automatically advances every 3 seconds
				</div>
			</div>
		);
	},
};

export const WithCustomContent: Story = {
	render: (args) => (
		<div className="w-full max-w-md mx-auto">
			<Carousel {...args}>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							// biome-ignore lint/suspicious/noArrayIndexKey: This is acceptable for a Storybook demo
							key={`card-${index}`}
							className="md:basis-1/2 lg:basis-1/3"
						>
							<div className="p-1">
								<div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl overflow-hidden shadow-md">
									<div className="p-6 h-40 flex flex-col justify-between">
										<div className="font-medium">Card {index + 1}</div>
										<div className="text-sm text-gray-600">
											Description for card {index + 1}
										</div>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	),
	args: {
		orientation: "horizontal",
		plugins: [],
	},
};

export const ResponsiveCarousel: Story = {
	render: (args) => (
		<div className="w-full max-w-4xl mx-auto">
			<Carousel {...args} className="w-full">
				<CarouselContent>
					{Array.from({ length: 10 }).map((_, index) => (
						<CarouselItem
							// biome-ignore lint/suspicious/noArrayIndexKey: This is acceptable for a Storybook demo
							key={`item-${index}`}
							className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
						>
							<div className="p-1">
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 h-32 flex items-center justify-center shadow-sm border border-gray-200">
									<span className="text-lg font-medium">Item {index + 1}</span>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="text-center mt-4 text-sm text-gray-500">
				Responsive carousel with different items per view based on screen size
			</div>
		</div>
	),
	args: {
		orientation: "horizontal",
		plugins: [],
	},
};
