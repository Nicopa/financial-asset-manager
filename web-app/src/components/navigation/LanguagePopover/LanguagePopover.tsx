import { MenuItem, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { MenuPopover } from "../MenuPopover/MenuPopover";
import { StyledIconButton } from "./LanguagePopover.styles";

const LANGS = [
	{
		value: "br",
		label: "Português (BR)",
		icon: "/static/icons/ic_flag_br.svg",
	},
	{
		value: "en",
		label: "English",
		icon: "/static/icons/ic_flag_en.svg",
	},
];

export const LanguagePopover = () => {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [lang, setLang] = useState(LANGS[0]);
	const handleMenuItemClick = (option: typeof LANGS[0]) => {
		setOpen(false);
		setLang(option);
	};
	return (
		<>
			<StyledIconButton ref={anchorRef} onClick={() => setOpen(true)}>
				{lang.value}
			</StyledIconButton>
			<MenuPopover
				open={open}
				onClose={() => setOpen(false)}
				anchorEl={anchorRef.current}
			>
				<Stack>
					{LANGS.map((option) => (
						<MenuItem
							key={option.value}
							selected={option.value === LANGS[0].value}
							onClick={() => handleMenuItemClick(option)}
						>
							<Box>{option.label}</Box>
						</MenuItem>
					))}
				</Stack>
			</MenuPopover>
		</>
	);
};
