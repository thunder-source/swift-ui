// import { Button } from "@/components/ui/button";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { useAuth } from "@/contexts/authContext";
// import type { UserRole } from "@/types/roles";
// import devRoleUtils from "@/utils/roleUtils";
// import { ChevronLeft, GripVertical, Settings, Users, X } from "lucide-react";
// import type React from "react";
// import { useCallback, useEffect, useRef, useState } from "react";

// interface Position {
// 	x: number;
// 	y: number;
// }

// const RoleSwitcher: React.FC = () => {
// 	const { login, updateUserRole, authState } = useAuth();
// 	const [selectedRole, setSelectedRole] = useState<UserRole>("EMPLOYEE");
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [isDragging, setIsDragging] = useState(false);
// 	const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
// 	const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
// 	const [isMinimized, setIsMinimized] = useState(false);

// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const buttonRef = useRef<HTMLButtonElement>(null);
// 	const panelRef = useRef<HTMLDivElement>(null);

// 	// Improved mouse down handler
// 	const handleMouseDown = useCallback((e: React.MouseEvent) => {
// 		if (e.button !== 0) return; // Only left mouse button

// 		const rect = containerRef.current?.getBoundingClientRect();
// 		if (!rect) return;

// 		setIsDragging(true);
// 		setDragOffset({
// 			x: e.clientX - rect.left,
// 			y: e.clientY - rect.top,
// 		});

// 		e.preventDefault();
// 		e.stopPropagation();
// 	}, []);

// 	// Improved mouse move handler
// 	const handleMouseMove = useCallback(
// 		(e: MouseEvent) => {
// 			if (!isDragging || !containerRef.current) return;

// 			const containerRect = containerRef.current.getBoundingClientRect();
// 			const viewportWidth = window.innerWidth;
// 			const viewportHeight = window.innerHeight;

// 			// Calculate new position
// 			let newX = e.clientX - dragOffset.x;
// 			let newY = e.clientY - dragOffset.y;

// 			// Apply boundaries with padding
// 			const padding = 10;
// 			newX = Math.max(
// 				padding,
// 				Math.min(newX, viewportWidth - containerRect.width - padding),
// 			);
// 			newY = Math.max(
// 				padding,
// 				Math.min(newY, viewportHeight - containerRect.height - padding),
// 			);

// 			setPosition({ x: newX, y: newY });
// 		},
// 		[isDragging, dragOffset],
// 	);

// 	// Mouse up handler
// 	const handleMouseUp = useCallback(() => {
// 		setIsDragging(false);
// 	}, []);

// 	// Effect for drag event listeners
// 	useEffect(() => {
// 		if (isDragging) {
// 			document.addEventListener("mousemove", handleMouseMove);
// 			document.addEventListener("mouseup", handleMouseUp);
// 			document.body.style.userSelect = "none";
// 			document.body.style.cursor = "grabbing";
// 		} else {
// 			document.removeEventListener("mousemove", handleMouseMove);
// 			document.removeEventListener("mouseup", handleMouseUp);
// 			document.body.style.userSelect = "";
// 			document.body.style.cursor = "";
// 		}

// 		return () => {
// 			document.removeEventListener("mousemove", handleMouseMove);
// 			document.removeEventListener("mouseup", handleMouseUp);
// 			document.body.style.userSelect = "";
// 			document.body.style.cursor = "";
// 		};
// 	}, [isDragging, handleMouseMove, handleMouseUp]);

// 	// Auto-login effect
// 	useEffect(() => {
// 		if (!authState.isAuthenticated) {
// 			login(devRoleUtils.getMockUser(selectedRole));
// 		}
// 	}, [authState.isAuthenticated, selectedRole, login]);

// 	const handleRoleChange = (value: string) => {
// 		const newRole = value as UserRole;
// 		setSelectedRole(newRole);

// 		if (authState.isAuthenticated && authState.user) {
// 			updateUserRole(newRole);
// 		} else {
// 			login(devRoleUtils.getMockUser(newRole));
// 		}
// 	};

// 	const togglePanel = () => {
// 		setIsOpen(!isOpen);
// 		setIsMinimized(false);
// 	};

// 	const toggleMinimize = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		setIsMinimized(!isMinimized);
// 	};

// 	const closePanel = (e: React.MouseEvent) => {
// 		e.stopPropagation();
// 		setIsOpen(false);
// 		setIsMinimized(false);
// 	};

// 	// Keyboard navigation
// 	const handleKeyDown = (e: React.KeyboardEvent) => {
// 		if (e.key === " " || e.key === "Enter") {
// 			e.preventDefault();
// 			togglePanel();
// 		} else if (e.key === "Escape") {
// 			e.preventDefault();
// 			if (isOpen) {
// 				setIsOpen(false);
// 				setIsMinimized(false);
// 			}
// 		}
// 	};

// 	if (process.env.NODE_ENV === "production") return null;

