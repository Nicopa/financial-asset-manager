import { StyledHeader } from "./LoginLayoutHeader.styles";

type Props = {
	children?: JSX.Element | string;
};

export const LoginLayoutHeader = ({ children }: Props) => {
	return <StyledHeader>{children}</StyledHeader>;
};
