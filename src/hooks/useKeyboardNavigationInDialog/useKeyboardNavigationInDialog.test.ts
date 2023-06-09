import { renderHook } from "@testing-library/react";

import { useKeyboardNavigationInDialog } from "./useKeyboardNavigationInDialog";

import { makeKeyboardEvent } from "@/__mocks__/make-keyboard-event";
import { changeFocusEl } from "@/functions/change-focus-el";
import { createElement } from "./mocks/create-element";

type TElement = HTMLElement;

const handleDisable = jest.fn();
const containerElement = createElement();

describe("useKeyboardNavigationInDialog", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Initial values", () => {
		it("should return initial values", () => {
			const { result } = render();
			expect(typeof result.current.handleKeyDown).toBe("function");
		});
	});
	describe("Methods", () => {
		describe("HandleKeydown", () => {
			const firstChildrenNode = containerElement.firstElementChild;
			const lastChildrenNode = containerElement.lastElementChild;

			it("should handle key down when pressing Escape key", () => {
				const { result } = render();
				const event = makeKeyboardEvent<TElement>("keydown", { key: "Escape" });
				result.current.handleKeyDown(event);
				expect(handleDisable).toHaveBeenCalledTimes(1);
			});

			it("should handle key down when pressing TAB and SHIFT keys", () => {
				if (!lastChildrenNode || !firstChildrenNode)
					throw new Error(ELEMENTS_CHILD_IS_EMPTY);

				const { result } = render();
				const event = makeKeyboardEvent<TElement>("keydown", {
					key: "Tab",
					shiftKey: true,
				});
				changeFocusEl(firstChildrenNode);
				result.current.handleKeyDown(event);

				expect(handleDisable).not.toHaveBeenCalled();
				expect(document.activeElement).toStrictEqual(lastChildrenNode);
			});
			it("should handle key down when pressing Tab key", () => {
				if (!lastChildrenNode || !firstChildrenNode)
					throw new Error(ELEMENTS_CHILD_IS_EMPTY);

				const { result } = render();
				const event = makeKeyboardEvent<TElement>("keydown", { key: "Tab" });
				changeFocusEl(lastChildrenNode);
				result.current.handleKeyDown(event);

				expect(handleDisable).not.toHaveBeenCalled();
				expect(document.activeElement).toStrictEqual(firstChildrenNode);
			});
		});
	});
});

type Params = Parameters<typeof useKeyboardNavigationInDialog>[0];

const ELEMENTS_CHILD_IS_EMPTY = "Elements child is empty";

const defaultParams: Params = {
	ref: { current: containerElement },
	isOpen: true,
	handleDisable,
};

const render = (params: Params = defaultParams) =>
	renderHook(() => useKeyboardNavigationInDialog<TElement>({ ...params }));