// 	return (
// 		<div
// 			ref={containerRef}
// 			className="fixed z-50 select-none"
// 			style={{
// 				left: `${position.x}px`,
// 				top: `${position.y}px`,
// 				transition: isDragging ? "none" : "transform 0.2s ease-out",
// 				transform: isDragging ? "scale(1.02)" : "scale(1)",
// 			}}
// 		>
// 			{/* Main Toggle Button */}
// 			<Button
// 				ref={buttonRef}
// 				variant="secondary"
// 				size="sm"
// 				onClick={togglePanel}
// 				onMouseDown={handleMouseDown}
// 				onKeyDown={handleKeyDown}
// 				className={`
//           relative group
//           bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
//           text-white border-0 shadow-lg hover:shadow-xl
//           transition-all duration-200
//           ${isDragging ? "cursor-grabbing scale-105" : "cursor-grab hover:scale-105"}
//           ${isOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg"}
//         `}
// 				aria-expanded={isOpen}
// 				aria-haspopup="dialog"
// 				aria-label={`${isOpen ? "Close" : "Open"} role switcher`}
// 			>
// 				<div className="flex items-center gap-2 px-1">
// 					<GripVertical
// 						size={14}
// 						className="opacity-70 group-hover:opacity-100 transition-opacity"
// 					/>
// 					<div className="flex items-center gap-1">
// 						{isOpen ? (
// 							<Settings size={16} className="animate-spin-slow" />
// 						) : (
// 							<Users size={16} />
// 						)}
// 						<span className="text-xs font-medium">
// 							{authState.user?.role || selectedRole}
// 						</span>
// 					</div>
// 				</div>

// 				{/* Status indicator */}
// 				<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
// 			</Button>

// 			{/* Expandable Panel */}
// 			{isOpen && (
// 				<div
// 					ref={panelRef}
// 					className={`
//             absolute left-0 top-full z-40
//             bg-white dark:bg-gray-800 
//             border border-gray-200 dark:border-gray-700
//             rounded-b-lg rounded-tr-lg shadow-xl
//             transition-all duration-300 ease-out
//             ${isMinimized ? "h-12 overflow-hidden" : "min-h-[120px]"}
//           `}
// 					style={{
// 						width: "280px",
// 						maxHeight: isMinimized ? "48px" : "calc(100vh - 200px)",
// 					}}
// 				>
// 					{/* Panel Header */}
// 					<div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
// 						<div className="flex items-center gap-2">
// 							<Settings size={16} className="text-blue-600" />
// 							<span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
// 								Dev Role Switcher
// 							</span>
// 						</div>
// 						<div className="flex items-center gap-1">
// 							<Button
// 								variant="ghost"
// 								size="sm"
// 								onClick={toggleMinimize}
// 								className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
// 								aria-label={isMinimized ? "Expand" : "Minimize"}
// 							>
// 								<ChevronLeft
// 									size={14}
// 									className={`transition-transform duration-200 ${
// 										isMinimized ? "rotate-90" : "-rotate-90"
// 									}`}
// 								/>
// 							</Button>
// 							<Button
// 								variant="ghost"
// 								size="sm"
// 								onClick={closePanel}
// 								className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
// 								aria-label="Close"
// 							>
// 								<X size={14} />
// 							</Button>
// 						</div>
// 					</div>

// 					{/* Panel Content */}
// 					{!isMinimized && (
// 						<div className="p-4 space-y-4">
// 							{/* Role Selector */}
// 							<div className="space-y-2">
// 								<label
// 									htmlFor="role-selector"
// 									className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide"
// 								>
// 									Switch Role
// 								</label>
// 								<Select value={selectedRole} onValueChange={handleRoleChange}>
// 									<SelectTrigger className="w-full">
// 										<SelectValue placeholder="Select a role" />
// 									</SelectTrigger>
// 									<SelectContent>
// 										{devRoleUtils.ROLES.map((role) => (
// 											<SelectItem
// 												key={role}
// 												value={role}
// 												className="font-medium"
// 											>
// 												{role.replace("_", " ")}
// 											</SelectItem>
// 										))}
// 									</SelectContent>
// 								</Select>
// 							</div>

// 							{/* Status Information */}
// 							<div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
// 								<div className="flex justify-between items-center">
// 									<span className="text-xs text-gray-500 dark:text-gray-400">
// 										Current Role:
// 									</span>
// 									<span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
// 										{authState.user?.role || "None"}
// 									</span>
// 								</div>

// 								<div className="flex justify-between items-center">
// 									<span className="text-xs text-gray-500 dark:text-gray-400">
// 										Status:
// 									</span>
// 									<span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
// 										{authState.isAuthenticated ? "Authenticated" : "Guest"}
// 									</span>
// 								</div>
// 							</div>

// 							{/* Footer */}
// 							<div className="text-center pt-2 border-t border-gray-200 dark:border-gray-700">
// 								<p className="text-[10px] text-gray-400 dark:text-gray-500">
// 									🔧 Development Mode Only
// 								</p>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default RoleSwitcher;
