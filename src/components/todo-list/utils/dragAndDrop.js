export default (rootElem, { drop }) => {
  const getCursorPositionOnElement = (element, cursorPosition) => {
    const { y: elementPosition, height: elementHeight } =
      element.getBoundingClientRect();
    const thirtyPercentElement = elementHeight * 0.3;
    const seventyPercentElement = elementHeight * 0.7;
    const beforePosition = elementPosition + thirtyPercentElement;
    const afterPosition = elementPosition + seventyPercentElement;
    if (cursorPosition < beforePosition) return "before";
    if (cursorPosition > afterPosition) return "after";
    return "middle";
  };

  const events = {
    dragstart: (e) => {
      e.target.dataset.status = "drop";
    },
    dragover: (e) => {
      e.preventDefault();
    },
    drop: (e) => {
      e.preventDefault();

      const dropElement = rootElem.querySelector("[data-status='drop']");
      const underElement = e.target;

      const isChildElementDropElement = dropElement.contains(underElement);
      if (isChildElementDropElement) return;

      const cursorPosition = getCursorPositionOnElement(
        underElement.closest("[data-content]"),
        e.clientY
      );
      const dropNodeId = dropElement
        .closest("[data-child-index]")
        .getAttribute("data-child-index");

      if (cursorPosition === "middle") {
        const parentNodeId = underElement
          .closest("[data-child-index]")
          .getAttribute("data-child-index");

        drop(cursorPosition, parentNodeId, dropNodeId);
        return;
      }

      const parentNodeId = underElement
        .closest("[data-parent-index]")
        .getAttribute("data-parent-index");

      const childNodeId = underElement
        .closest("[data-child-index]")
        .getAttribute("data-child-index");

      drop(cursorPosition, parentNodeId, dropNodeId, childNodeId);
    },
    dragend: (e) => {
      e.target.removeAttribute("data-status");
      e.target.removeAttribute("draggable");
    },
  };

  const init = () => {
    Object.entries(events).forEach(([event, callback]) =>
      rootElem.addEventListener(event, callback)
    );
  };

  const reset = () => {
    Object.entries(events).forEach(([event, callback]) =>
      rootElem.removeEventListener(event, callback)
    );
  };

  return { init, reset };
};
