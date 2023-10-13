import { ReactNode } from 'react';

interface RenderIfType {
	condition?: boolean | undefined;
	fallback?: ReactNode | undefined;
	children: ReactNode;
}

export const RenderIf: React.FC<RenderIfType> = ({
	condition,
	fallback,
	children
}: RenderIfType) => {
	if (condition === true) {
		return children as React.ReactElement;
	}

	return (fallback as React.ReactElement) || null;
};
