import { render, screen } from "@testing-library/react";

import {
	makeAccentCheckIconSrc,
	makeDefaultCheckIconSrc,
	MoreInfoList,
} from "./MoreInfoList";

import { WithThemeProvider } from "@/__mocks__/with-theme-provider";
import { forEachOfInfosMock, InfosMock } from "./mocks/infos-mock";

const CHECK_ICON_SRC_ATTRS = {
	DEFAULT: makeDefaultCheckIconSrc(),
	ACCENT: makeAccentCheckIconSrc(),
};

describe("<MoreInfoList />", () => {
	const getCheckIconElements = () => screen.getAllByAltText("Ícone de Check");

	function testCheckIcon(srcAttr: string) {
		getCheckIconElements().forEach((icon) => {
			expect(icon).toBeInTheDocument();
			expect(icon).toHaveAttribute("src", srcAttr);
		});
	}

	describe("Render", () => {
		it("should render correctly with isAccentCheckIcon false", () => {
			renderComponent();
			forEachOfInfosMock((info) => {
				testCheckIcon(CHECK_ICON_SRC_ATTRS.DEFAULT);
				expect(screen.getByText(info)).toBeInTheDocument();
			});
		});
		it("should render correctly with isAccentCheckIcon true", () => {
			renderComponent({ ...defaultProps, isAccentCheckIcon: true });
			forEachOfInfosMock((info) => {
				testCheckIcon(CHECK_ICON_SRC_ATTRS.ACCENT);
				expect(screen.getByText(info)).toBeInTheDocument();
			});
		});
	});
});

type Props = Parameters<typeof MoreInfoList>[0];

const defaultProps: Props = {
	infos: InfosMock,
	isAccentCheckIcon: false,
};

const renderComponent = (props: Props = defaultProps) =>
	render(
		<WithThemeProvider>
			<MoreInfoList {...props} />
		</WithThemeProvider>
	);
