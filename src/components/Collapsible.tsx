import React, { useEffect, useRef, useState } from "react";

export function Collapsible({ open, children }: { open: boolean; children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			setHeight(open ? ref.current.scrollHeight + 20 : 0);
		}
	}, [open]);

	return (
		<div style={{ height }} className="overflow-hidden transition-all duration-300 ease-in-out">
			<div ref={ref}>{children}</div>
		</div>
	);
}
