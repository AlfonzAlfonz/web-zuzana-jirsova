import L from "leaflet";
import { createRoot } from "react-dom/client";
import { Hero } from "../Hero";

interface ContentLayer {
  new (
    url: string,
    bounds: [[number, number], [number, number]]
  ): L.GridLayer & {
    _image: HTMLElement;
  };
}

export const ContentLayer: ContentLayer = L.ImageOverlay.extend({
  _initImage: function (this: InstanceType<ContentLayer>) {
    const root = document.createElement("main");
    root.classList.add("leaflet-tile-container");
    root.classList.add("z-[5000]");

    root.style.pointerEvents = "auto";

    createRoot(root).render(
      <>
        <div className="text-primary flex items-center justify-center w-full h-full">
          <Hero />
        </div>
        <div className="h-full w-full inset-0 pointer-events-none flex justify-center items-center z-[1000] pointer">
          <div className="bg-primary h-[96px] w-[96px] rounded-full pointer-events-auto" />
        </div>
      </>
    );

    this._image = root;
  },
});
