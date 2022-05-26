import Vue from "vue";

export default {
  install(_app: typeof Vue): void {
    console.log("Here");
    // Make dialogs draggable
    // This is a modified version of the code from https://github.com/vuetifyjs/vuetify/issues/4058#issuecomment-450636420
    // In particular, the reliance on setInterval has been removed in favor of a ResizeObserver
    const d: Record<string,any> = {};
    const titleClasses = ["v-card__title", "v-toolbar__content"];
    document.addEventListener("mousedown", e => {
      console.log(e.target as HTMLElement);
      if (!e.target) { return; }
      const event = e as MouseEvent;
      const target = e.target as HTMLElement;
      const classes = Array.from(target.classList);
      console.log(classes.some(x => titleClasses.includes(x)));
      const containsTitleClass = classes.some(x => titleClasses.includes(x));
      if (!containsTitleClass) return;
      const closestDialog = target.closest(".v-dialog.v-dialog--active");
      console.log(closestDialog);
      if (event.button === 0 && closestDialog != null) { // element which can be used to move element
        const boundingRect = closestDialog.getBoundingClientRect();
        d.el = closestDialog; // element which should be moved
        d.title = e.target;
        d.mouseStartX = event.clientX;
        d.mouseStartY = event.clientY;
        d.elStartX = boundingRect.left;
        d.elStartY = boundingRect.top;
        d.el.style.position = "fixed";
        d.el.style.margin = 0;
        d.oldTransition = d.el.style.transition;
        d.el.style.transition = "none";
        d.title.classList.add("dragging");
        d.overlays = document.querySelectorAll(".v-overlay.v-overlay--active");
        d.overlays.forEach((overlay: HTMLElement) => overlay.style.display = "none");
      }
    });

    document.addEventListener("mousemove", e => {
      if (d.el === undefined) return;
      const boundingRect = d.el.getBoundingClientRect();
      d.el.style.left = Math.min(
          Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
          window.innerWidth - boundingRect.width
      ) + "px";
      d.el.style.top = Math.min(
          Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
          window.innerHeight - boundingRect.height
      ) + "px";
    });
    document.addEventListener("mouseup", () => {
        if (d.el === undefined) return;
        d.el.style.transition = d.oldTransition;
        d.el = undefined;
        d.title.classList.remove("dragging");
        d.overlays.forEach((overlay: HTMLElement) => overlay.style.display = "");
    });
  }
};
