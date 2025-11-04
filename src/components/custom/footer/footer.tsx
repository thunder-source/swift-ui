import { Button } from "@/components/ui";

const Footer = () => {
	return (
		<footer className="bg-white border-t border-gray-200">
			<div className="container mx-auto px-6 py-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="text-sm text-gray-600">
						© {new Date().getFullYear()} HRMS. All rights reserved.
					</div>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<Button variant="default" size="sm">
							Privacy Policy
						</Button>
						<Button variant="default" size="sm">
							Terms of Service
						</Button>
						<Button variant="default" size="sm">
							Contact
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
