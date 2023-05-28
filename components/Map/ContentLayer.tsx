import L from "leaflet";
import { createRoot } from "react-dom/client";

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
    root.classList.add("z-[500]");

    createRoot(root).render(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="h-[100vh] p-4 text-primary">
          <p></p>
          <h1 className="text-center">
            <div>Toto je web portfolio</div>
            <div className="text-5xl">
              Zuzany <br />
              Jirsové
            </div>
          </h1>
        </div>
      </div>
    );

    this._image = root;
  },
});
